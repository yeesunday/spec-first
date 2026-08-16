# CHANGE-001：增加 Todo 截止日期

关联 Spec：`REQ-due-date`、`DES-due-date`、`ARCH-due-date`、`API-due-date`、`DOM-due-date`、`TEST-due-date`

## 为什么需要先评审

该需求同时影响用户行为、设计状态、HTTP 契约、数据库迁移和多个执行角色，需要先确认日期语义和时区决策。

## 范围与影响

- 修改：Todo 表增加可空日期、API 增加 `dueDate`、UI 增加选择和徽标、测试增加 AC-1～AC-5；
- 不修改：提醒、重复任务、日历视图和具体时刻；
- 兼容性：增加可空字段，旧消费者可以忽略；
- 回滚：停止发送该字段并回滚迁移，展示层不再渲染徽标。
