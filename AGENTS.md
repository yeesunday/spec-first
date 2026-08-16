# spec-first repository guidance

1. 这是方法论、默认模板、Schema、校验器和示例仓库；先读 `README.md` 与 `docs/` 中和任务相关的说明。
2. 分层 Spec 使用统一元数据和目录；专业契约保留 OpenAPI/Protobuf/SQL/Figma 资源等原生格式。
3. 修改默认约定、模板或 Schema 时，同步更新示例和校验器，并说明迁移影响。
4. 不添加没有真实消费者、所有者或验证方式的流程字段。
5. 完成后运行示例测试、`tools/validate.mjs`（针对示例项目）和文档链接检查。
