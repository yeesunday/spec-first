# tmp/ — 临时目录

放任何不入库的内容：参考项目克隆、实验代码、下载的论文、随手笔记……**整个目录（除本文件外）都被 `.gitignore` 忽略**，往里丢东西不需要改任何配置。

## 当前内容

设计阶段克隆的参考开源项目，仅用于本地对照，不是采用 SpecFirst 的依赖：

| 目录 | 上游仓库 | 许可证 | 克隆方式 |
|---|---|---|---|
| `spec-kit/` | https://github.com/github/spec-kit | MIT | `--depth 1` |
| `OpenSpec/` | https://github.com/Fission-AI/OpenSpec | MIT | `--depth 1` |
| `leanspec/` | https://github.com/codervisor/leanspec | MIT | `--depth 1` |
| `specdd/` | https://github.com/specdd/specdd | Apache-2.0 | `--depth 1` |
| `sedeve-kit/` | https://github.com/scuptio/sedeve-kit | Apache-2.0 | `--depth 1` |

## 克隆与更新

```bash
# 全部（重新）拉取
cd tmp
for repo in "github/spec-kit:spec-kit" "Fission-AI/OpenSpec:OpenSpec" \
            "codervisor/leanspec:leanspec" "specdd/specdd:specdd" \
            "scuptio/sedeve-kit:sedeve-kit"; do
  upstream="${repo%%:*}"; dir="${repo##*:}"
  if [ -d "$dir/.git" ]; then git -C "$dir" pull --ff-only; \
  else git clone --depth 1 "https://github.com/$upstream.git" "$dir"; fi
done

# 更新单个项目
git -C spec-kit pull --ff-only
```

## 版本控制说明

- 克隆各自保留 `.git`（便于 `git pull` 更新上游），不提交到本仓库。
- 如需把其中某个项目纳入版本库：改为 git submodule（`git submodule add <url> tmp/<name>`）或删掉其 `.git` 后手动 add（`.gitignore` 需相应调整）。
