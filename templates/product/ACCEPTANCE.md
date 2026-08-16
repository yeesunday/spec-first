<!--
  验收标准模板（与 REQ README 配套）
  用法：每个业务规则至少对应一个 AC；编号 AC-1/AC-2/…，测试用例表引用这些编号。
  判定标准：任何一个人和 AI 读同一个 AC，都能给出同一个"过/不过"结论。
-->
# 验收标准：<REQ id>

## AC-1：<场景名>

```gherkin
Given <前置状态>
When <动作>
Then <可观测结果>
And <补充断言>
```

验证：`TEST-<slug>#TC-1`

## AC-2：<场景名>

```gherkin
Given <前置状态>
When <动作>
Then <可观测结果>
```

验证：`TEST-<slug>#TC-2`
