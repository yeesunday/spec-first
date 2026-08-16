---
spec:
  id: DOM-due-date
  type: domain
  version: 1.0.0
  status: approved
  owner: backend
  depends_on: [REQ-due-date, ARCH-due-date]
  source: schema.sql
  updated: 2026-08-16
---

# Todo 数据设计：截止日期

## 所有权

Todo 服务拥有 `todos.due_date` 的写入权；消费者通过 API 读取，不直接写表。

## 约束和迁移

`due_date` 为可空的日期列，不保存时分秒和派生状态。迁移见 [schema.sql](schema.sql)，生产接入需要采用项目现有 migration 工具执行。
