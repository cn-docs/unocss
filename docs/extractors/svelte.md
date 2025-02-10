---
title: Svelte 提取器
---

# Svelte 提取器

支持从 `class:` 指令中提取类。

```svelte
<div class:text-orange-400={foo} />
```

将被提取为 `text-orange-400` 并生成：

```css
.text-orange-400 {
  color: #f6993f;
}
```

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/extractor-svelte
```

```bash [yarn]
yarn add -D @unocss/extractor-svelte
```

```bash [npm]
npm install -D @unocss/extractor-svelte
```

:::

```ts [uno.config.ts]
import extractorSvelte from '@unocss/extractor-svelte'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorSvelte(),
  ],
})
```
