<!--
  模板：测试规范（QA 维护）
  用法：复制到 spec/test/TEST-<slug>/；用例表放 cases.md 并在 source 声明。
  铁律：覆盖映射必须覆盖每个验收条款；用例表是 Excel 习惯的仓库版（编号/前置条件/步骤/预期结果）。
  用 Cucumber 的团队可改用 .feature（可选）。
  完整示例：examples/todo-due-date/spec/test/TEST-due-date/README.md
-->
---
spec:
  id: TEST-<slug>
  type: test
  version: 0.1.0
  status: draft
  owner: qa
  depends_on: [REQ-<slug>]
  source: cases.md
  updated: 2026-01-01
---

# 测试规范：<名称>

## 覆盖映射

| 验收条款 | 用例 | 当前自动化 |
|---|---|---|
| `REQ-<slug>#AC-1` | `TC-1` | ✅ / ⬜ |

## 测试层级与环境

<单元/集成/E2E 各覆盖什么；环境、种子数据和隔离要求。>

## 失败处理

<哪些失败阻塞合并；哪些记录为已知问题带 tag 放行。>
