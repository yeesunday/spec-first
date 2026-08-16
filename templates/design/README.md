<!--
  模板：设计规范（Design 维护）
  用法：复制到 spec/design/DES-<slug>/。
  铁律：交互状态必须全枚举（正常/加载/错误/边界），不许"正常情况只有……"的省略；
  tokens/图片等资源放目录内并在 artifacts 声明。
  完整示例：examples/todo-due-date/spec/design/DES-due-date/README.md
-->
---
spec:
  id: DES-<slug>
  type: design
  version: 0.1.0
  status: draft
  owner: design
  depends_on: [REQ-<slug>]
  artifacts: [tokens.json]
  updated: 2026-01-01
---

# 设计规范：<名称>

## 页面与组件

<页面/弹窗/组件树，以及每个组件的职责。可用文字树或 Mermaid。>

## 交互状态

| 状态 | 进入条件 | 用户可见结果 | 可执行动作 |
|---|---|---|---|
| idle | <条件> | <结果> | <动作> |
| loading | <条件> | <结果> | <动作> |
| error | <条件> | <结果> | <动作> |
| <其他边界状态> | <条件> | <结果> | <动作> |

## 资源与链接

- 设计稿：<固定版本的 Figma 链接；离线资产存目录内>
- tokens：`tokens.json`
- 资源：<SVG/PNG/字体等，列入 artifacts>

## 无障碍

<键盘可达、读屏文本、对比度、焦点顺序；没有要求就删除本节。>
