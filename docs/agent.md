# Agent 指南

> 给谁看：给 AI 配规则的工程负责人，以及每个仓库里的 AI Agent。目标：让 Agent 读得少、读得准、改得稳。

## 仓库入口（Agent 的启动顺序）

1. 读仓库根目录和最近的 `AGENTS.md`；
2. 读 `spec/CONVENTIONS.md`；
3. 读 `spec-map.yml`（如果存在）；
4. 按当前角色和任务，映射到具体 Spec 目录及其 `depends_on`。

**不要**要求 Agent 读整个 `spec/` 树，也**不要**把所有人的规则塞进一份 AGENTS.md——入口越短，遵守率越高。

## spec-map.yml：角色清单 + 路径映射

```yaml
spec_root: spec/
roles:
  frontend:
    always: [product, design, api, test]     # 该角色任何时候都读
  backend:
    always: [product, architecture, api, domain, test]
mappings:
  - paths: ["src/ui/**"]                     # 代码路径 → 具体 Spec ID
    role: frontend
    specs: [REQ-due-date, DES-due-date, ARCH-due-date, API-due-date, TEST-due-date]
```

两层机制：

- `roles.<role>.always` 用**类型名**，管"这个角色默认懂什么"；
- `mappings[].specs` 用**真实 Spec ID**，管"动这块代码时具体读哪几份"。

小项目可以不建映射文件：按路径和 PR 描述阅读即可。规范版本见 [templates/spec-map.yml](../templates/spec-map.yml)。

## 没有 Spec 的路径怎么办

未映射路径**不等于禁止修改**。普通内部实现按代码和测试正常工作；只有以下情况才停下来，向人提问或先提 Spec PR：

- 行为不明确，且会变成别人依赖的公共行为；
- 会改变公共契约（接口、表结构、事件、配置项）；
- 涉及数据迁移或不可逆操作。

这条规则的本意是：**别用"没写 Spec"当乱改的借口，也别用"没写 Spec"当不动手的理由**。

## 执行前后检查与报告

执行前问自己五句（[工作流](workflow.md) 有完整版）：

1. 读到的 Spec 覆盖当前任务吗？哪几条直接约束这次修改？
2. 要改哪些原生契约文件？
3. 文档之间有没有矛盾？
4. 有缺口，是先补 Spec 还是先写代码？
5. 这次改动会让别的消费者措手不及吗？

执行后报告固定四件套：

```text
Spec 使用：REQ-due-date#R1/R2、API-due-date、TEST-due-date
文件修改：src/ui/due-date.js、test/due-date.test.js
偏差说明：无 / 发现 XX 与 Spec 不一致，已提 Spec PR #12
验证命令：npm test（8 通过）、tools/validate.mjs（无错误）
```

**报告里不出现"应该没问题"**——只有跑过的命令和它们的结果。
