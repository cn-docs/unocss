---
title: Web字体预设
description: UnoCSS 的 Web 字体支持 (@unocss/preset-web-fonts)。
outline: deep
---

# Web字体预设

通过提供字体名称，从 [Google Fonts](https://fonts.google.com/)、[FontShare](https://www.fontshare.com/) 等提供商使用 Web 字体。

查看[所有支持的提供商](#providers)。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-web-fonts)

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
    presetWebFonts({ /* options */ }),
  ],
})
```

::: tip
该预设已包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetWebFonts } from 'unocss'
```
:::

## 提供商

目前支持的提供商：

- `none` - 什么也不做，将字体视为系统字体
- `google` - [Google Fonts](https://fonts.google.com/)
- `bunny` - [隐私友好的 Google Fonts](https://fonts.bunny.net/)
- `fontshare` - [ITF 的优质字体服务](https://www.fontshare.com/)

::: info
欢迎通过 PR 添加更多提供商。🙌
:::

### 自定义获取函数

使用您自己的函数来获取字体源。

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
      // 使用 axios 并设置 https 代理
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
- **类型：** `WebFontsProviders`
- **默认值：** `google`

Web 字体的提供商服务。

```ts
type WebFontsProviders = 'google' | 'bunny' | 'fontshare' | 'none'
```

### fonts
- **类型：** `Record<string, WebFontMeta | string | (WebFontMeta | string)[]>`

字体。更多详情请参见[示例](#example)。

```ts
interface WebFontMeta {
  name: string
  weights?: (string | number)[]
  italic?: boolean
  /**
   * 覆盖提供商
   * @default <与根配置匹配>
   */
  provider?: WebFontsProviders
}
```

### extendTheme
- **类型：** `boolean`
- **默认值：** `true`

扩展主题对象。

### themeKey
- **类型：** `string`
- **默认值：** `fontFamily`

主题对象的键。

### inlineImports
- **类型：** `boolean`
- **默认值：** `true`

内联 CSS `@import()`。

### customFetch
- **类型：** `(url: string) => Promise<string>`
- **默认值：** `undefined`

使用您自己的函数来获取字体源。查看[自定义获取函数](#custom-fetch-function)。

## 示例

```ts
presetWebFonts({
  provider: 'google', // 默认提供商
  fonts: {
    // 这些将扩展默认主题
    sans: 'Roboto',
    mono: ['Fira Code', 'Fira Mono:400,700'],
    // 自定义的
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

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Fira+Code&family=Fira+Mono:wght@400;700&family=Lobster&family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* 层级: 默认 */
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

## Serve Fonts Locally

By default the preset will fetch the fonts from the provider's CDN. If you want to serve the fonts locally, you can download the fonts and serve them from your own server using the processor from `@unocss/preset-web-fonts/local`.

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
      // This will download the fonts and serve them locally
      processors: createLocalFontProcessor({
        // Directory to cache the fonts
        cacheDir: 'node_modules/.cache/unocss/fonts',

        // Directory to save the fonts assets
        fontAssetsDir: 'public/assets/fonts',

        // Base URL to serve the fonts from the client
        fontServeBaseUrl: '/assets/fonts'
      })
    }),
  ],
})
```

This will download the fonts assets to `public/assets/fonts` and serve them from `/assets/fonts` on the client. When doing this, please make sure the license of the fonts allows you to redistribute so, the tool is not responsible for any legal issues.

::: info

This feature is Node.js specific and will not work in the browser.

:::
