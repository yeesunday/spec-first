# 默认模板

> 用法：新建 Spec 时，**只复制受影响类型的模板**；目录名改成 `<前缀>-<业务名>`；删掉不适用章节，不要填空话。
> 每个模板头部都有"完整示例"指针——真实填好的文件在 [examples/todo-due-date](../examples/todo-due-date/README.md)。

| 模板 | 谁用 | 一句话 |
|---|---|---|
| [团队约定](CONVENTIONS.md) | 全体 | 目录、元数据、生命周期、条款编号的团队规范 |
| [项目管理](project/README.md) | PM | 目标/里程碑/风险用 Markdown 表格维护（不写 YAML） |
| [产品需求](product/README.md) + [验收标准](product/ACCEPTANCE.md) | Product | 业务规则 R 编号 + 可判定的验收 AC 编号 |
| [设计](design/README.md) | Design | 交互状态全枚举 + 设计资源 |
| [架构](architecture/README.md) + [ADR](architecture/ADR-001.md) | Architect | 边界与取舍；不可逆决策写 ADR |
| [接口](api/README.md) + [OpenAPI 示例](api/contract.openapi.json) | Backend | 契约本体 + 需求回链 |
| [数据](domain/README.md) + [SQL 示例](domain/schema.sql) | Backend | 所有权、约束、迁移 |
| [测试](test/README.md) + [用例表](test/cases.md) | QA | 覆盖映射 + Excel 习惯的用例表 |
| [变更提案](change/proposal.md) + [任务](change/tasks.md) | Tech Lead | 跨角色/破坏性改动先写提案 |
| [Agent 规则](AGENTS.md) + [路径映射](spec-map.yml) | 工程负责人 | 决定 AI 读什么、怎么守规矩 |

写作规则见 [docs/spec-writing.md](../docs/spec-writing.md)，校验器见 [tools/validate.mjs](../tools/validate.mjs)。
