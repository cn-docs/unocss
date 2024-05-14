---
title: 自动完成工具
description: UnoCSS 的自动完成工具 (@unocss/autocomplete)。
---

# 自动完成

UnoCSS 的自动完成工具：`@unocss/autocomplete`。这已经嵌入在<a href="/play" target="_blank" rel="noreferrer">示例环境</a>和 [VS Code 扩展](/integrations/vscode) 中。

## 用法

### 静态规则

像这样的静态规则将无需任何配置即可正常工作。

```ts
rules: [
  ['flex', { display: 'flex' }]
]
```

### 动态规则

对于动态规则，您可以为规则提供额外的 `meta` 对象，并指定自动完成模板。

```ts
rules: [
  [
    /^m-(\d)$/,
    ([, d]) => ({ margin: `${d / 4}rem` }),
    { autocomplete: 'm-<num>' }, // <-- 这里
  ],
]
```

该模板使用简单的 DSL 来指定自动完成建议。语法如下：

- `(...|...)`：逻辑 OR 组，使用 `|` 作为分隔符。当某些组匹配时，将用作建议。
- `<...>`：内置简写。目前支持 `<num>`、`<percent>` 和 `<directions>`
- `$...`：主题推断。例如 `$colors` 将列出主题的 `colors` 对象的所有属性。

## 示例

### 示例 1

- **模板**：`(border|b)-(solid|dashed|dotted|double|hidden|none)`
- **输入**：`b-do`
- **建议**：`b-dotted`、`b-double`

### 示例 2

- **模板**：`m-<num>`
- **输入**：`m-`
- **建议**：`m-1`、`m-2`、`m-3`…

### 示例 3

- **模板**：`text-$colors`
- **输入**：`text-r`
- **建议**：`text-red`、`text-rose`…

### 示例 4

对于多个模板：

- **模板**：`['(border|b)-<num>', '(border|b)-<directions>-<num>']`
- **输入**：`b-`
- **建议**：`b-x`、`b-y`、`b-1`、`b-2`…
- **输入**：`b-x-`
- **建议**：`b-x-1`、`b-x-2`…

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
