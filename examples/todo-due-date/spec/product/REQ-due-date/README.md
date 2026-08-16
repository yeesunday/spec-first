---
spec:
  id: REQ-due-date
  type: product
  version: 1.0.0
  status: approved
  owner: product
  depends_on: [PROJ-overview]
  artifacts: [ACCEPTANCE.md]
  updated: 2026-08-16
---

# Todo 截止日期

## 目的

让用户为任务设置截止日期，并在列表中快速识别今天到期和已经过期的任务。

## 用户故事

- **US-1**（P1）：作为用户，我想设置或清除截止日期，以便安排完成节奏。
- **US-2**（P1）：作为用户，我想看到日期状态，以便优先处理紧急任务。
- **US-3**（P2）：作为用户，我想使用快捷日期，以便减少选择成本。

## 业务规则

- **R1**：任务可以设置或清除一个 `YYYY-MM-DD` 日期；非法日期不得保存。
- **R2**：未完成且日期早于今天的任务显示 `overdue`；等于今天显示 `due-today`。
- **R3**：已完成任务和没有日期的任务不显示日期徽标。
- **R4**：按日期升序排列时，没有日期的任务排最后。
- **R5**：快捷项支持“今天”“明天”“下周一”；周一选择“下周一”时取未来七天后的周一。
- **R6**：新建任务时，标题中的日期表达式（今天/明天/后天、周X/下周X、N天后、YYYY-MM-DD、MM-DD、X月X日）自动识别为截止日期，并预填表单。
- **R7**：识别不修改标题原文；预填日期用户可修改或清除。
- **R8**：无匹配或歧义输入（如“下周”“月底”“N天内”）不预填、不报错。

## 不包含

- 提醒、推送、重复任务、日历视图和具体时刻；
- 本示例不实现完整 Todo UI、鉴权和持久化接入。

## 关联 Spec

- 验收：[ACCEPTANCE.md](ACCEPTANCE.md)
- 设计：[`DES-due-date`](../../design/DES-due-date/README.md)
- 架构：[`ARCH-due-date`](../../architecture/ARCH-due-date/README.md)
- API：[`API-due-date`](../../api/API-due-date/README.md)
- 数据：[`DOM-due-date`](../../domain/DOM-due-date/README.md)
- 测试：[`TEST-due-date`](../../test/TEST-due-date/README.md)
