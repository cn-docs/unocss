---
title: 样式重置
description: 默认情况下，UnoCSS 不提供样式重置或预设，以保持最大的灵活性，并且不会填充你的全局 CSS。
outline: deep
---

# 浏览器样式重置

默认情况下，UnoCSS 不提供样式重置或预设，这样做是为了不填充你的全局 CSS 以及保持最大的灵活性。如果你与其他 CSS 框架一起使用 UnoCSS，它们可能已经为你做了重置。如果你单独使用 UnoCSS，你可以使用像 [Normalize.css](https://github.com/csstools/normalize.css) 这样的重置库。

我们还提供了一个小集合，方便你快速获取：

## 安装

::: code-group

```bash [pnpm]
pnpm add @unocss/reset
```

```bash [yarn]
yarn add @unocss/reset
```

```bash [npm]
npm install @unocss/reset
```

:::

## 使用

你可以在你的 `main.js` 中添加以下任一重置样式表。

### Normalize.css

来源：https://github.com/csstools/normalize.css

```ts
import '@unocss/reset/normalize.css'
```

### sanitize.css

来源：https://github.com/csstools/sanitize.css

```ts
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
```

### Eric Meyer

来源：https://meyerweb.com/eric/tools/css/reset/index.html

```ts
import '@unocss/reset/eric-meyer.css'
```

### Tailwind

```ts
import '@unocss/reset/tailwind.css'
```

### Tailwind 兼容

```ts
import '@unocss/reset/tailwind-compat.css'
```

这个重置基于 [Tailwind reset](#tailwind)，除去按钮的背景色覆盖，以避免与 UI 框架的冲突。详见 [相关问题](https://github.com/unocss/unocss/issues/2127)。

::: code-group

```css [Before]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
```

```css [After]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  /*background-color: transparent; !* 2 *!*/
  background-image: none; /* 2 */
}
```

:::
