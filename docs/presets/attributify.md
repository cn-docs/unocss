---
title: Attributify 预设
description: 为其他预设启用 Attributify 模式的 UnoCSS 预设。
outline: deep
---

# Attributify 预设

这个预设为其他预设启用了 [Attributify 模式](#attributify-mode)。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-attributify)

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
    presetAttributify({ /* preset options */ }),
    // ...
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetAttributify } from 'unocss'
```
:::

## Attributify 模式

假设您有这样一个使用 Tailwind CSS 实用程序的按钮。当列表变得更长时，阅读和维护变得非常困难。

```html
<button class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600">
  Button
</button>
```

使用 attributify 模式，您可以将实用程序分开成属性：

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

例如，`text-sm text-white` 可以分组为 `text="sm white"`，而不会重复相同的前缀。

## 前缀自引用

对于具有与前缀相同的实用程序的实用程序，如 `flex`、`grid`、`border`，提供了一个特殊的 `~` 值。

例如：

```html
<button class="border border-red">
  Button
</button>
```

可以写成：

```html
<button border="~ red">
  Button
</button>
```

## Valueless attributify

除了 Windi CSS 的 attributify 模式，此预设还支持无值的属性。

例如，

```html
<div class="m-2 rounded text-teal-400" />
```

现在可以是

```html
<div m-2 rounded text-teal-400 />
```

::: info
注意：如果您使用的是 JSX，`<div foo>` 可能会被转换为 `<div foo={true}>`，这将使 UnoCSS 生成的 CSS 无法匹配属性。为了解决这个问题，您可能需要尝试 [`transformer-attributify-jsx`](/transformers/attributify-jsx) 与此预设一起使用。
:::

## 属性冲突

如果属性模式的名称与元素或组件的属性发生冲突，您可以添加 `un-` 前缀以指定为 UnoCSS 的 attributify 模式。

例如：

```html
<a text="red">This conflicts with links' `text` prop</a>
<!-- to -->
<a un-text="red">Text color to red</a>
```

默认情况下，前缀是可选的，如果要强制使用前缀，请设置

```ts
presetAttributify({
  prefix: 'un-',
  prefixedOnly: true, // <--
})
```

您还可以通过以下方式禁用对某些属性的扫描：

```ts
presetAttributify({
  ignoreAttributes: [
    'text'
    // ...
  ]
})
```

## TypeScript 支持（JSX/TSX）

创建 `shims.d.ts` 文件，内容如下：

> 默认情况下，类型包括来自 `@unocss/preset-uno` 的常见属性。如果需要自定义属性，请参考 [类型源](https://github.com/unocss/unocss/blob/main/packages/preset-attributify/src/jsx.ts) 实现自己的类型。

### Vue

自 Volar 0.36 起，[它现在严格限制未知属性](https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472)。要退出，您可以将以下文件添加到您的项目中：

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

###

带前缀的 Attributify

```ts
import type { AttributifyNames } from '@unocss/preset-attributify'

type Prefix = 'uno:' // change it to your prefix

interface HTMLAttributes extends Partial<Record<AttributifyNames<Prefix>, string>> {}
```

## 选项

### strict

- **类型：** `boolean`
- **默认值：** `false`

仅为属性模式或类生成 CSS。

### prefix

- **类型：** `string`
- **默认值：** `'un-'`

属性模式的前缀。

### prefixedOnly

- **类型：** `boolean`
- **默认值：** `false`

仅匹配带前缀的属性。

### nonValuedAttribute

- **类型：** `boolean`
- **默认值：** `true`

支持匹配无值的属性。

### ignoreAttributes

- **类型：** `string[]`

要从提取中忽略的属性列表。

### trueToNonValued

- **类型：** `boolean`
- **默认值：** `false`

如果 DOM 中实际值为 `true`，则无值属性也会匹配。此选项存在是为了支持将无值属性编码为 `true` 的框架。启用此选项将破坏以 `true` 结尾的规则。

## 鸣谢

初始想法来自 [@Tahul](https://github.com/Tahul) 和 [@antfu](https://github.com/antfu)。先前在 Windi CSS 中的[实现](https://windicss.org/posts/v30.html#attributify-mode)由 [@voorjaar](https://github.com/voorjaar)。
