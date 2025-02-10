---
title: 变体
description: 变体允许您对现有规则应用一些变化。
---

# 变体

[变体](https://windicss.org/utilities/general/variants.html) 允许您对现有规则进行一些变化，例如 Tailwind CSS 中的 `hover:` 变体。

## 示例

<!--eslint-skip-->

```ts
variants: [
  // hover:
  (matcher) => {
    if (!matcher.startsWith('hover:'))
      return matcher
    return {
      // 去除 `hover:` 前缀，并传递给下一个变体和规则
      matcher: matcher.slice(6),
      selector: s => `${s}:hover`,
    }
  },
],
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

- `matcher` 控制何时启用变体。如果返回值是字符串，则该字符串将作为选择器用于规则匹配。
- `selector` 提供了自定义生成 CSS 选择器的能力。

## 内部原理

下面我们来看看匹配 `hover:m-2` 时发生了什么：

- 从用户代码中提取到 `hover:m-2`
- 将 `hover:m-2` 发送给所有变体进行匹配
- 我们的变体匹配到 `hover:m-2` 并返回 `m-2`
- 结果 `m-2` 将用于下一轮变体匹配
- 如果没有其他变体匹配，则 `m-2` 会用于匹配规则
- 我们的第一个规则匹配成功，生成 `.m-2 { margin: 0.5rem; }`
- 最后，对生成的 CSS 应用变体转换，此例中我们在选择器前添加了 `:hover`

因此，将生成如下 CSS：

<!-- eslint-skip -->

```css
.hover\:m-2:hover { margin: 0.5rem; }
```

这样，`m-2` 只会在用户将鼠标悬停在元素上时生效。

## 进一步了解

变体系统功能十分强大，本文档无法涵盖所有用法，您可以查看 [默认预设的实现](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini/src/_variants) 以了解更多高级用法。
