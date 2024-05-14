---
title: 变体
description: 变体允许您对现有规则应用一些变化，类似于 Tailwind CSS 中的 `hover:` 变体。
---

# 变体

[变体](https://windicss.org/utilities/general/variants.html)允许您对现有规则应用一些变化，类似于 Tailwind CSS 中的 `hover:` 变体。

## 示例

<!--eslint-skip-->

```ts
variants: [
  // hover:
  (matcher) => {
    if (!matcher.startsWith('hover:'))
      return matcher
    return {
      // 切片 `hover:` 前缀并传递给下一个变体和规则
      matcher: matcher.slice(6),
      selector: s => `${s}:hover`,
    }
  },
],
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

- `matcher` 控制变体何时启用。如果返回值是一个字符串，则将其用作匹配规则的选择器。
- `selector` 提供了自定义生成的 CSS 选择器的可用性。

## 在幕后

让我们来看看匹配 `hover:m-2` 时发生了什么：

- 从用户的用法中提取了 `hover:m-2`
- 将 `hover:m-2` 发送给所有变体进行匹配
- `hover:m-2` 被我们的变体匹配到，并返回 `m-2`
- 结果 `m-2` 将用于下一轮变体匹配
- 如果没有其他变体匹配，`m-2` 将会进入规则匹配
- 我们的第一条规则被匹配，并生成 `.m-2 { margin: 0.5rem; }`
- 最后，我们将我们的变体转换应用于生成的 CSS。在本例中，我们在 `selector` 钩子前添加了 `:hover`

因此，将生成以下 CSS：

```css
.hover\:m-2:hover { margin: 0.5rem; }
```

有了这个，我们可以在用户悬停在元素上时应用 `m-2`。

## 更进一步

变体系统非常强大，在本指南中无法完全覆盖，您可以查看[默认预设的实现](https://github.com/unocss/unocss/tree/main/packages/preset-mini/src/_variants)以了解更高级的用法。
