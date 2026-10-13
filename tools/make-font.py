#!/usr/bin/env python3
"""重新生成站内字体：Noto Serif SC（SIL OFL 1.1）的子集，只含站点用到的字。

改了 index.html / src/main.js / src/profile.js 里的文字之后跑一次：  python3 tools/make-font.py
做法：通过 Google Fonts 的 text= 参数按字取子集。请求太长会被拒绝，所以按字符区间分块
（拉丁与符号 / 假名与全角 / 汉字每 350 个一块），每块一个 woff2，并生成带 unicode-range 的
vendor/fonts/fonts.css，浏览器只会下载当前页面用到的那几块。
没跑的话，新增的字会回退到系统宋体，不影响使用，只是字形略有不同。
"""
import pathlib, re, subprocess, sys, urllib.parse

root = pathlib.Path(__file__).resolve().parent.parent
out_dir = root / 'vendor/fonts'
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

chars = set('甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥年日0123456789')
for f in ['index.html', 'src/main.js', 'src/profile.js']:
    chars |= set((root / f).read_text(encoding='utf-8'))
# U+2010–202F（引号、破折号、省略号）在中文字体里是全角的，英文里会显得过宽，交给拉丁字体去画
cps = sorted(ord(c) for c in chars if ord(c) > 32 and not 0x2010 <= ord(c) < 0x2030)

groups = [
    [c for c in cps if c < 0x3000],                        # 拉丁、标点、符号
    [c for c in cps if 0x3000 <= c < 0x3400 or c >= 0xFF00],  # 假名、CJK 标点、全角
]
han = [c for c in cps if 0x3400 <= c < 0xFF00]
groups += [han[i:i + 350] for i in range(0, len(han), 350)]
groups = [g for g in groups if g]

def curl(*a):
    return subprocess.run(['curl', '-s', *a], capture_output=True, text=True, check=True).stdout

for old in out_dir.glob('NotoSerifSC*.woff2'):
    old.unlink()

faces = []
for i, g in enumerate(groups):
    text = ''.join(chr(c) for c in g)
    url = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400&text=' + urllib.parse.quote(text)
    css = curl('-A', UA, url)
    m = re.search(r'url\(([^)]+)\)', css)
    if not m:
        sys.exit(f'第 {i} 块没有拿到字体（请求可能过长或被拒绝）：\n{css[:300]}')
    name = f'NotoSerifSC-{i}.woff2'
    subprocess.run(['curl', '-s', '-o', str(out_dir / name), m.group(1)], check=True)
    rng = ', '.join(f'U+{c:X}' for c in g)
    faces.append(
        "@font-face {\n  font-family: 'Noto Serif SC'; font-style: normal; font-weight: 400; font-display: swap;\n"
        f"  src: url('./{name}') format('woff2');\n  unicode-range: {rng};\n}}\n")
    print(f'  块 {i}: {len(g)} 字 → {name} ({(out_dir / name).stat().st_size // 1024} KB)')

(out_dir / 'fonts.css').write_text('/* 由 tools/make-font.py 生成，不要手改 */\n' + '\n'.join(faces), encoding='utf-8')
print(f'共 {len(cps)} 个字符，{len(groups)} 块')
