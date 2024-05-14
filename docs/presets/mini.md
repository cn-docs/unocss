---
title: Mini 预设
description: UnoCSS 的基本预设 (@unocss/preset-mini)。
outline: deep
---

# Mini 预设

UnoCSS 的基本预设，仅包含最基本的实用工具。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-mini)

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-mini
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-mini
  ```
  ```bash [npm]
  npm install -D @unocss/preset-mini
  ```
:::

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetMini from '@unocss/preset-mini'

export default defineConfig({
  presets: [
    presetMini(),
    // ...other presets
  ],
})
```

::: tip
此预设已包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetMini } from 'unocss'
```
:::

## 规则

该预设是 [`@unocss/preset-wind`](/presets/wind) 的子集，仅包含与 CSS 属性对齐的最基本的实用工具，但不包括 Tailwind CSS 中引入的主观或复杂的实用工具（`container`、`animation`、`gradient` 等）。这可以作为您自己的定制预设的起点，基于 Tailwind CSS 或 Windi CSS 中熟悉的实用工具。

## 特性

### 深色模式

默认情况下，此预设生成基于类的深色模式，带有 `dark:` 变体。

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
.dark .dark\:bg-red\:10 {
  background-color: rgb(248 113 113 / 0.1);
}
```

要选择基于媒体查询的深色模式，您可以使用 `@dark:` 变体：

```html
<div class="@dark:bg-red:10" />
```

```css
@media (prefers-color-scheme: dark) {
  .\@dark\:bg-red\:10 {
    background-color: rgb(248 113 113 / 0.1);
  }
}
```

或使用 `dark:` 变体的配置全局设置

```ts
presetMini({
  dark: 'media'
})
```

### CSS @layer

支持 [CSS 的原生 @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) ，通过 `layer-xx:` 变体。

```html
<div class="layer-foo:p4" />
<div class="layer-bar:m4" />
```

将生成：

```css
@layer foo {
  .layer-foo\:p4 {
    padding: 1rem;
  }
}
@layer bar {
  .layer-bar\:m4 {
    margin: 1rem;
  }
}
```

### 主题

您可以在配置中完全自定义您的主题属性，UnoCSS 最终将其深度合并到默认主题中。

<!--eslint-skip-->

```ts
presetMini({
  theme: {
    // ...
    colors: {
      'veryCool': '#0000ff', // class="text-very-cool"
      'brand': {
        'primary': 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
      }
    },
  }
})
```

## 选项

### dark
- **类型：** `class | media | DarkModeSelectors`
- **默认值：** `class`

深色模式选项。可以是 `class`、`media`，或自定义选择器对象(`DarkModeSelectors`)。

```ts
interface DarkModeSelectors {
  /**
   * 亮色变体的选择器。
   *
   * @default '.light'
   */
  light?: string

  /**
   * 深色变体的选择器。
   *
   * @default '.dark'
   */
  dark?: string
}
```

### attributifyPseudo
- **类型：** `Boolean`
- **默认值：** `false`

将伪类选择器生成为 `[group=""]`，而不是 `.group`。

### variablePrefix
- **类型：** `string`
- **默认值：**

`un-`

CSS 自定义属性的前缀。

### prefix
- **类型：** `string | string[]`
- **默认值：** `undefined`

实用工具前缀。

### preflight
- **类型：** `boolean`
- **默认值：** `true`

生成预设风格。
