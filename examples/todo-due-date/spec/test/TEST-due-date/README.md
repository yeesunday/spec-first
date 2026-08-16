---
spec:
  id: TEST-due-date
  type: test
  version: 1.0.0
  status: approved
  owner: qa
  depends_on: [REQ-due-date, API-due-date, DES-due-date]
  source: cases.md
  updated: 2026-08-16
---

# 截止日期测试规范

## 覆盖映射

| 验收标准 | 用例 | 当前自动化 |
|---|---|---|
| `AC-1` | `TC-1` | ✅ domain unit |
| `AC-2` | `TC-2` | ✅ UI rule unit |
| `AC-3` | `TC-3` | ✅ UI rule unit |
| `AC-4` | `TC-4` | ✅ domain unit |
| `AC-5` | `TC-5` | ✅ UI rule unit |
| `AC-6` | `TC-6` | ✅ UI detect unit |
| `AC-7` | `TC-7` | ✅ UI detect unit |

HTTP、数据库和完整 UI 的集成测试在 Change-001 的后续任务中完成。
