# Todo 截止日期走查

## 1. 需求和验收

[REQ-due-date](spec/product/REQ-due-date/README.md) 描述目的、业务规则（R1~R8，含标题自动识别）和边界；[ACCEPTANCE.md](spec/product/REQ-due-date/ACCEPTANCE.md) 描述可判定的 AC-1～AC-7。产品和 QA 先评审这两份文件。

## 2. 专业契约

这个需求确实影响多个事实，所以才创建对应目录：

- 设计状态和资源：[DES-due-date](spec/design/DES-due-date/README.md)；
- 系统边界和取舍：[ARCH-due-date](spec/architecture/ARCH-due-date/README.md)；
- HTTP 契约：[todo.openapi.json](spec/api/API-due-date/todo.openapi.json)；
- 数据迁移：[schema.sql](spec/domain/DOM-due-date/schema.sql)；
- 测试覆盖：[TEST-due-date](spec/test/TEST-due-date/README.md)。

OpenAPI、SQL、tokens 和 SVG 都是目录中的原生文件，没有被抄写到另一套格式中。

## 3. 执行和变更

[CHANGE-001](changes/CHANGE-001/) 记录为什么需要跨角色评审、影响范围和任务。具体文档变化由 Git PR diff 表达，没有 `changes/.../specs/` 副本。

前端执行者默认阅读 REQ、DES、ARCH、API、TEST；后端执行者默认阅读 REQ、ARCH、API、DOM、TEST；QA 默认阅读 REQ、ACCEPTANCE、DES、API、TEST。任何任务只需沿明确引用补充阅读。

## 4. 当前实现状态

`src/domain/due-date.js`、`src/ui/due-date.js` 和 `src/ui/detect.js` 已实现并测试 R1～R8（含标题自动识别）。HTTP handler、数据库接入、真实 UI 和 E2E 是 Change 中未勾选的后续任务。运行 `npm test` 会同时执行业务测试和 Spec 引用校验。
