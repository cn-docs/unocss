---
title: Attributify JSX 转换器
description: 在 JSX/TSX 中支持无值 attributify（@unocss/transformer-attributify-jsx）
---

# Attributify JSX 转换器

在 JSX/TSX 中支持 [无值 attributify](/presets/attributify#无值-attributify)：`@unocss/transformer-attributify-jsx`。

## 展示效果

<!-- @unocss-ignore -->

```jsx
export function Component() {
  return (
    <div text-red text-center text-5xl animate-bounce>
      unocss
    </div>
  )
}
```

将被转换为：

```jsx
export function Component() {
  return (
    <div text-red="" text-center="" text-5xl="" animate-bounce="">
      unocss
    </div>
  )
}
```

::: details 如果不使用此转换器，JSX 会将无值属性视为布尔属性。

```jsx
export function Component() {
  return (
    <div text-red={true} text-center={true} text-5xl={true} animate-bounce={true}>
      unocss
    </div>
  )
}
```

:::

## 安装

::: code-group

```bash
pnpm add -D @unocss/transformer-attributify-jsx
```

```bash
yarn add -D @unocss/transformer-attributify-jsx
```

```bash
npm install -D @unocss/transformer-attributify-jsx
```

:::

```ts{11} [uno.config.ts]
import { defineConfig, presetAttributify } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  // ...
  presets: [
    // ...
    presetAttributify(),
  ],
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，也可以从中导入：

```ts
import { transformerAttributifyJsx } from 'unocss'
```

:::

## 注意事项

::: warning
其规则几乎与 [Attributify 预设](/presets/attributify) 相同，但有一些注意事项。
:::

```html
<div translate-x-100% />
<!-- 无法以 `%` 结尾 -->

<div translate-x-[100px] />
<!-- 不能包含 `[` 或 `]` -->
```

你可以改为使用带值属性：

```html
<div translate="x-100%" />

<div translate="x-[100px]" />
```
