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

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...
  transformers: [
    transformerDirectives(),
  ],
})
```

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

## 许可证

- MIT 许可证 &copy; 2022-PRESENT [hannoeru](https://github.com/hannoeru)
