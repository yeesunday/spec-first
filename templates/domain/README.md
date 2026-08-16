<!--
  模板：数据设计（Backend 维护）
  用法：复制到 spec/domain/DOM-<slug>/，迁移/表结构放进目录并在 source 声明。
  铁律：README 写表结构表达不了的语义（所有权、不变量、迁移策略）；字段定义只在原生文件里。
  完整示例：examples/todo-due-date/spec/domain/DOM-due-date/README.md
-->
---
spec:
  id: DOM-<slug>
  type: domain
  version: 0.1.0
  status: draft
  owner: backend
  depends_on: [REQ-<slug>, ARCH-<slug>]
  source: schema.sql
  updated: 2026-01-01
---

# 数据设计：<名称>

## 所有权

<谁拥有这张表/这个模型的写入权；消费者通过什么接口读。>

## 不变量

- **I-1**：<数据库约束表达的规则，例如唯一性、状态单向迁移>；
- **I-2**：<哪些值是派生的、不落库>。

## 约束和迁移

迁移脚本见 [schema.sql](schema.sql)。生产接入使用项目现有 migration 工具执行；说明回滚方式与上线顺序。
