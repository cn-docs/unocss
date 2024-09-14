---
title: UnoCSS PostCSS 插件
outline: deep
---

# PostCSS 插件

UnoCSS 的 PostCSS 插件。支持 `@apply`、`@screen` 和 `theme()` 指令。

[源代码](https://github.com/unocss/unocss/tree/main/packages/postcss)

::: warning
这个包目前处于实验状态。它不遵循 semver，并且可能在补丁版本中引入重大更改。
:::

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D unocss @unocss/postcss
  ```
  ```bash [yarn]
  yarn add -D unocss @unocss/postcss
  ```
  ```bash [npm]
  npm install -D unocss @unocss/postcss
  ```
:::

```ts
// postcss.config.mjs
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
  ],
}
```

```ts
// uno.config.ts
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
    ],
  },
  presets: [
    presetUno(),
  ],
})
```

```css
/* style.css */
@unocss;
```

## 使用方法

### `@unocss`

`@unocss` 规则是一个占位符。它将被生成的 CSS 替换。

你也可以单独注入每一层：

```css
/* style.css */
@unocss preflights;
@unocss default;

/*
  备用层。建议总是包括。
  只有未使用的层将被注入这里。
*/
@unocss;
```

如果你希望包含所有层，无论它们之前是否已包含，你可以使用 `@unocss all`。这在你想在多个文件中包含生成的 CSS 时很有用。

```css
@unocss all;
```

### `@apply`

```css
.custom-div {
  @apply text-center my-0 font-medium;
}
```

将被转换为：

```css
.custom-div {
  margin-top: 0rem;
  margin-bottom: 0rem;
  text-align: center;
  font-weight: 500;
}
```

### `@screen`

`@screen` 指令允许你使用名称引用你的断点，来自 [`theme.breakpoints`](https://github.com/unocss/unocss/blob/main/README.md#extend-theme)。

```css
.grid {
  @apply grid grid-cols-2;
}
@screen xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen sm {
  .grid {
    @apply grid-cols-3;
  }
}
/* ... */
...
```

将被转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

#### 断点变体支持
`@screen` 还支持 `lt`、`at` 变体

##### `@screen lt`

```css
.grid {
  @apply grid grid-cols-2;
}
@screen lt-xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen lt-sm {
  .grid {
    @apply grid-cols-3;
  }
}
/* ... */
```

将被转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 319.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

##### `@screen at`

```css
.grid {
  @

apply grid grid-cols-2;
}
@screen at-xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen at-xl {
  .grid {
    @apply grid-cols-3;
  }
}
@screen at-xxl {
  .grid {
    @apply grid-cols-4;
  }
}
/* ... */
```

将被转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) and (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) and (max-width: 1535.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
/* ... */
```

### `theme()`

使用 `theme()` 函数通过点标记访问你的主题配置值。

```css
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

将被编译为：

```css
.btn-blue {
  background-color: #3b82f6;
}
```
