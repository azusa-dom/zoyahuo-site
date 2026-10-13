// 构建：node tools/build.mjs  →  dist/
// 把 18 个零散请求压成 3~4 个：
//   index.html（CSS 内联）+ app-<hash>.js（文字与逻辑，很小）+ chunk-<hash>.js（字环 + three.js，文字出来后再加载）
// 文件名带内容哈希，可以永久缓存；index.html 每次重新校验，所以发布后回访的人立刻拿到新版。
// esbuild 装在 ~/.cache/zoya-site-build（见 README），不进 vault，不参与同步。
import { createRequire } from 'node:module'
import { homedir } from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const req = createRequire(path.join(process.env.ESBUILD_HOME || path.join(homedir(), '.cache/zoya-site-build'), 'package.json'))
const esbuild = req('esbuild')
const dist = path.join(root, 'dist')

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true })

// three 用站内自带的 0.160 版本，不走网络
const threeAlias = {
  name: 'three-alias',
  setup(b) {
    b.onResolve({ filter: /^three$/ }, () => ({ path: path.join(root, 'vendor/three/build/three.module.js') }))
    b.onResolve({ filter: /^three\/addons\// }, (a) => ({ path: path.join(root, 'vendor/three/addons', a.path.slice('three/addons/'.length)) }))
  },
}

// 一、JS：主入口 + 动态加载的字环块
const js = await esbuild.build({
  entryPoints: [path.join(root, 'src/main.js')],
  outdir: path.join(dist, 'assets'),
  entryNames: 'app-[hash]', chunkNames: 'chunk-[hash]',
  bundle: true, splitting: true, format: 'esm', target: 'es2020',
  minify: true, legalComments: 'none', metafile: true, plugins: [threeAlias], logLevel: 'warning',
})
const outs = Object.entries(js.metafile.outputs)
// 动态 import 的目标（字环）在 metafile 里也带 entryPoint，所以按 src/main.js 精确认主入口
const appFile = outs.find(([, o]) => o.entryPoint === 'src/main.js' || o.entryPoint?.endsWith('/src/main.js'))[0]
const chunkFiles = outs.filter(([f]) => f !== appFile && f.endsWith('.js')).map(([f]) => f)

// 二、CSS：字体声明 + 样式合并，字体文件带哈希放进 assets/fonts
const css = await esbuild.build({
  stdin: { contents: '@import "./vendor/fonts/fonts.css";\n@import "./src/style.css";', resolveDir: root, loader: 'css' },
  outfile: path.join(dist, 'assets/style.css'),
  bundle: true, minify: true, loader: { '.woff2': 'file' },
  assetNames: 'fonts/[name]-[hash]', publicPath: '/assets', logLevel: 'warning',
})
const cssPath = path.join(dist, 'assets/style.css')
const cssText = fs.readFileSync(cssPath, 'utf8')
fs.rmSync(cssPath)

// 三、HTML：CSS 内联，去掉 importmap，脚本指向哈希文件，字环块提前 preload
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
const rel = (f) => '/' + path.relative(dist, path.resolve(root, f)).replaceAll(path.sep, '/')
html = html
  .replace(/<link rel="stylesheet" href="\.\/vendor\/fonts\/fonts\.css" \/>\n?/, '')
  .replace(/<link rel="stylesheet" href="\.\/src\/style\.css" \/>/, `<style>${cssText}</style>`)
  .replace(/<script type="importmap">[\s\S]*?<\/script>\n?/, '')
  .replace('<script type="module" src="./src/main.js"></script>', `<script type="module" src="${rel(appFile)}"></script>`)
if (!html.includes(rel(appFile))) throw new Error('index.html 里没找到主脚本标签，构建中止')
const preload = chunkFiles.map((f) => `<link rel="modulepreload" href="${rel(f)}" />`).join('\n')
html = html.replace('</head>', `${preload}\n</head>`)
fs.writeFileSync(path.join(dist, 'index.html'), html)

// 图片：img/ 整个目录原样放进 dist/img/（文件名里带版本，换图时改名，避免旧缓存）
fs.cpSync(path.join(root, 'img'), path.join(dist, 'img'), { recursive: true })

// GitHub Pages：自定义域名与关闭 Jekyll 处理（哈希文件名、下划线目录都不被忽略）
fs.writeFileSync(path.join(dist, 'CNAME'), 'zoyahuo.space\n')
fs.writeFileSync(path.join(dist, '.nojekyll'), '')

// 四、许可证随站点发布
fs.copyFileSync(path.join(root, 'LICENSE'), path.join(dist, 'LICENSE'))
fs.mkdirSync(path.join(dist, 'licenses'), { recursive: true })
fs.copyFileSync(path.join(root, 'vendor/three/LICENSE'), path.join(dist, 'licenses/three.txt'))

// 五、报告
const gz = (f) => zlib.gzipSync(fs.readFileSync(f), { level: 9 }).length
const kb = (n) => (n / 1024).toFixed(1).padStart(7) + ' KB'
console.log('文件                                  原始        gzip')
for (const f of [path.join(dist, 'index.html'), ...[appFile, ...chunkFiles].map((f) => path.resolve(root, f))]) {
  console.log(path.relative(dist, f).padEnd(34), kb(fs.statSync(f).size), kb(gz(f)))
}
const fonts = fs.readdirSync(path.join(dist, 'assets/fonts'))
console.log(`字体 ${fonts.length} 个，共 ${kb(fonts.reduce((s, f) => s + fs.statSync(path.join(dist, 'assets/fonts', f)).size, 0)).trim()}（按需下载）`)
