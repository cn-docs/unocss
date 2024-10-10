---
title: 任意变体提取器
---

# 任意变体提取器

一个更复杂的提取器，用于支持实用程序的任意变体。

```html
<div class="[&>*]:m-1 [&[open]]:p-2"></div>
```

将以 `[&>*]:m-1` 和 `[&[open]]:p-2` 作为变体进行捕获。

此提取器已包含在 [`@unocss/preset-mini`](/presets/mini) 中作为默认提取器。通常情况下，您不需要手动安装此软件包。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/extractor-arbitrary-variants
  ```
  ```bash [yarn]
  yarn add -D @unocss/extractor-arbitrary-variants
  ```
  ```bash [npm]
  npm install -D @unocss/extractor-arbitrary-variants
  ```
:::

```ts [uno.config.ts]
import extractorArbitrary from '@unocss/extractor-arbitrary-variants'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorArbitrary(),
  ],
})
```
