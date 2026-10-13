#!/usr/bin/env bash
# 发布：把本目录同步到独立的 git 目录 ~/zoyahuo-site，提交并推送；GitHub Actions 会自动构建并上线。
# （本目录在 Obsidian 库里，库本身是另一个 git 仓库，所以另用一个目录推送。）
set -euo pipefail
src="$(cd "$(dirname "$0")/.." && pwd)"
dst="$HOME/zoyahuo-site"
[ -d "$dst/.git" ] || { echo "$dst 还不是 git 仓库"; exit 1; }
rsync -a --delete --exclude='.git' --exclude='dist' --exclude='node_modules' --exclude='.DS_Store' --exclude='tools/deploy.sh' "$src/" "$dst/"
cd "$dst"
git add -A
if git diff --cached --quiet; then echo "没有改动"; exit 0; fi
git commit -q -m "${1:-Update site}"
git push -q
echo "已推送，等 GitHub Actions 构建完成即上线：https://zoyahuo.space/"
