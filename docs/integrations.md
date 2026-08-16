# 原生工具集成

> 给谁看：Tech Lead 和工程负责人。一句话原则：**SpecFirst 统一的是组织方式和引用方式，不统一专业契约的正文格式。** 团队已经在用的工具，继续用。

## API 与消息

HTTP 默认 OpenAPI/Swagger；gRPC 用 Protobuf；事件用 AsyncAPI、Avro 或 JSON Schema。原生文件直接放进 `api/API-xxx/`，由现有 lint、代码生成和 breaking-change 工具验证。

```text
api/API-due-date/
├── README.md            ← 摘要、兼容策略、错误约定（人读）
└── todo.openapi.json    ← 契约本体（工具读）
```

推荐在 operation 或 schema 上加 `x-requirements` 回链需求条款，校验器会检查引用是否可解析：

```yaml
paths:
  /todos:
    get:
      operationId: listTodos
      x-requirements: ["REQ-due-date#R4"]
```

不能加扩展字段的外部格式，就在 README 维护"关联条款"表。

## 数据与设计

- SQL migration、Prisma、dbt、JSON Schema 放 `domain/DOM-xxx/`；
- Figma 链接、Storybook、tokens、SVG、PNG、字体放 `design/DES-xxx/`；
- 资产需要可复现时保存固定导出版本；外部链接只作协作入口；
- **现有项目的工具和目录优先**，不要为了 SpecFirst 改写生成流程——迁移工具的迁移、Figma 的导出流程都原样保留。

## 项目与测试

- 项目状态（目标/里程碑/风险）用 **Markdown 表格**维护在 `PROJ-*` 的 README 里；PM 不用学 YAML。
- 迭代任务仍放 Jira、Linear、GitHub Issues 等执行工具，Spec 和 Issue 用需求 ID 互相对照。
- 验收标准回答"什么结果算通过"，测试用例回答"如何验证"；测试通过名称、tag、注释或 README 表格引用 `REQ#R1` / `AC-1`。
- 用例默认用 **Markdown 用例表**（编号/前置条件/步骤/预期结果，即 Excel 习惯的仓库版，可直接搬进禅道/TAPD）；用 Cucumber 的团队可改用 `.feature`，两者选一。
- OpenAPI lint、迁移测试、视觉回归、单元/集成/E2E 继续由原工具执行，SpecFirst 不重复造。

## 多仓库：怎么共同维护一份 Spec

跨仓库团队（前端、后端、算法各自一个仓库）用 **git submodule** 共享 spec 仓库——这是默认方案，因为它同时保留三件事：**同一份真相、版本锁定、谁都能提 PR**。

### 结构

```text
spec 仓库        独立 git repo，所有人通过 PR 维护（唯一真相源）
   ▲ submodule
   ├── app-frontend/spec/   ← 只读挂载
   └── app-backend/spec/    ← 只读挂载
```

### 共同维护流程

1. **改 Spec**：一律给 spec 仓库提 PR（在消费仓库里发现缺口，也回 spec 仓库改），按 [工作流](workflow.md) 评审；
2. **发布**：spec 仓库合并后打 tag（如 `v1.2.0`），tag 就是"本轮可消费版本"；
3. **同步**：消费仓库开 "sync spec" PR，把 submodule 指针更新到新 tag；
4. **CI 校验同步 PR**：指针不落后于最新 tag；spec 树里没有 `draft`/`review` 状态的 Spec；`spec-map.yml` 引用的 Spec 全部存在；
5. **升级节奏**：兼容变化各仓库按自己的节奏升级；破坏性变化（Spec 主版本升级）所有消费仓库必须同批评审、同批同步。

### 两条纪律

- 消费仓库里的 `spec/` **只读**：人和 AI 都不得在消费仓库改 Spec，改了也进不了 spec 仓库；
- **不跟 main 走**：指针锁 tag，升级是显式 PR，不是隐式漂移。

### 什么时候不用 submodule

- **monorepo**：`spec/` 就在仓库里，分发问题不存在（单仓库团队优先考虑，最简单）；
- **包 / Registry 分发**：Spec 需要被非 git 流程消费（npm 包、内部文档站）时再引入。
