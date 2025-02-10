---
title: Attributify 预设
description: 为其他预设启用 attributify 模式的 UnoCSS 预设。
outline: deep
---

# Attributify 预设

这将为其他预设启用 [attributify 模式](#attributify-模式)。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-attributify
```

```bash [yarn]
yarn add -D @unocss/preset-attributify
```

```bash [npm]
npm install -D @unocss/preset-attributify
```

:::

```ts [uno.config.ts]
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetAttributify({ /* 预设选项 */ }),
    // ...
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，你也可以直接从中导入：

```ts
import { presetAttributify } from 'unocss'
```

:::

## Attributify 模式

想象一下，你的按钮使用了 Tailwind CSS 的工具类。当工具类数量增多时，代码变得难以阅读和维护。

使用 attributify 模式，你可以将工具类拆分到各个属性中：

```html
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>
```

例如，`text-sm text-white` 可以合并为 `text="sm white"`，无需重复相同的前缀。

## 自引用前缀

对于像 `flex`、`grid`、`border` 等，其工具类名称与前缀相同，提供了一个特殊的 `~` 值。

例如：

```html
<button class="border border-red">Button</button>
```

可以写成：

```html
<button border="~ red">Button</button>
```

## 无值 attributify

除了 Windi CSS 的 attributify 模式外，预设还支持无值属性。

例如，

```html
<div class="m-2 rounded text-teal-400" />
```

现在可以写成：

```html
<div m-2 rounded text-teal-400 />
```

::: info
注意：如果你在使用 JSX，`<div foo>` 可能会被转换成 `<div foo={true}>` ，这会导致 UnoCSS 生成的 CSS 无法匹配该属性。为了解决这个问题，你可以尝试使用 [`transformer-attributify-jsx`](/transformers/attributify-jsx) 与此预设一起使用。
:::

## 属性名称冲突

如果 attributify 模式中的属性名称与元素或组件的属性名冲突，你可以为 UnoCSS 的 attributify 模式添加 `un-` 前缀。

例如：

```html
<a text="red">这与链接的 `text` 属性冲突</a>
<!-- 修改为 -->
<a un-text="red">文字颜色设为红色</a>
```

默认情况下前缀是可选的，如果你想强制使用前缀，可以设置

```ts
presetAttributify({
  prefix: 'un-',
  prefixedOnly: true, // <--
})
```

你也可以通过以下方式忽略某些属性的扫描：

```ts
presetAttributify({
  ignoreAttributes: [
    'text'
    // ...
  ]
})
```

## TypeScript 支持 (JSX/TSX)

创建 `shims.d.ts` 文件，并添加以下内容：

> 默认情况下，类型包含了 `@unocss/preset-uno` 中的常见属性。如果你需要自定义属性，请参考 [类型源码](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/jsx.ts) 来实现你自己的类型。

### Vue

由于 Volar 0.36 之后，对未知属性变得严格 [参考此问题](https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472)。要选择退出，可以在项目中添加如下文件：

```ts [html.d.ts]
declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    [key: string]: any
  }
}
declare module '@vue/runtime-core' {
  interface AllowedComponentProps {
    [key: string]: any
  }
}
export {}
```

### React

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
```

### Vue 3

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
```

### SolidJS

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
```

### Svelte & SvelteKit

```ts
declare namespace svelteHTML {
  import type { AttributifyAttributes } from '@unocss/preset-attributify'

  type HTMLAttributes = AttributifyAttributes
}
```

### Astro

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes { }
  }
}
```

### Preact

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
```

### 带前缀的 Attributify

```ts
import type { AttributifyNames } from '@unocss/preset-attributify'

type Prefix = 'uno:' // 将其更改为你的前缀

interface HTMLAttributes extends Partial<Record<AttributifyNames<Prefix>, string>> {}
```

## 选项

### strict

- **类型:** `boolean`
- **默认值:** `false`

仅为 attributify 或 class 生成 CSS。

### prefix

- **类型:** `string`
- **默认值:** `'un-'`

attributify 模式的前缀。

### prefixedOnly

- **类型:** `boolean`
- **默认值:** `false`

仅匹配带前缀的属性。

### nonValuedAttribute

- **类型:** `boolean`
- **默认值:** `true`

支持无值属性匹配。

### ignoreAttributes

- **类型:** `string[]`

忽略提取的属性列表。

### trueToNonValued

- **类型:** `boolean`
- **默认值:** `false`

当 DOM 中实际值为 `true` 时，无值属性也将匹配。启用此选项会破坏以 `true` 结尾的规则。
