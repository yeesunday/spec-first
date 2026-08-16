# 验收标准：REQ-due-date

## AC-1：设置和清除日期

```gherkin
Given 一个 Todo 任务
When 用户设置或清除一个合法的截止日期
Then 任务保存新的日期或 null
```

验证：`TEST-due-date#TC-1`

## AC-2：显示过期状态

```gherkin
Given 一个未完成任务的截止日期是昨天
When 当前日期是今天
Then 徽标为 overdue
```

验证：`TEST-due-date#TC-2`

## AC-3：已完成任务不显示徽标

```gherkin
Given 一个已完成任务的截止日期是昨天
When 打开任务列表
Then 不显示日期徽标
```

验证：`TEST-due-date#TC-3`

## AC-4：无日期排最后

```gherkin
Given 两个有日期的任务和一个无日期任务
When 按截止日期升序排列
Then 无日期任务位于最后
```

验证：`TEST-due-date#TC-4`

## AC-5：周一快捷项

```gherkin
Given 当前日期是 2026-08-17（周一）
When 用户选择“下周一”
Then 日期是 2026-08-24
```

验证：`TEST-due-date#TC-5`

## AC-6：标题自动识别

```gherkin
Given 新建任务标题为“明天交周报”
When 用户输入标题
Then 表单自动预填明天的日期
And 标题保持原文
```

验证：`TEST-due-date#TC-6`

## AC-7：无匹配或歧义不预填

```gherkin
Given 标题为“记得交周报”或“月底前交报告”
When 用户输入标题
Then 不预填日期
And 不显示任何错误
```

验证：`TEST-due-date#TC-7`
