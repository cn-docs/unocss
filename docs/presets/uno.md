---
title: Uno预设
description: UnoCSS的默认预设（@unocss/preset-uno）。
outline: deep
---

# Uno预设

UnoCSS的默认预设。目前等同于 [`@unocss/preset-wind`](/presets/wind)。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-uno)

::: info
该预设继承自 [`@unocss/preset-wind`](/presets/wind) 和 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-uno
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-uno
  ```
  ```bash [npm]
  npm install -D @unocss/preset-uno
  ```
:::

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
  ],
})
```

::: tip
该预设已包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetUno } from 'unocss'
```
:::

## 使用

该预设试图提供一种常见的实用程序优先框架的超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。

例如，`ml-3`（Tailwind CSS）、`ms-2`（Bootstrap）、`ma4`（Tachyons）和 `mt-10px`（Windi CSS）都是有效的。

```css
.ma4 { margin: 1rem; }
.ml-3 { margin-left: 0.75rem; }
.ms-2 { margin-inline-start: 0.5rem; }
.mt-10px { margin-top: 10px; }
```

## 规则

此预设与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 兼容，您可以参考它们的[文档](https://tailwindcss.com/docs)以获取详细使用说明。

有关包含在此预设中的所有规则和预设的详细信息，请参阅我们的[交互式文档](https://unocss.dev/interactive/)或直接查看[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-uno)。

## 选项

::: info
此预设的选项继承自 [`@unocss/preset-mini`](/presets/mini#选项)。
:::

有关默认预设的更多详细信息，请查看我们的[演示场](https://uno.antfu.me/play/)并尝试一下。同时，您还可以查看[实现](https://github.com/unocss/unocss/tree/main/packages)。
