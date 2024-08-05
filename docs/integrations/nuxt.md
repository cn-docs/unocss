---
title: UnoCSS Nuxt 模块
description: Nuxt 模块用于 UnoCSS。
---

# Nuxt 模块

这是一个用于 UnoCSS 的 Nuxt 模块。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D unocss @unocss/nuxt
  ```
  ```bash [yarn]
  yarn add -D unocss @unocss/nuxt
  ```
  ```bash [npm]
  npm install -D unocss @unocss/nuxt
  ```
:::

在你的 Nuxt 配置文件中添加 `@unocss/nuxt`：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
})
```

创建一个 `uno.config.ts` 文件：

```ts
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

`uno.css` 入口将由模块自动注入。

## 支持状态

| | Nuxt 2 | Nuxt Bridge | Nuxt 3 |
| --- | :-- | :-- | :-- |
| Webpack 开发 | ✅ | ✅ | 🚧 |
| Webpack 构建 | ✅ | ✅ | ✅ |
| Vite 开发 | - | ✅ | ✅ |
| Vite 构建 | - | ✅ | ✅ |

## 配置

我们推荐使用专门的 `uno.config.ts` 文件进行配置。详情见 [配置文件](/guide/config-file)。

可以启用 `nuxtLayers` 选项，这样 Nuxt 会自动合并每个 Nuxt 层中的 `uno.config` 文件：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  unocss: {
    nuxtLayers: true,
  },
})
```

然后你可以在根配置文件中重新导出生成的配置：

```ts
// uno.config.ts
import config from './.nuxt/uno.config.mjs'

export default config
```

或者修改/扩展它：

```ts
import { mergeConfigs } from '@unocss/core'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([config, {
  // 你的覆盖配置
}])
```

## 许可证

- MIT 许可证 &copy; 2021-至今 [Anthony Fu](https://github.com/antfu)
