# spec-first

> **Spec First, Everything Else Follows.**
>
> 一套让人和 AI 围绕**同一组工程约定**工作的协作方式：产品、设计、架构、接口、数据、测试各用自己最顺手的格式写 Spec，AI 在执行前后按约定阅读和检查。

它不是又一个项目管理工具，也不替代 Swagger、SQL、Figma 或测试框架——它规定这些工件**怎么组织、怎么互相引用、谁负责、AI 怎么检查**。

---

## 整体工作流程

```text
接到任务
   ↓
阅读相关 Spec（按角色 + 任务，不通读整个项目）
   ↓
发现缺口或冲突？
   ├─ 是 → 先更新 Spec，走 PR 评审（跨角色/破坏性改动先写 Change 提案）
   └─ 否 → 按约定实现代码 + 测试
   ↓
AI 执行前后自查 + 人工评审重点
   ↓
合并：PR 里的 Spec 成为新约定，测试与 CI 证明实现
   ↓
上线后的数据 / 事故 / 用户反馈 → 成为下一轮 Spec 变更的来源（闭环）
```

一个普通需求通常只产生三样东西：**需求与验收标准 → 受影响的专业 Spec（设计/架构/接口/数据）→ 代码与测试**。不受影响的 Spec 不创建，也不要求任何人阅读。

三个关键设计：

1. **Spec 是一个目录，不是一种格式**——统一的是身份/版本/负责人/依赖（frontmatter），正文保留原生格式（OpenAPI、SQL、Markdown 用例表、Figma 导出）；
2. **只读该读的**——角色有默认阅读清单（见 [角色阅读边界](docs/roles.md)），任务路径经 `spec-map.yml` 映射到 Spec，不要求通读全树；
3. **改什么都在 PR 里评审**——小改动 Spec 和代码同一个 PR；跨角色、破坏性改动先写 `changes/` 提案。Git diff 就是变更记录，不维护多余的 delta 副本。

---

## 仓库里有什么

```text
README.md          本页：工作流总览 + 怎么读 + 怎么用
AGENTS.md          AI 协作约定（给 Agent 看的仓库规则）
docs/              工作方式说明：写作约定 / 工作流 / 角色边界 / Agent 指南 / 工具集成
templates/         团队默认模板：CONVENTIONS + 7 类 Spec + Change 提案 + Agent 规则
schema/            Spec frontmatter 的 JSON Schema（机器校验的依据）
tools/validate.mjs 零依赖校验器：目录、元数据、引用、链接、OpenAPI 回链
examples/          可运行示例：todo 截止日期（npm test 全绿）
tmp/               临时目录：参考项目克隆等，不入库
```

---

## 怎么阅读这个仓库

**第一次来（15 分钟）**：

1. 本页（5 分钟）：看懂上面的流程图和三个关键设计；
2. [示例项目](examples/todo-due-date/README.md)（10 分钟）：对照真实文件看一遍 Spec 长什么样、怎么跑测试。

**按角色深入**（用到时再读）：

| 你是谁 | 读什么 |
|---|---|
| 想把方法引入团队 | [写作与目录约定](docs/spec-writing.md) → [工作流与变更评审](docs/workflow.md) → 复制 [templates/](templates/README.md) |
| PM / 产品 | [角色阅读边界](docs/roles.md) + [产品需求模板](templates/product/README.md)（状态用 Markdown 表格维护，不写 YAML） |
| 设计 / 架构 | [角色阅读边界](docs/roles.md) + [设计模板](templates/design/README.md) / [架构模板](templates/architecture/README.md) |
| 前端 / 后端 / 测试 | [角色阅读边界](docs/roles.md) + 对应模板（接口/数据/测试） |
| 给 AI 配规则 | [Agent 指南](docs/agent.md) + [AGENTS.md 模板](templates/AGENTS.md) + [spec-map.yml 模板](templates/spec-map.yml) |
| 接 OpenAPI/SQL/Figma 等工具 | [原生工具集成](docs/integrations.md) |

---

## 怎么使用

### 场景 A：团队想引入

1. 复制 [团队约定](templates/CONVENTIONS.md) 到你们仓库的 `spec/CONVENTIONS.md`，按团队情况改；
2. 从一个小需求开始，只复制**受影响类型**的模板（写不出就对照 [示例](examples/todo-due-date/README.md) 改）；
3. 把 `AGENTS.md` 和 `spec-map.yml` 放进仓库，让 AI 按角色入口阅读；
4. 多仓库团队用 **git submodule** 共享 spec 仓库（共同维护流程见 [原生工具集成](docs/integrations.md) 的多仓库一节）；
5. 跑一遍 [校验器](tools/validate.mjs)，然后按 [工作流](docs/workflow.md) 走第一个 PR。

### 场景 B：作为某类 Spec 的维护者

- 你的 Spec 是一个目录：`spec/<type>/<ID>/README.md` + 原生契约文件；
- frontmatter 按 [Schema](schema/spec-contract.schema.json) 填写，条款用稳定编号（R1、AC-1）供别人引用；
- 改 Spec 和改代码走同一个 PR；跨角色改动先写 `changes/` 提案。

### 场景 C：作为 AI 的配置者

- [AGENTS.md](templates/AGENTS.md) 决定 Agent 的纪律（先读约定、先改 Spec、报告格式）；
- [spec-map.yml](templates/spec-map.yml) 决定 Agent 读什么（角色默认清单 + 路径映射）；
- [校验器](tools/validate.mjs) 是最后一道机器检查。
