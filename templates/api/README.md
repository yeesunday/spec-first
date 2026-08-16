<!--
  模板：接口契约（Backend 维护）
  用法：复制到 spec/api/API-<slug>/，把契约本体（OpenAPI/Protobuf/AsyncAPI）放进目录并在 source 声明。
  铁律：README 只写摘要、兼容策略和错误约定；字段定义只在契约本体里，不复制。
  完整示例：examples/todo-due-date/spec/api/API-due-date/README.md
-->
---
spec:
  id: API-<slug>
  type: api
  version: 0.1.0
  status: draft
  owner: backend
  depends_on: [REQ-<slug>, ARCH-<slug>, DOM-<slug>]
  source: contract.openapi.json
  updated: 2026-01-01
---

# <名称> API 契约

## 契约来源

请求、响应、错误和字段格式以 [contract.openapi.json](contract.openapi.json) 为准；Swagger UI、OpenAPI lint、SDK 生成器直接消费该文件。

## 需求对齐

| 需求条款 | operation/schema |
|---|---|
| `REQ-<slug>#R1` | `TodoPatch.dueDate` |

## 兼容策略

<新增/修改字段对旧消费者的影响；破坏性变更如何分批发布。>

## 错误约定

| HTTP | code | 场景 |
|---|---|---|
| 400 | VALIDATION_ERROR | <非法输入> |
| 404 | NOT_FOUND | <目标不存在> |
