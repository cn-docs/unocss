---
title: 规则
description: 为 UnoCSS 编写自定义规则非常简单。
---

# 规则

规则定义工具类以及生成的 CSS。UnoCSS 提供了许多内置规则，同时也允许您轻松添加自定义规则。

## 静态规则

例如：

```ts
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

每当在用户代码中检测到 `m-1` 时，将生成如下 CSS：

<!-- eslint-skip -->

```css
.m-1 { margin: 0.25rem; }
```

> **注意**：规则体的语法遵循 CSS 属性语法，例如应使用 `font-weight` 而非 `fontWeight`。如果属性名中包含连字符 `-`，则需要加引号。
>
> ```ts
> rules: [
>   ['font-bold', { 'font-weight': 700 }],
> ]
> ```

## 动态规则

为了使规则更智能，可以将匹配器改为正则表达式，并将规则体改为函数：

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
  [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```

规则体函数的第一个参数为正则匹配结果，您可以通过解构获取匹配的分组。

例如，使用如下代码：

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>
```

将生成对应的 CSS：

<!-- eslint-skip -->

```css
.m-100 { margin: 25rem; }
.m-3 { margin: 0.75rem; }
.p-5 { padding: 1.25rem; }
```

恭喜！现在您拥有了强大的原子 CSS 工具类，尽情享受吧！

## CSS 规则降级

在某些情况下，为了利用 CSS 新特性同时兼容旧浏览器，您可以选择返回一个二维数组来表示具有相同键的 CSS 规则。例如：

```ts
rules: [
  [/^h-(\d+)dvh$/, ([_, d]) => {
    return [
      ['height', `${d}vh`],
      ['height', `${d}dvh`],
    ]
  }],
]
```

这样，`h-100dvh` 将生成：

<!-- eslint-skip -->

```css
.h-100dvh { height: 100vh; height: 100dvh; }
```

## 顺序

UnoCSS 会保留您定义的规则在生成 CSS 中的顺序，后定义的规则优先级更高。

使用动态规则时，可能会匹配多个令牌。默认情况下，同一动态规则匹配的输出会在组内按字母顺序排序。

## 规则合并

默认情况下，UnoCSS 会合并规则体相同的 CSS 规则以减小 CSS 体积。

例如，`<div class="m-2 hover:m2">` 将生成：

```css
.hover\:m2:hover,
.m-2 {
  margin: 0.5rem;
}
```

而不是生成两个独立的规则：

```css
.hover\:m2:hover {
  margin: 0.5rem;
}
.m-2 {
  margin: 0.5rem;
}
```

## 特殊符号

自 v0.61 起，UnoCSS 支持使用特殊符号为生成的 CSS 定义额外的元信息。您可以从动态规则匹配函数的第二个参数中访问这些符号。

例如：

```ts
rules: [
  [/^grid$/, ([, d], { symbols }) => {
    return {
      [symbols.parent]: '@supports (display: grid)',
      display: 'grid',
    }
  }],
]
```

将生成：

```css
@supports (display: grid) {
  .grid {
    display: grid;
  }
}
```

### 可用符号

- `symbols.parent`：生成的 CSS 规则的父级包装器（例如 `@supports`、`@media` 等）。
- `symbols.selector`：用于修改生成 CSS 规则的选择器的函数（参见下面的例子）。
- `symbols.layer`：用于设置生成 CSS 规则的 UnoCSS 层级的字符串/函数/正则匹配。
- `symbols.variants`：应用于当前 CSS 对象的一组变体处理器数组。
- `symbols.shortcutsNoMerge`：布尔值，用于禁用快捷方式中对当前规则的合并。
- `symbols.sort`：数字，用于覆盖当前 CSS 对象的排序顺序。

## 多选择器规则

自 v0.61 起，UnoCSS 支持通过 [JavaScript 生成器函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 实现多选择器。

例如：

```ts
rules: [
  [/^button-(.*)$/, function* ([, color], { symbols }) {
    yield {
      background: color
    }
    yield {
      [symbols.selector]: selector => `${selector}:hover`,
      // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
      background: `color-mix(in srgb, ${color} 90%, black)`
    }
  }],
]
```

将生成多个 CSS 规则：

```css
.button-red {
  background: red;
}
.button-red:hover {
  background: color-mix(in srgb, red 90%, black);
}
```

## 完全控制的规则

::: tip
这是一个高级功能，在大多数情况下并不需要。
:::

当您确实需要一些动态规则和变体无法涵盖的高级规则时，UnoCSS 也提供了一种方式，让您可以完全控制生成的 CSS。

它允许您从动态规则的规则体函数返回一个字符串，该字符串会**直接**作为生成 CSS 的内容（这也意味着您需要自行处理诸如 CSS 转义、变体应用、CSS 构建等问题）。

```ts [uno.config.ts]
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
      // 丢弃不匹配的规则
      if (name.includes('something'))
        return

      // 如果需要，可以禁用此规则的变体
      if (variantHandlers.length)
        return
      const selector = e(rawSelector)
      // 返回字符串而不是对象
      return `
${selector} {
  font-size: ${theme.fontSize.sm};
}
/* 您可以有多个规则 */
${selector}::after {
  content: 'after';
}
.foo > ${selector} {
  color: red;
}
/* 或者媒体查询 */
@media (min-width: ${theme.breakpoints.sm}) {
  ${selector} {
    font-size: ${theme.fontSize.sm};
  }
}
`
    }],
  ],
})
```
