---
spec:
  id: DES-due-date
  type: design
  version: 1.0.0
  status: approved
  owner: design
  depends_on: [REQ-due-date]
  source: tokens.json
  artifacts: [assets/due-date.svg]
  updated: 2026-08-16
---

# 截止日期设计规范

## 交互状态

日期选择器状态：`closed → open → picked → closed`。用户可以清除已选日期；非法输入显示校验错误，不改变已保存值。

标题输入识别到日期时（`REQ-due-date#R6`），表单自动预填并显示轻提示“已识别：<原文片段>”；预填只是建议，可修改、可清除。

## 日期徽标

| 状态 | 文案 | 视觉 |
|---|---|---|
| due-today | 今天到期 | 警告色 |
| overdue | 已过期 | 危险色 |
| none/completed | 无徽标 | 不渲染 |

## 资源

- tokens：`tokens.json`
- 示例资源：`assets/due-date.svg`
- Figma：<替换为固定版本链接；本示例不依赖在线设计稿>

## 无障碍

徽标不能只依赖颜色；日期选择器支持键盘操作，并为状态提供可读文本。
