# Spec 编写约定

> 复制到 `spec/CONVENTIONS.md` 并按团队情况修改。这份文件是全仓库 Spec 的**规范底线**，所有人（和 AI）先读它。

## 共同要求

- 一个 Spec 是一个目录，目录名等于 `spec.id`，必须有 `README.md`；
- README 使用 `schema/spec-contract.schema.json` 的 frontmatter（`id/type/version/status/owner` 必填）；
- 重要规则使用稳定条款 ID（需求 `R1`、验收 `AC-1`、测试 `TC-1`），跨文档引用写成 `REQ-xxx#R1`；
- 专业契约保存为原生文件（OpenAPI/SQL/tokens/用例表），**不把同一事实手工复制到另一份文档**；
- 修改 Spec、代码或测试时，使用同一个 PR 评审相关变化。

## 目录

```text
spec/{project,product,design,architecture,api,domain,test}/<SPEC-ID>/
```

只创建受影响类型的目录；用不上的类型不建。

## 生命周期

`draft → review → approved → deprecated`

- `draft`：起草中，不对外承诺；
- `review`：等待评审（PR 中）；
- `approved`：可以按它实现和消费；
- `deprecated`：停止使用，保留历史。

`approved` 表示内容可被消费；**是否已实现由测试、CI、PR 和发布记录证明，不在 Spec 中手工填写**。

## 状态与任务

- 项目状态（目标/里程碑/风险）用 Markdown 表格维护在 `PROJ-*` 的 README 里，PM 直接改表；
- 执行任务留在 Jira / Linear / GitHub Issues 等已有工具，Spec 和 Issue 用需求 ID 互相对照。

## 提交信息

格式：`<type>(<scope>): <一句话说明>`

- `type`：`feat` 新功能 / `fix` 修复 / `docs` 文档 / `refactor` 重构 / `test` 测试 / `chore` 杂项
- `scope`：优先用 Spec ID（`REQ-due-date`、`API-due-date`）或目录名（`templates`、`tools`、`docs`）；改动跨多范围时可省略
- 说明：动词开头，一句话说清做了什么；涉及 Spec 变更的必须带 spec id
- 一个提交只做一件事，不"顺手改"

示例：

```text
feat(REQ-due-date): 实现标题自动识别 R6~R8
fix(API-due-date): 修正 dueDate 为 null 时的校验
docs(workflow): 补充运行期反馈闭环
chore(tools): 校验器只收集 x-requirements 引用
```

## 禁止事项

- ❌ 把接口字段抄进需求文档（写 `REQ-xxx#R1` 引用即可）；
- ❌ 手填"已实现"状态（看 CI 和发布记录）；
- ❌ 复制一份 delta Spec 副本（Git PR diff 就是变更记录）；
- ❌ 写"尽快/合理/按之前说的"这类不可判定表述；
- ❌ 为不存在的需求预建 Spec 目录。
