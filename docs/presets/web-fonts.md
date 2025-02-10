---
title: 网络字体预设
description: UnoCSS 的网络字体支持预设 (@unocss/preset-web-fonts)。
outline: deep
---

# 网络字体预设

通过只提供字体名称，即可从 [Google Fonts](https://fonts.google.com/)、[FontShare](https://www.fontshare.com/) 等源获取网络字体。

参见 [所有支持的提供者](#providers)。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-web-fonts)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-web-fonts
```

```bash [yarn]
yarn add -D @unocss/preset-web-fonts
```

```bash [npm]
npm install -D @unocss/preset-web-fonts
```

:::

```ts [uno.config.ts]
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({ /* 选项 */ }),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，也可以直接从中导入：

```ts
import { presetWebFonts } from 'unocss'
```

:::

## 提供者

目前支持的提供者：

- `none` - 不进行处理，视字体为系统字体
- `google` - [Google Fonts](https://fonts.google.com/)
- `bunny` - [隐私友好的 Google Fonts](https://fonts.bunny.net/)
- `fontshare` - [FontShare](https://www.fontshare.com/) —— ITF 提供的高质量字体服务

::: info
欢迎提交 PR 以添加更多提供者。🙌
:::

### 自定义获取函数

你可以使用自己的函数获取字体资源。

```ts [uno.config.ts]
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import axios from 'axios'
import ProxyAgent from 'proxy-agent'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      // 使用带 https 代理的 axios
      customFetch: (url: string) => axios.get(url, { httpsAgent: new ProxyAgent('https://localhost:7890') }).then(it => it.data),
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
})
```

## 选项

### provider

- **类型:** `WebFontsProviders`
- **默认值:** `google`

字体提供服务。

```ts
type WebFontsProviders = 'google' | 'bunny' | 'fontshare' | 'none'
```

### fonts

- **类型:** `Record<string, WebFontMeta | string | (WebFontMeta | string)[]>`

字体配置详情请参见下方示例。

```ts
interface WebFontMeta {
  name: string
  weights?: (string | number)[]
  italic?: boolean
  /**
   * 覆盖默认提供者
   * @default <与根配置匹配>
   */
  provider?: WebFontsProviders
}
```

### extendTheme

- **类型:** `boolean`
- **默认值:** `true`

扩展主题对象。

### themeKey

- **类型:** `string`
- **默认值:** `fontFamily`

在主题对象中对应的键名。

### inlineImports

- **类型:** `boolean`
- **默认值:** `true`

内联 CSS `@import()`。

### customFetch

- **类型:** `(url: string) => Promise<string>`
- **默认值:** `undefined`

使用你自己的函数获取字体资源，详见 [自定义获取函数](#custom-fetch-function)。

## 示例

```ts
presetWebFonts({
  provider: 'google', // 默认提供者
  fonts: {
    // 这些配置将扩展默认主题
    sans: 'Roboto',
    mono: ['Fira Code', 'Fira Mono:400,700'],
    // 自定义字体
    lobster: 'Lobster',
    lato: [
      {
        name: 'Lato',
        weights: ['400', '700'],
        italic: true,
      },
      {
        name: 'sans-serif',
        provider: 'none',
      },
    ],
  },
})
```

将自动生成以下 CSS：

<!-- eslint-skip -->

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Fira+Code&family=Fira+Mono:wght@400;700&family=Lobster&family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* layer: default */
.font-lato {
  font-family: "Lato", sans-serif;
}
.font-lobster {
  font-family: "Lobster";
}
.font-mono {
  font-family: "Fira Code", "Fira Mono", ui-monospace, SFMono-Regular, Menlo,
    Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.font-sans {
  font-family: "Roboto", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}
```

## 本地服务字体

默认情况下，预设会从提供者的 CDN 获取字体。如果你希望自建字体服务，可以下载字体并使用 `@unocss/preset-web-fonts/local` 中的处理器将其托管到你自己的服务器。

```ts
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Roboto',
        mono: 'Fira Code',
      },
      // 该配置将下载字体并在本地提供服务
      processors: createLocalFontProcessor({
        // 用于缓存字体的目录
        cacheDir: 'node_modules/.cache/unocss/fonts',

        // 保存字体文件的目录
        fontAssetsDir: 'public/assets/fonts',

        // 客户端访问字体的基础 URL
        fontServeBaseUrl: '/assets/fonts'
      })
    }),
  ],
})
```

这将把字体资源下载到 `public/assets/fonts` 中，并使客户端通过 `/assets/fonts` 访问。在使用时，请确保字体许可证允许重新分发，工具不对此承担法律责任。

::: info
此功能仅适用于 Node.js 环境，在浏览器中将无法使用。
:::
