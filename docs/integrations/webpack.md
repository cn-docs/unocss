---
title: UnoCSS Webpack 插件
description: UnoCSS 的 webpack 插件 (@unocss/webpack)。
outline: deep
---

# Webpack 插件

UnoCSS 的 webpack 插件：`@unocss/webpack`。目前该插件仅支持 [`global` 模式](https://github.com/unocss/unocss/blob/main/packages-integrations/vite/src/types.ts#L11-L21)。

::: info
该插件没有任何默认预设。
:::

## 前置条件

`@unocss/webpack` 需要 `style-loader` 和 `css-loader` 来处理 CSS 文件。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/webpack
```

```bash [yarn]
yarn add -D @unocss/webpack
```

```bash [npm]
npm install -D @unocss/webpack
```

:::

从 UnoCSS 版本 `v0.59.0` 开始，UnoCSS 已经转换为仅 ESM 模式，因此你需要通过动态导入加载配置：

::: code-group

```ts [webpack 5]
// webpack.config.js
module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
    plugins: [
      UnoCSS()
    ],
    optimization: {
      realContentHash: true
    }
  }))
}
```

```js [webpack 4]
// webpack.config.js
module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
    plugins: [
      UnoCSS()
    ],
    css: {
      extract: {
        filename: '[name].[hash:9].css'
      },
    },
  }))
}
```

:::

如果你使用的是旧版本的 UnoCSS，可以使用以下代码：

::: code-group

```ts [webpack 5]
// webpack.config.js
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  plugins: [
    UnoCSS()
  ],
  optimization: {
    realContentHash: true
  }
}
```

```js [webpack 4]
// webpack.config.js
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  plugins: [
    UnoCSS()
  ],
  css: {
    extract: {
      filename: '[name].[hash:9].css'
    }
  }
}
```

:::

创建一个 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
// ...UnoCSS 选项
})
```

::: warning
如果你使用 webpack@4.x，`optimization.realContentHash` 配置不受支持，你应该使用 `css.extract.filename` 来自定义 CSS 文件名（如示例中采用前 9 位哈希而非 contenthash）。请注意这一[已知问题](https://github.com/unocss/unocss/issues/1728)以及 [webpack#9520](https://github.com/webpack/webpack/issues/9520#issuecomment-749534245)。
:::

## 用法

在你的主入口文件中导入 `uno.css`：

```ts [main.ts]
import 'uno.css'
```

## 框架支持

### Vue + Vue CLI

如果你使用 [Vue CLI](https://cli.vuejs.org/)（配合 webpack 4/5）以及 UnoCSS `v0.59.0`，则需要使用最新版 [Vue CLI Service](https://cli.vuejs.org/guide/cli-service.html) `v5.0.8` 来通过动态导入加载配置：

::: code-group

```ts [webpack 5]
// vue.config.js
const process = require('node:process')

module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
    configureWebpack: {
      devtool: 'inline-source-map',
      plugins: [
        UnoCSS()
      ],
      optimization: {
        realContentHash: true
      }
    },
    chainWebpack(config) {
      config.module.rule('vue').uses.delete('cache-loader')
      config.module.rule('tsx').uses.delete('cache-loader')
      config.merge({
        cache: false
      })
    },
    css: {
      extract: process.env.NODE_ENV === 'development'
        ? {
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
          }
        : true
    }
  }))
}
```

```ts [webpack 4]
// vue.config.js
const process = require('node:process')

module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
    configureWebpack: {
      plugins: [
        UnoCSS({})
      ]
    },
    chainWebpack(config) {
      config.module.rule('vue').uses.delete('cache-loader')
      config.module.rule('tsx').uses.delete('cache-loader')
      config.merge({
        cache: false
      })
    },
    css: {
      extract: process.env.NODE_ENV === 'development'
        ? {
            filename: '[name].css',
            chunkFilename: '[name].[hash:9].css'
          }
        : true
    }
  }))
}
```

:::

如果使用旧版本的 UnoCSS，则可使用下面的代码：

::: code-group

```ts [webpack 5]
// vue.config.js
const process = require('node:process')
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  configureWebpack: {
    devtool: 'inline-source-map',
    plugins: [
      UnoCSS()
    ],
    optimization: {
      realContentHash: true
    }
  },
  chainWebpack(config) {
    config.module.rule('vue').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
    config.merge({
      cache: false
    })
  },
  css: {
    extract: process.env.NODE_ENV === 'development'
      ? {
          filename: 'css/[name].css',
          chunkFilename: 'css/[name].css'
        }
      : true
  },
}
```

```ts [webpack 4]
// vue.config.js
const process = require('node:process')
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  configureWebpack: {
    plugins: [
      UnoCSS({}),
    ]
  },
  chainWebpack(config) {
    config.module.rule('vue').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
    config.merge({
      cache: false,
    })
  },
  css: {
    extract: process.env.NODE_ENV === 'development'
      ? {
          filename: '[name].css',
          chunkFilename: '[name].[hash:9].css',
        }
      : true,
  },
}
```

:::
