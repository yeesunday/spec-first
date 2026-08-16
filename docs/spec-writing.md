# 写作与目录约定

> 给谁看：所有要写 Spec 的人（PM、产品、设计、架构、前后端、测试）。目标：让每个人写出的 Spec 能被别人和 AI 准确理解，不需要额外解释。

## 一个 Spec 是什么

**一个 Spec 是一个目录**，目录名等于 `spec.id`，至少有一个 `README.md`。README 负责身份、目的、边界、依赖和消费说明；专业正文（接口、表结构、用例）放在最适合现有工具的原生文件里，不抄进 README。

```text
spec/
└── api/API-due-date/          ← 目录名 = spec.id = 类型前缀 + 业务名
    ├── README.md              ← 身份 + 摘要 + 决策（人读）
    └── todo.openapi.json      ← 契约本体（工具读）
```

README 开头的 frontmatter 是全仓库统一的元数据：

```yaml
---
spec:
  id: API-due-date
  type: api
  version: 1.0.0
  status: approved
  owner: backend
  depends_on: [REQ-due-date, ARCH-due-date]
  source: todo.openapi.json
  updated: 2026-08-16
---
```

| 字段 | 必填 | 含义 |
|---|---|---|
| `id` | ✅ | 跨文档、Issue、PR、测试引用的稳定标识，格式 `<类型前缀>-<业务名>` |
| `type` | ✅ | 所在目录类型，只能是下面 7 类之一 |
| `version` | ✅ | 对外消费的版本，随实质变更递增 |
| `status` | ✅ | `draft → review → approved → deprecated` |
| `owner` | ✅ | 对内容解释负责的人或团队（不限制固定角色枚举） |
| `depends_on` | — | 直接依赖的 Spec，不需要维护反向关系 |
| `source` | — | 目录内的主要原生契约文件 |
| `artifacts` | — | 多个原生文件或资源的相对路径 |
| `updated` | — | 最近一次实质修改日期 |

两个简化决定（都是有意为之）：

- **没有"已实现"状态**。是否实现由 PR、测试、CI 和发布记录证明，不在文档里手工维护——手填的状态一定会撒谎。
- **没有全局优先级**。语义冲突由相关负责人在 PR 里当面解决，不由一条优先级规则自动裁决。

## 7 类 Spec 速查

| 类型 | 前缀 | README 重点 | 原生附件 | 主要负责人 |
|---|---|---|---|---|
| project | `PROJ-` | 目标、范围、里程碑、风险（**Markdown 表格**，不写 YAML） | 无 | PM |
| product | `REQ-` | 目的、用户故事、业务规则、边界 | `ACCEPTANCE.md` | Product |
| design | `DES-` | 页面结构、交互状态、无障碍、设计链接 | tokens、SVG、PNG、Figma 导出 | Design |
| architecture | `ARCH-` | 组件边界、数据流、非功能约束 | Mermaid、ADR | Architect |
| api | `API-` | 契约用途、兼容策略、错误约定 | OpenAPI、Protobuf、AsyncAPI | Backend |
| domain | `DOM-` | 数据所有权、约束、迁移策略 | SQL、Prisma、JSON Schema | Backend |
| test | `TEST-` | 覆盖哪些需求、环境、测试层级 | Markdown 用例表（Excel 习惯）；Gherkin 可选 | QA |

**为什么项目状态用 Markdown 表格而不是 YAML？** PM 的工作对象是表格和清单（周报、评审会、群聊），不是配置文件。目标/里程碑/风险各一张表，状态列直接打勾——可读、可讨论、可截图。AI 读结构化 Markdown 表格同样准确。

**不创建用不上的类型**。一个需求只影响哪几类，就只建哪几个目录；删掉模板里不适用的章节，不要填空话。

## 一份事实只有一个主人

同一件事只在它该在的地方写一次：

- 产品需求表达**业务规则**，不抄完整接口字段；
- API Spec 表达**请求/响应**，不重新定义业务目标；
- 数据 Spec 表达**表结构和迁移**，不复制 API 示例；
- 设计 Spec 表达**交互和视觉**，不复制 CSS 实现；
- 测试 Spec 表达**验证方式**，不替代验收标准；
- 项目 Spec 表达**计划和状态**，不替代 Issue 系统。

把原生文件放进 Spec 目录不是重复；重复是把同一事实手工写在两处。

## 条款编号与引用

给别人和 AI 一个能指到的地址：

- 需求规则用 `R1`、`R2`…，验收标准用 `AC-1`、`AC-2`…，测试用例用 `TC-1`…；
- 引用写成 `REQ-due-date#R1`、`TEST-due-date#TC-3`；
- OpenAPI 可以加 `x-requirements` 扩展字段回链条款，校验器会检查引用存在：

```yaml
x-requirements:
  - REQ-due-date#R4
```

不能加扩展字段的文件（SQL、图片），就在 README 的"关联条款"表格里写。

## 写一条合格规则的三个问题

提交前问自己：

1. **可判定吗？** "响应要快"不合格，"P95 ≤ 200ms"合格。数字优于形容词。
2. **有人会因为删掉它做错事吗？** 不会，就删掉（防止文档膨胀）。
3. **它在它该在的地方吗？** 验收标准归 REQ，字段定义归 OpenAPI，别写重。

负面示例：❌"按之前讨论的方案做"（没有前文可查）；✅"R2：未完成且日期早于今天的任务显示 overdue"（任何人和 AI 读同一句得到同一结果）。

## 检查清单（提交 Spec PR 前）

- [ ] 目录名 = `spec.id`，frontmatter 必填字段齐全
- [ ] 条款有稳定编号，跨文档引用用 `#` 地址
- [ ] 原生契约在 `source`/`artifacts` 里，没有把字段抄进 README
- [ ] 每条规则可判定，无"尽快/合理/按之前说的"
- [ ] 删掉不适用章节，没有填空话
- [ ] 跑过 `tools/validate.mjs`
