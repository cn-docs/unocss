---
title: 指令转换器
description: UnoCSS 的指令转换器，用于处理 `@apply`、`@screen` 和 `theme()` 指令（@unocss/transformer-directives）
outline: deep
---

# 指令转换器

UnoCSS 的指令转换器，用于处理 `@apply`、`@screen` 和 `theme()` 指令：`@unocss/transformer-directives`。

## 安装

::: code-group

```bash
pnpm add -D @unocss/transformer-directives
```

```bash
yarn add -D @unocss/transformer-directives
```

```bash
npm install -D @unocss/transformer-directives
```

:::

```ts
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerDirectives(),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，您也可以从中导入：

```ts
import { transformerDirectives } from 'unocss'
```

:::

## 使用方法

### `@apply`

```css
.custom-div {
  @apply text-center my-0 font-medium;
}
```

会被转换为：

```css
.custom-div {
  margin-top: 0rem;
  margin-bottom: 0rem;
  text-align: center;
  font-weight: 500;
}
```

#### `--at-apply`

为了与原生 CSS 兼容，您可以使用 CSS 自定义属性来替代 `@apply` 指令：

```css
.custom-div {
  --at-apply: text-center my-0 font-medium;
}
```

此功能默认启用，并预设了一些别名，您可以通过如下方式进行配置或禁用：

```js
transformerDirectives({
  // 默认值
  applyVariable: ['--at-apply', '--uno-apply', '--uno'],
  // 或禁用此功能：
  // applyVariable: false
})
```

#### 添加引号

如果规则中包含 `:`，则需要用引号将整个值括起来：

```css
.custom-div {
  --at-apply: 'hover:text-red hover:font-bold';
  /* 或者 */
  @apply 'hover:text-red hover:font-bold';
}
```

在 `@apply` 后使用引号是可选的，主要是为了满足某些格式化工具的要求。

### `@screen`

`@screen` 指令允许您创建基于断点名称的媒体查询，这些断点配置位于 [`theme.breakpoints`](/config/theme) 中。

```css
.grid {
  --uno: grid grid-cols-2;
}
@screen xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen sm {
  .grid {
    --uno: grid-cols-3;
  }
}
/* ... */
...;
```

会被转换为：

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

`@screen` 同时支持 `lt`（小于）及 `at`（介于）变体：

#### `@screen lt-`

```css
.grid {
  --uno: grid grid-cols-2;
}
@screen lt-xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen lt-sm {
  .grid {
    --uno: grid-cols-3;
  }
}
/* ... */
```

会被转换为：

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

#### `@screen at-`

```css
.grid {
  --uno: grid grid-cols-2;
}
@screen at-xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen at-xl {
  .grid {
    --uno: grid-cols-3;
  }
}
@screen at-xxl {
  .grid {
    --uno: grid-cols-4;
  }
}
/* ... */
```

会被转换为：

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

使用 `theme()` 函数，您可以通过点分隔法来访问主题配置中的值。

```css
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

将会被编译为：

```css
.btn-blue {
  background-color: #3b82f6;
}
```

### `icon()`

使用 `icon()` 函数可以将图标工具转换为对应的 SVG 图标。

::: warning
`icon()` 依赖于 `@unocss/preset-icons` 并会使用其配置，请确保您已正确添加该预设。
:::

```css
.icon {
  background-image: icon('i-carbon-sun');
}
```

将会被编译为：

```css
.icon {
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6M5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z'/%3E%3C/svg%3E");
}
```

由于默认情况下图标使用 `currentColor` 作为填充色，如果您想自定义图标的颜色，可以使用如下写法：

```css
.icon {
  background-image: icon('i-carbon-moon', '#fff');
  background-image: icon('i-carbon-moon', 'theme("colors.red.500")'); /* 使用主题颜色 */
}
```

将会被编译为：

```css
.icon {
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23fff' d='M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.1 11.1 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1 1 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.07 13.07 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3'/%3E%3C/svg%3E");
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23ef4444' d='M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.1 11.1 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1 1 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.07 13.07 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3'/%3E%3C/svg%3E");
}
```

## 许可证

- MIT 许可证 &copy; 2022 至今 [hannoeru](https://github.com/hannoeru)
