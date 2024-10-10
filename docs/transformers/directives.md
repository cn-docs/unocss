---
title: 指令转换器
description: UnoCSS 的指令转换器，用于 @apply、@screen 和 theme() 指令 (@unocss/transformer-directives)。
outline: deep
---

# 指令转换器

UnoCSS 的指令转换器，用于 `@apply`、`@screen` 和 `theme()` 指令：`@unocss/transformer-directives`。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/transformer-directives
  ```
  ```bash [yarn]
  yarn add -D @unocss/transformer-directives
  ```
  ```bash [npm]
  npm install -D @unocss/transformer-directives
  ```
:::

```ts [uno.config.ts]
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
这个预设包含在 `unocss` 包中，你也可以从包里导入它：

```ts
import { transformerDirectives } from 'unocss'
```
:::

## 用法

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

#### `--at-apply`

为了与纯 CSS 兼容，您可以使用 CSS 自定义属性来替换 `@apply` 指令：

```css
.custom-div {
  --at-apply: text-center my-0 font-medium;
}
```

此功能默认启用，并带有一些别名，您可以通过以下方式配置或禁用：

```js
transformerDirectives({
  // 默认值
  applyVariable: ['--at-apply', '--uno-apply', '--uno'],
  // 或者禁用：
  // applyVariable: false
})
```

#### 添加引号

要使用带有 `:` 的规则，您将需要引用整个值：

```css
.custom-div {
  --at-apply: "hover:text-red hover:font-bold";
  /* 或 */
  @apply 'hover:text-red hover:font-bold';
}
```

在 `@apply` 后使用引号是可选的，以满足某些格式化程序的行为。

### `@screen`

`@screen` 指令允许您创建媒体查询，其中引用您的断点名称来自 [`theme.breakpoints`](/config/theme)。

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

`@screen` 还支持 `lt`、`at` 变体：

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

使用 `theme()` 函数通过点表示法访问您的主题配置值。

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

### `icon()`

使用 `icon()` 函数将图标工具转换为特定的 SVG 图标。

::: warning
`icon()` 依赖于 `@unocss/preset-icons`，并将使用其配置，请确保已添加此预设。
:::

```css
.icon {
  background-image: icon('i-carbon-sun');
}
```

将被编译为：

```css
.icon {
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6M5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z'/%3E%3C/svg%3E");
}
```

由于图标默认使用 `currentColor` 作为填充颜色，如果你想自定义图标的颜色，可以使用 `icon('icon name', 'custom color')`。

```css
.icon {
  background-image: icon('i-carbon-moon', '#fff');
  background-image: icon('i-carbon-moon', 'theme("colors.red.500")'); /* 使用主题颜色 */
}
```

将被编译为：

```css
.icon {
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23fff' d='M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.1 11.1 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1 1 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.07 13.07 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3'/%3E%3C/svg%3E");
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23ef4444' d='M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.1 11.1 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1 1 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.07 13.07 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3'/%3E%3C/svg%3E");
}
```

## License

- MIT 许可证 &copy; 2022-PRESENT [hannoeru](https://github.com/hannoeru)
