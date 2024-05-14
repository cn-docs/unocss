---
title: Rem to px 预设
description: 为所有实用工具将 rem 转换为 px (@unocss/preset-rem-to-px)。
outline: deep
---

# Rem to px 预设

将所有实用工具中的 rem 转换为 px。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-rem-to-px)

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-rem-to-px
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-rem-to-px
  ```
  ```bash [npm]
  npm install -D @unocss/preset-rem-to-px
  ```
:::

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetRemToPx(),
    // ...other presets
  ],
})
```

## 使用方法

```html
<div class="m-2"></div>
```

::: code-group
  ```css [无]
  .m-2 {
    margin: 0.5rem;
  }
  ```
  ```css [有]
  .m-2 {
    margin: 8px;
  }
  ```
:::

## 选项

### baseFontSize
- **类型：** `number`
- **默认值：** `16`

将 rem 转换为 px 的基准字体大小 (`1rem = n px`)。
