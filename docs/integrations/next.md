---
title: Next.js
description: 如何开始使用 UnoCSS 和 Next.js。
---

# Next.js

// TODO: 链接到示例

开始使用 UnoCSS 和 Next.js。

## 设置

### 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D unocss @unocss/webpack
  ```
  ```bash [yarn]
  yarn add -D unocss @unocss/webpack
  ```
  ```bash [npm]
  npm install -D unocss @unocss/webpack
  ```
:::

### 配置

在项目的根目录创建 `uno.config.ts`。

```ts [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    // ...
  ],
})
 ```

### 添加插件

然后通过你的 `next.config.js` 将 UnoCSS 作为插件添加到 webpack 中。

```js{9}
// next.config.js
const UnoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      UnoCSS(),
    )
    return config
  },
}

module.exports = nextConfig
```

### 导入样式表

然后在 `_app.tsx` 中导入 `uno.css`。

```tsx
import type { AppProps } from 'next/app'
// _app.tsx
import '@unocss/reset/tailwind.css'

import 'uno.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

## 使用

使用 unocss 为你的组件设置样式！

```tsx
/* index.tsx */
const Home: NextPage = () => {
  return (
    <>
      <main className="py-20 px-12 text-center flex flex-col items-center gap-20px">
        <span text="blue 5xl hover:red" cursor="default">Nextjs</span>
        <div className="i-carbon-car inline-block" text="4xl" />
        <button className="btn w-10rem">Button</button>
      </main>
    </>
  )
}
```

## 热模块重载

为了支持 HMR，你需要选择退出 webpack 的缓存。

```js{5}
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
+   config.cache = false
    config.plugins.push(UnoCSS())
    return config
  }
}
```

## 故障排除

### 关于虚拟模块的错误

```bash
Error: ENOENT: no such file or directory, open '.../_virtual_/__uno.css'
```

尝试删除 `.next` 目录并重启开发服务器。

### 其他

你可能需要将 `tsconfig.json` 中的目标至少提升到 `es2015` 才能构建你的项目。

默认不支持 `.js` 扩展名的文件。将文件扩展名改为 `.jsx` 或尝试在配置中包含 js 文件 `include: /\.js$/`。[了解更多](/guide/extracting#从构建工具管道中提取)。
