# 示例：Todo 截止日期

这个示例展示一个跨角色需求如何组织，而不是要求每个需求都创建全部类型的 Spec。

## 运行

```bash
cd examples/todo-due-date
npm test
```

项目零第三方依赖。测试会检查业务规则、Spec 元数据、原生 OpenAPI/SQL/设计资源和引用关系；当前只实现了日期领域规则，HTTP、数据库和完整 UI 仍由 Change 任务跟踪。

## 目录

```text
spec/CONVENTIONS.md
spec/project/PROJ-overview/          项目目标和状态
spec/product/REQ-due-date/          产品需求和验收标准
spec/design/DES-due-date/           交互状态、tokens、SVG
spec/architecture/ARCH-due-date/    架构设计和 ADR
spec/api/API-due-date/              README + todo.openapi.json
spec/domain/DOM-due-date/           README + schema.sql
spec/test/TEST-due-date/            覆盖映射 + 用例表（Markdown）
changes/CHANGE-001/                 提案和任务，不含 delta 副本
src/                                已实现的领域/UI 日期规则（含标题自动识别）
test/                               可执行验证
```

角色阅读入口和路径映射见 [AGENTS.md](AGENTS.md) 与 [spec-map.yml](spec-map.yml)。完整走查见 [WALKTHROUGH.md](WALKTHROUGH.md)。
