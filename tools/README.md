# tools

`validate.mjs` 是零依赖的结构校验器：

```bash
node tools/validate.mjs <project-root>
```

它检查：

- `spec/<type>/<id>/README.md` 目录和共同元数据；
- Spec ID 唯一、前缀/type 一致、版本和状态合法；
- `depends_on` 能解析；
- `source`、`artifacts` 与 Markdown 本地链接存在；
- `spec-map.yml` 中的 Spec ID 存在；
- OpenAPI JSON 的 `x-requirements` / `x-spec-id` 能解析到 Spec。

它不取代 OpenAPI lint、SQL migration、设计检查或测试框架，也不声称自动判断自然语言语义冲突。
