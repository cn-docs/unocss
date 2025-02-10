---
title: UnoCSS PostCSS 插件
outline: deep
---

# PostCSS 插件

UnoCSS 的 PostCSS 插件，支持 `@apply`、`@screen` 与 `theme()` 指令。

[源代码](https://github.com/unocss/unocss/tree/main/packages-integrations/postcss)

::: warning
该包目前仍处于实验阶段，不遵循 semver，可能在补丁版本中引入破坏性更改。
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

在 PostCSS 配置中使用：

```ts [postcss.config.mjs]
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
  ],
}
```

同时配置 UnoCSS 文件：

```ts [uno.config.ts]
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

在 CSS 文件中使用占位符：

```css [style.css]
@unocss;
```

## 用法

### `@unocss`

`@unocss` 规则是一个占位符，会被生成的 CSS 替换。

你也可以分别注入各层：

```css [style.css]
@unocss preflights;
@unocss default;

/*
  补充层：推荐包含所有未被其它层覆盖的样式。
*/
@unocss;
```

如果你想无论之前是否注入都包含所有层，可以使用 `@unocss all`：

```css
@unocss all;
```

### `@apply`

```css
.custom-div {
  @apply text-center my-0 font-medium;
}
```

将转换为：

```css
.custom-div {
  margin-top: 0rem;
  margin-bottom: 0rem;
  text-align: center;
  font-weight: 500;
}
```

### `@screen`

`@screen` 指令允许引用 [`theme.breakpoints`](https://github.com/unocss/unocss/blob/main/README.md#extend-theme) 中的断点名称创建媒体查询：

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
```

转换后为：

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

`@screen` 同时支持 `lt` 与 `at` 变体。

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

转换为：

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
  @apply grid grid-cols-2;
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

转换后为：

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

使用 `theme()` 函数可通过点语法访问主题配置的值：

```css
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

将编译为：

```css
.btn-blue {
  background-color: #3b82f6;
}
```
