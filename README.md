# Zoya Huo · 个人周天

版式来自 Codex 做的「个人周天」（`~/Downloads/tianzhi`），字环用 [zaoxu001/celestial-wheel](https://github.com/zaoxu001/celestial-wheel) 的**原版**（MIT），没有改动。

## 看效果

```bash
python3 -m http.server 8000
```

开发时直接在本目录起 `python3 -m http.server 8000` 打开 <http://localhost:8000> 即可，不需要构建；必须走 http，不能双击 `index.html`（ES 模块在 `file://` 下会被拦）。也不依赖外部 CDN。

想看和线上一模一样的打包结果：`node tools/build.mjs`，然后在 `dist/` 里起服务。

## 结构

| 页面 | 地址 | 说明 |
|---|---|---|
| 首页 | `#/` | 全屏立体字环 + 左上超大半透明名字 + 右上打字机 |
| 关于 | `#/about` | 简介、履历、为什么是天干地支 |
| 研究 | `#/research` | 研究方向，点开折叠项看详情 |
| 联系 | `#/contact` | 邮箱与其他链接 |

字环只有一个，一直在最底层：首页是立体展开，其他分页退成静置底景。
右上角可切换 中 / EN / 日；也可以用 `?lang=en` 直接指定。默认按上次选择，其次按浏览器语言。

## 改内容

只改 [`src/profile.js`](src/profile.js)：姓名、链接在 `PROFILE`，其余文字按 `T.zh` / `T.en` / `T.ja` 三份写。
`links` 里留空的项不会显示。改完文字后运行 `python3 tools/make-font.py` 更新字体子集，再推送到 `main` 发布（见下文「部署」）。

## 文件

- `index.html` 页面骨架
- `src/main.js` 把 `profile.js` 填进页面、分页路由
- `src/style.css` 样式
- `src/celestial-wheel.js` `src/data.js` `src/code-ticker.js` 原版字环与打字机，未改动
- `vendor/` three.js 0.160.0 与字体（Noto Serif SC 子集，SIL OFL；`fonts.css` 由脚本生成）
- `tools/` 构建（`build.mjs`）、字体子集（`make-font.py`）、发布（`publish.sh`，从 Obsidian 库同步到本仓库再推送）脚本；`dist/` 是构建产物，不进版本管理

## 部署

全站只靠 GitHub Pages 托管，不需要自己的服务器。线上地址：<https://zoyahuo.space/>。推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动构建（`tools/build.mjs`，esbuild）并发布 `dist/`。
直接在 GitHub 网页上改 `src/profile.js` 并提交到 `main` 也会触发发布。

自定义域名在仓库 Settings → Pages → Custom domain 里设置（用 Actions 发布时以这里为准，`dist/CNAME` 只是留档），并勾选 Enforce HTTPS。
如果打开 `https://zoyahuo.space` 报证书错误（浏览器显示证书属于 `*.github.io`），说明 GitHub 还没给这个域名签发证书：在 Settings → Pages 里把 Custom domain 删掉并保存，再重新填 `zoyahuo.space`，等 DNS check 通过、证书签发（可能要几十分钟到一天）后再勾选 Enforce HTTPS。
域名解析在 DNSPod：根域名 `@` 建议配齐 GitHub Pages 的四条 A 记录 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`，`www` 加一条 CNAME 指向 `azusa-dom.github.io`。

如果域名不再续费：在 Settings → Pages 里清空 Custom domain，再删掉 `tools/build.mjs` 里写 `dist/CNAME` 的那一行，站点会回到 <https://azusa-dom.github.io/zoyahuo-site/>。
构建产物里的路径都是相对的，放在子路径下同样能用；记得同步改掉 GitHub 个人主页（`azusa-dom/azusa-dom` 仓库的 README）里的网站链接。

### 构建与性能

首次或换电脑时，esbuild 装在 vault 之外的缓存目录（不参与同步）：

```bash
npm install --prefix ~/.cache/zoya-site-build esbuild@0.28.2
```

构建把原来的 18 个请求压成 3~4 个：`index.html`（CSS 内联）+ 主脚本（文字与逻辑，约 16KB gzip）+ 字环块（three.js，文字出来后才加载，淡入）。
文件名带内容哈希，可以永久缓存；HTML 每次重新校验。

站点没有外部依赖：three.js 在 `vendor/three/`，中文宋体在 `vendor/fonts/`（只含站点用到的字）。
改了页面文字之后，新增的字会先回退到系统宋体；想要一致的字形，运行 `python3 tools/make-font.py` 重新生成子集，再推送。

## 许可

MIT，见 [LICENSE](LICENSE)。字环原作者 zaoxu001，`LICENSE` 文件随站点一起发布；页面上不再显示致谢文字，来源写在 `index.html` 顶部的注释里。
