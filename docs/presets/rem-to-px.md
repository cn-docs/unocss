---
title: rem 转 px 预设
description: 将工具类中的 rem 单位转换为 px 的预设 (@unocss/preset-rem-to-px)。
outline: deep
---

# rem 转 px 预设

将所有工具类中的 rem 单位转换为 px。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)

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

```ts [uno.config.ts]
import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetRemToPx(),
    // ...其他预设
  ],
})
```

## 用法

```html
<div class="m-2"></div>
```

::: code-group

```css [Without]
.m-2 {
  margin: 0.5rem;
}
```

```css [With]
.m-2 {
  margin: 8px;
}
```

:::

## 选项

### baseFontSize

- **类型:** `number`
- **默认值:** `16`

用于将 rem 转换为 px 的基础字体大小（即 1rem = n px）。
