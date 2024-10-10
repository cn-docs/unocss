---
title: 规则
description: 为 UnoCSS 编写自定义规则非常简单。
---

# 规则

规则定义了实用类和生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则。

## 静态规则

使用这个例子：

```ts
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

每当在用户代码中检测到 `m-1` 时，将生成以下 CSS：

```css
.m-1 { margin: 0.25rem; }
```

> **注意**：属性语法遵循 CSS 属性语法，例如 `font-weight` 而不是 `fontWeight`。如果属性名中有连字符 `-`，应该用引号括起来。
>
> ```ts
> rules: [
>   ['font-bold', { 'font-weight': 700 }],
> ]
> ```

## 动态规则

为了使其更智能，将匹配器更改为 `RegExp`，将主体更改为函数：

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
  [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```

主体函数的第一个参数是 `RegExp` 匹配结果，可以解构以获取匹配的组。

例如，使用以下用法：

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>
```

将生成相应的 CSS：

```css
.m-100 { margin: 25rem; }
.m-3 { margin: 0.75rem; }
.p-5 { padding: 1.25rem; }
```

恭喜！现在你拥有了自己强大的原子 CSS 实用程序。享受吧！

## 排序

UnoCSS 遵循你在生成的 CSS 中定义的规则顺序。后定义的规则具有更高的优先级。

在使用动态规则时，它可能会匹配多个标记。默认情况下，在单个动态规则下匹配的输出将在组内按字母顺序排序。

## 规则合并

默认情况下，UnoCSS 会合并具有相同内容的 CSS 规则以最小化 CSS 大小。

例如，`<div class="m-2 hover:m2">` 会生成：

```css
.hover\:m2:hover, .m-2 { margin: 0.5rem; }
```

而不是两个独立的规则：

```css
.hover\:m2:hover { margin: 0.5rem; }
.m-2 { margin: 0.5rem; }
```

## 特殊符号

从 v0.61 版本开始，UnoCSS 支持使用特殊符号为生成的 CSS 定义额外的元信息。你可以从动态规则匹配函数的第二个参数访问符号。

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

会生成：

```css
@supports (display: grid) {
  .grid {
    display: grid;
  }
}
```

### 可用符号

- `symbols.parent`：生成的 CSS 规则的父级包装器（例如 `@supports`、`@media` 等）。
- `symbols.selector`：用于修改生成的 CSS 规则选择器的函数（参见下面的示例）。
- `symbols.layer`：一个字符串/函数/正则表达式匹配项，用于设置生成的 CSS 规则的 UnoCSS 层。
- `symbols.variants`：应用于当前 CSS 对象的变体处理器数组。
- `symbols.shortcutsNoMerge`：一个布尔值，用于禁用当前规则在快捷方式中的合并。
## 多选择器规则

从 v0.61 版本开始，UnoCSS 支持通过 [JavaScript 生成器函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 实现多选择器。

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

会生成多个 CSS 规则：

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
这是一个高级特性，在大多数情况下不会需要。
:::

当您确实需要一些高级规则，这些规则不被 [动态规则](#dynamic-rules) 和 [变体](/config/variants) 的组合所覆盖时，UnoCSS 还提供了一种完全控制生成 CSS 的方法。

它允许您从动态规则的主体函数中返回一个字符串，该字符串将 **直接** 传递给生成的 CSS（这也意味着您需要处理诸如 CSS 转义、变体应用、CSS 构建等问题）。

```ts [uno.config.ts]
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
      // 丢弃不匹配的规则
      if (name.includes('something'))
        return

      // 如果您愿意，您可以禁用此规则的变体
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

## 排序

UnoCSS 尊重您在生成的 CSS 中定义的规则的顺序。后面的规则优先级更高。

使用动态规则时，可能会匹配多个令牌。默认情况下，在单个动态规则下匹配的输出将在组内按字母顺序排序。

## 规则合并

默认情况下，UnoCSS 将具有相同主体的 CSS 规则合并以最小化 CSS 大小。

例如，`<div class="m-2 hover:m2">` 将生成：

```css
.hover\:m2:hover, .m-2 { margin: 0.5rem; }
```

而不是两条单独的规则：

```css
.hover\:m2:hover { margin: 0.5rem; }
.m-2 { margin: 0.5rem; }
```
