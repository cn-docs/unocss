---
title: UnoCSS Astro 集成
description: UnoCSS 为 Astro 提供的集成插件（@unocss/astro）。
---

# Astro 集成

UnoCSS 为 [Astro](https://astro.build/) 提供的集成插件：`@unocss/astro`。请参考 [示例](https://github.com/unocss/unocss/tree/main/examples/astro)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

:::

```ts [astro.config.ts]
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  integrations: [
    UnoCSS(),
  ],
})
```

创建一个 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
// ...UnoCSS 选项
})
```

### 样式重置

默认情况下，不会自动注入[浏览器样式重置](/guide/style-reset)。如果需要，请安装 `@unocss/reset` 包：

::: code-group

```bash [pnpm]
pnpm add -D @unocss/reset
```

```bash [yarn]
yarn add -D @unocss/reset
```

```bash [npm]
npm install -D @unocss/reset
```

:::

然后更新你的 `astro.config.ts` 配置：

```ts [astro.config.ts]
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true // 或传入重置文件路径
    }),
  ],
})
```

### 无预设使用

该插件不自带任何默认预设。

::: code-group

```bash [pnpm]
pnpm add -D @unocss/astro
```

```bash [yarn]
yarn add -D @unocss/astro
```

```bash [npm]
npm install -D @unocss/astro
```

:::

```ts [astro.config.mjs]
import UnoCSS from '@unocss/astro'

export default {
  integrations: [
    UnoCSS(),
  ],
}
```

更多详情请参考 [Vite 插件](/integrations/vite)。

::: info
如果你正在构建一个基于 UnoCSS 的元框架，请参考 [此文件](https://github.com/unocss/unocss/blob/main/packages-presets/unocss/src/astro.ts) 了解如何绑定默认预设。
:::
