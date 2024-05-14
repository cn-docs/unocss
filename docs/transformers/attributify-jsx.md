---
title: 属性化 JSX 转换器
description: 支持 JSX/TSX 中的无值属性化 (@unocss/transformer-attributify-jsx)。
---

# 属性化 JSX 转换器

在 JSX/TSX 中支持 [无值属性化](/presets/attributify#valueless-attributify)：`@unocss/transformer-attributify-jsx`。

## 演示

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

::: details 没有此转换器，JSX 将无值属性视为布尔属性。
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
  ```bash [pnpm]
  pnpm add -D @unocss/transformer-attributify-jsx
  ```
  ```bash [yarn]
  yarn add -D @unocss/transformer-attributify-jsx
  ```
  ```bash [npm]
  npm install -D @unocss/transformer-attributify-jsx
  ```
:::

```ts{12}
// uno.config.ts
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

## 注意事项

::: warning
规则几乎与 [属性化预设](/presets/attributify) 相同，但有一些注意事项。
:::

```html
<div translate-x-100% /> <!-- 不能以 `%` 结尾 -->

<div translate-x-[100px] /> <!-- 不能包含 `[` 或 `]` -->
```

相反，您可能想要使用带有值的属性：

```html
<div translate="x-100%" />

<div translate="x-[100px]" />
```

## 屏蔽列表

此转换器仅会转换有效的 UnoCSS 实用程序属性。
您还可以通过 `blocklist` 屏蔽一些属性不被转换。

```js
transformerAttributifyJsx({
  blocklist: [/text-[a-zA-Z]*/, 'text-5xl']
})
```

```jsx
<div text-red text-center text-5xl animate-bounce>
  unocss
</div>
```

将被编译为：

```html
<div text-red text-center text-5xl animate-bounce="">
  unocss
</div>
```
