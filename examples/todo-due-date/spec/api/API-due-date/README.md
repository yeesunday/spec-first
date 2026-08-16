---
spec:
  id: API-due-date
  type: api
  version: 1.0.0
  status: approved
  owner: backend
  depends_on: [REQ-due-date, ARCH-due-date, DOM-due-date]
  source: todo.openapi.json
  updated: 2026-08-16
---

# Todo API：截止日期

## 契约来源

HTTP 请求、响应、错误和字段格式以 [todo.openapi.json](todo.openapi.json) 为准；Swagger UI、OpenAPI lint 和 SDK 工具可以直接消费该文件。

## 需求对齐

| 需求条款 | operation/schema |
|---|---|
| `REQ-due-date#R1` | `TodoPatch.dueDate` |
| `REQ-due-date#R4` | `listTodos.sort=dueDate` |

## 兼容策略

`dueDate` 是可空字段，增加该字段对旧消费者兼容；拒绝非法日期返回 `400 VALIDATION_ERROR`。
