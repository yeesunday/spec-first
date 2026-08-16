<!--
  模板：产品需求（Product 维护）
  用法：复制到 spec/product/REQ-<slug>/，连同 ACCEPTANCE.md 一起改。
  铁律：业务规则编号 R1/R2/…，每条可判定（数字优于形容词）；验收标准放 ACCEPTANCE.md，编号 AC-1/AC-2/…。
  完整示例：examples/todo-due-date/spec/product/REQ-due-date/README.md
-->
---
spec:
  id: REQ-<slug>
  type: product
  version: 0.1.0
  status: draft
  owner: product
  depends_on: [PROJ-overview]
  artifacts: [ACCEPTANCE.md]
  updated: 2026-01-01
---

# <需求名称>

## 目的

<为谁解决什么问题，带来什么价值。只读这一句就能判断该不该继续读。>

## 用户故事

<!-- 按优先级 P1 > P2 排列；每条应能独立开发、独立测试、独立上线。 -->

- **US-1**（P1）：作为 <角色>，我想要 <能力>，以便 <价值>。
- **US-2**（P2）：作为 <角色>，我想要 <能力>，以便 <价值>。

## 业务规则

<!-- 编号 R1/R2/…，是全部下游 Spec 的引用地址。每条必须可判定：给定什么条件，系统必须怎样。 -->

- **R1**：系统 SHALL <可观察行为>，<数字/枚举约束>。
- **R2**：当 <边界条件> 时，系统 SHALL <结果>。

## 非功能需求

<!-- 性能、安全、兼容性；没有就删掉本节。同样数字化。 -->

- **N1**：<指标> SHALL <数字>。

## 不包含

<!-- 明确不做什么，防止 AI 和开发脑补。 -->

- 不包含 <能力>。

## 关联工件

<!-- 只保留本需求真正影响到的类型；不涉及就删掉该行。 -->

- 验收：[ACCEPTANCE.md](ACCEPTANCE.md)
- 设计：`DES-<slug>`
- 架构：`ARCH-<slug>`
- 接口：`API-<slug>`
- 数据：`DOM-<slug>`
- 测试：`TEST-<slug>`
