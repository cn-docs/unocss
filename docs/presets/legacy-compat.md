---
title: Legacy 兼容预设
description: 传统兼容性工具集合。
outline: deep
---

# Legacy 兼容预设

传统兼容性工具集合。

该预设不包含任何规则，而是对其他预设生成的 CSS 进行后处理。

默认情况下，这些选项均未启用，需要你显式选择启用其中的功能。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-legacy-compat)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-legacy-compat
```

```bash [yarn]
yarn add -D @unocss/preset-legacy-compat
```

```bash [npm]
npm install -D @unocss/preset-legacy-compat
```

:::

```ts [uno.config.ts]
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    // ...其他预设
    presetLegacyCompat({
      // 选项
      commaStyleColorFunction: true,
      legacyColorSpace: true
    }),
  ],
})
```

## 选项

### `commaStyleColorFunction`

- **类型:** `boolean`
- **默认值:** `false`

将颜色函数（如 `rgb()` 和 `hsl()`）从空格分隔转换为逗号分隔，以便与传统浏览器更好兼容。此行为恢复了 UnoCSS v0.57.0 之前的做法（因 [#3221](https://github.com/unocss/unocss/pull/3221) 改为用空格分隔以与 Tailwind CSS 保持一致）。

例如：

- `rgb(255 0 0)` -> `rgb(255, 0, 0)`
- `rgb(255 0 0 / 50%)` -> `rgba(255, 0, 0, 50%)`
- `hsl(0 100% 50% / 50%)` -> `hsla(0, 100%, 50%, 50%)`

### `legacyColorSpace`

- **类型:** `boolean`
- **默认值:** `false`

移除生成样式中的颜色空间关键字（例如 `in oklch` 和 `in oklab`），以确保与不支持这些现代颜色空间的传统浏览器兼容。

要启用此功能，请将 `legacyColorSpace` 选项设置为 `true`。
