---
title: Mini 预设
description: UnoCSS 的最小预设 (@unocss/preset-mini)。
outline: deep
---

# Mini 预设

UnoCSS 的基本预设，仅包含最基本的工具类。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini)

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

```ts [uno.config.ts]
import presetMini from '@unocss/preset-mini'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    // ...其他预设
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，也可以直接从中导入：

```ts
import { presetMini } from 'unocss'
```

:::

## 规则

该预设是 [`@unocss/preset-wind`](/presets/wind) 的子集，只包含与 CSS 属性对应的最基本工具类，但排除了 Tailwind CSS 中一些意见性或复杂的工具类（例如 `container`、`animation`、`gradient` 等）。这可以作为你基于 Tailwind CSS 或 Windi CSS 常用工具类进行自定义预设的良好起点。

## 特性

### 暗模式

默认情况下，此预设生成基于类的暗模式，使用 `dark:` 变体。

例如：

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
.dark .dark\:bg-red\:10 {
  background-color: rgb(248 113 113 / 0.1);
}
```

如果希望启用基于媒体查询的暗模式，可以使用 `@dark:` 变体：

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

你也可以在全局配置中设置：

```ts
presetMini({
  dark: 'media'
})
```

### CSS @layer

支持 CSS 原生 @layer，通过 `layer-xx:` 变体使用：

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

你可以在配置中完全自定义 `theme` 属性，UnoCSS 将会对其与默认主题进行深度合并。

::: warning
注意：`breakpoints` 属性不会深度合并，而是直接覆盖，请参阅 [断点](/config/theme#断点)。
:::

例如：

```ts
presetMini({
  theme: {
    // ...
    colors: {
      veryCool: '#0000ff', // 类名：text-very-cool
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // 类名：bg-brand-primary
      }
    },
  }
})
```

## 选项

### dark

- **类型:** `class | media | DarkModeSelectors`
- **默认值:** `class`

暗模式选项。可以是 `class`、`media` 或自定义选择器对象 (`DarkModeSelectors`)。

```ts
interface DarkModeSelectors {
  /**
   * 亮模式的选择器。
   *
   * @default '.light'
   */
  light?: string

  /**
   * 暗模式的选择器。
   *
   * @default '.dark'
   */
  dark?: string
}
```

### attributifyPseudo

- **类型:** `boolean`
- **默认值:** `false`

生成伪选择器形式为 `[group=""]`，而不是 `.group`。

### variablePrefix

- **类型:** `string`
- **默认值:** `un-`

CSS 自定义属性的前缀。

### prefix

- **类型:** `string | string[]`
- **默认值:** `undefined`

工具类前缀。

### preflight

- **类型:** `boolean` | `on-demand`
- **默认值:** `true`

生成预设的预飞（Reset）CSS。可选值为：

- `true`: 始终生成预飞 CSS。
- `false`: 不生成预飞 CSS。
- `on-demand`: 仅为使用到的工具类生成预飞 CSS。
