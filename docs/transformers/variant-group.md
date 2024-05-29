---
title: 变体组转换器
description: 启用 UnoCSS 的 Windi CSS 变体组功能 (@unocss/transformer-variant-group)
---

# 变体组转换器

启用 UnoCSS 的 [Windi CSS 变体组功能](https://windicss.org/features/variant-groups.html)。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/transformer-variant-group
  ```
  ```bash [yarn]
  yarn add -D @unocss/transformer-variant-group
  ```
  ```bash [npm]
  npm install -D @unocss/transformer-variant-group
  ```
:::

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
```

::: tip
这个预设包含在 `unocss` 包中，你也可以从那里导入它：

```ts
import { transformerVariantGroup } from 'unocss'
```
:::

## 用法

```html
<div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
```

将被转换为：

```html
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
```

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
