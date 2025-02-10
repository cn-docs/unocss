---
title: 图标预设
description: 用纯 CSS 实现图标的 UnoCSS 预设 (@unocss/preset-icons)。
outline: deep
---

<script setup>
const toggleDark = () => {
  document.querySelector('.VPSwitchAppearance')?.click()
}
</script>

# 图标预设

使用纯 CSS 实现任意图标的 UnoCSS 预设。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)

::: tip
推荐阅读：[纯 CSS 图标](https://antfu.me/posts/icons-in-pure-css)
:::

遵循以下约定使用图标：

- `<前缀><集合>-<图标>`
- `<前缀><集合>:<图标>`

例如：

```html
<!-- 来自 Phosphor 图标的基本锚点图标 -->
<div class="i-ph-anchor-simple-thin" />
<!-- 来自 Material Design Icons 的一个橙色闹钟 -->
<div class="i-mdi-alarm text-orange-400" />
<!-- 一个大尺寸的 Vue 标志 -->
<div class="i-logos-vue text-3xl" />
<!-- 太阳在亮模式，月亮在暗模式，来自 Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji 笑脸，悬停时变成流泪表情 -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-ph:anchor-simple-thin" />
  <div class="i-mdi:alarm text-orange-400 hover:text-teal-400" />
  <div class="w-2em h-2em i-logos:vue transform transition-800 hover:rotate-180" />
  <button class="i-carbon:sun dark:i-carbon:moon !w-2em !h-2em" @click="toggleDark()" title="切换暗模式"/>
  <div class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy" />
  <div class="text-base my-auto flex"><div class="i-carbon:arrow-left my-auto mr-1" /> 悬停试试</div>
</div>

请参阅 [所有可用图标](https://icones.js.org/)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-icons @iconify-json/[你需要的集合]
```

```bash [yarn]
yarn add -D @unocss/preset-icons @iconify-json/[你需要的集合]
```

```bash [npm]
npm install -D @unocss/preset-icons @iconify-json/[你需要的集合]
```

:::

我们使用 [Iconify](https://iconify.design) 作为图标数据源。你需要按 `@iconify-json/*` 模式将相应的图标集安装到 `devDependencies` 中。例如，使用 `@iconify-json/mdi` 对应 [Material Design Icons](https://materialdesignicons.com/)，使用 `@iconify-json/tabler` 对应 [Tabler](https://tabler-icons.io/)。可参阅 [Icônes](https://icones.js.org/) 或 [Iconify](https://icon-sets.iconify.design/) 获取所有可用集合。

```ts [uno.config.ts]
import presetIcons from '@unocss/preset-icons'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* 选项 */ }),
    // ...其他预设
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，也可以直接从中导入：

```ts
import { presetIcons } from 'unocss'
```

:::

::: info
你也可以单独使用此预设，作为现有 UI 框架的补充，拥有纯 CSS 图标！
:::

如果你希望一次性安装 Iconify 上所有图标集（约 130MB）：

::: code-group

```bash [pnpm]
pnpm add -D @iconify/json
```

```bash [yarn]
yarn add -D @iconify/json
```

```bash [npm]
npm install -D @iconify/json
```

:::

### 附加属性

你可以提供额外的 CSS 属性来控制图标的默认行为。例如，将图标设置为行内显示：

```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
    // ...
  },
})
```

## 模式重写

默认情况下，此预设会根据图标特性自动选择渲染模式。详细信息请参阅 [博客文章](https://antfu.me/posts/icons-in-pure-css)。在某些情况下，你可能希望为每个图标显式设置渲染模式。

- `?bg` 表示 `background-img` —— 将图标作为背景图像渲染。
- `?mask` 表示 `mask` —— 将图标作为蒙版图像渲染。

例如，对于带有颜色的图标 `vscode-icons:file-type-light-pnpm`（SVG 不包含 `currentColor`），默认会以背景图像渲染。使用 `vscode-icons:file-type-light-pnpm?mask` 可将其渲染为蒙版图像，从而去除颜色。

```html
<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>

## 配置集合和图标解析器

你可以通过 `@iconify-json/[你需要的集合]`、`@iconify/json` 或者自定义集合，通过 `UnoCSS` 配置中的 `collections` 选项来提供集合。

### 浏览器端

在加载 Iconify 图标集合时，请使用 `@iconify-json/[你需要的集合]` 而非 `@iconify/json`，后者体积庞大。

#### 打包工具

在使用打包工具时，你可以通过 `动态导入` 提供集合，这样它们会被打包成异步 chunk，并按需加载。

```ts
import presetIcons from '@unocss/preset-icons/browser'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
      }
    })
  ]
})
```

#### CDN

如果你希望从 CDN 加载集合，可以指定 `cdn` 选项，自 `v0.32.10` 起支持。我们推荐 [esm.sh](https://esm.sh/) 作为 CDN 提供者。

```ts
presetIcons({
  cdn: 'https://esm.sh/'
})
```

#### 自定义

你还可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L17) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L86) 来提供自定义集合，例如使用 `InlineCollection`：

```ts
presetIcons({
  collections: {
    custom: {
      circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
      /* ... */
    },
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
    /* ... */
  }
})
```

然后，你可以在 HTML 中这样使用：`<span class="i-custom:circle"></span>`。

### Node.js

在 Node.js 环境下，预设会自动搜索已安装的 Iconify 数据集，因此你无需手动注册图标集合。

你也可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L24) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L100) 来提供自定义集合。

#### FileSystemIconLoader

此外，你还可以使用 [FileSystemIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/node-loaders.ts#L9) 从文件系统加载自定义图标。你需要将 `@iconify/utils` 包作为 dev 依赖安装。

```ts [unocss.config.ts]
import fs from 'node:fs/promises'
// loader 辅助函数
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        // 以集合名称作为键
        'my-icons': {
          account: '<svg><!-- ... --></svg>',
          // 懒加载你的自定义图标
          settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
          /* ... */
        },
        'my-other-icons': async (iconName) => {
          // 你的自定义加载器。在这里可以执行任何操作。
          // 例如，从远程服务器获取：
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
        },
        // 一个帮助器，从文件系统加载图标
        // 将加载 `./assets/icons` 下的所有 `.svg` 文件，文件名作为图标名称
        // 你也可以提供可选的转换回调来更改每个图标
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/#fff/, 'currentColor')
        )
      }
    })
  ]
})
```

#### ExternalPackageIconLoader

从 `@iconify/utils v2.1.20` 开始，你可以使用其他包来加载第三方图标，利用新的 [createExternalPackageIconLoader](https://github.com/iconify/iconify/blob/main/packages/utils/src/loader/external-pkg.ts#L13) 辅助函数。

::: warning 警告
外部包必须包含 `icons.json` 文件，其中包含 `IconifyJSON` 格式的图标数据，此文件可通过 Iconify Tools 导出。详见 [导出图标集为 JSON 包](https://iconify.design/docs/libraries/tools/export/json-package.html)。
:::

例如，你可以使用 `an-awesome-collection` 或 `@my-awesome-collections/some-collection` 来加载自定义或第三方图标：

```ts [unocss.config.ts]
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: createExternalPackageIconLoader('an-awesome-collection')
    })
  ]
})
```

你还可以将其与其他自定义图标加载器结合使用，例如：

```ts [unocss.config.ts]
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('other-awesome-collection'),
        ...createExternalPackageIconLoader('@my-awesome-collections/some-collection'),
        ...createExternalPackageIconLoader('@my-awesome-collections/some-other-collection'),
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ]
})
```

## 图标自定义

你可以使用 `customizations` 配置选项自定义所有图标。

可用的自定义函数有：

- `transform`：对原始 `svg` 进行转换，仅在使用自定义图标集合（Iconify 集合除外）时应用。
- `customize`：更改默认图标自定义的数值。
- `iconCustomizer`：针对每个图标或集合进行更细粒度的自定义，其优先级高于 `customize`。

对于每个加载的图标，自定义应用顺序为：

1. 如果提供了 `transform` 并且使用自定义图标集合，则先对原始 `svg` 应用转换。
2. 应用 `customize` 针对默认自定义值进行修改。
3. 如果提供了 `iconCustomizer`，则其基于 `customize` 的结果继续修改。

### 全局自定义图标转换

在加载自定义图标时，你可以对它们进行转换，例如将 `fill` 属性设置为 `currentColor`：

```ts
presetIcons({
  customizations: {
    transform(svg) {
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

从版本 `0.30.8` 开始，`transform` 函数还会接收 `collection` 和 `icon` 参数：

```ts
presetIcons({
  customizations: {
    transform(svg, collection, icon) {
      // 对于自定义集合中的特定图标不进行填充转换
      if (collection === 'custom' && icon === 'my-icon')
        return svg
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

### 全局图标自定义

加载的任意图标，你可以为其统一设置属性，例如统一调整大小：

```ts
presetIcons({
  customizations: {
    customize(props) {
      props.width = '2em'
      props.height = '2em'
      return props
    }
  }
})
```

### 单个图标 / 集合自定义

你可以使用 `iconCustomizer` 针对每个集合或具体图标进行自定义，其优先级高于全局配置。

例如，可以为某一集合的所有图标，或者针对特定图标进行自定义：

```ts
presetIcons({
  customizations: {
    iconCustomizer(collection, icon, props) {
      // 针对集合 `my-other-icons` 中所有图标进行自定义
      if (collection === 'my-other-icons') {
        props.width = '4em'
        props.height = '4em'
      }
      // 针对集合 `my-icons` 中特定图标进行自定义
      if (collection === 'my-icons' && icon === 'account') {
        props.width = '6em'
        props.height = '6em'
      }
      // 针对 Iconify 的 mdi 集合中特定图标进行自定义
      if (collection === 'mdi' && icon === 'account') {
        props.width = '2em'
        props.height = '2em'
      }
    }
  }
})
```

## 指令

你可以在 CSS 中使用 `icon()` 指令来获取图标的元数据。

```css
.icon {
  background-image: icon('i-carbon-sun');
}
```

::: warning
`icon()` 指令依赖于 `@unocss/preset-icons` 预设，因此请确保已添加此预设。
:::

关于 `icon()` 指令更多内容，请参阅 [指令](/transformers/directives#icon)。

## 选项

### scale

- **类型:** `number`
- **默认值:** `1`

与当前字体大小相关的缩放比例（1em）。

### mode

- **类型:** `'mask' | 'bg' | 'auto'`
- **默认值:** `'auto'`
- 详见: https://antfu.me/posts/icons-in-pure-css

生成图标 CSS 的渲染模式。

::: tip

- `mask` - 使用背景色和 `mask` 属性实现单色图标
- `bg` - 使用背景图像渲染图标，颜色固定
- `auto` - 根据图标样式智能选择 `mask` 或 `bg` 模式

:::

### prefix

- **类型:** `string | string[]`
- **默认值:** `'i-'`

图标规则匹配所使用的类名前缀。

### extraProperties

- **类型:** `Record<string, string>`
- **默认值:** `{}`

应用于生成 CSS 的额外属性。

### warn

- **类型:** `boolean`
- **默认值:** `false`

当匹配到缺失图标时是否输出警告。

### iconifyCollectionsNames

- **类型:** `string[]`
- **默认值:** `undefined`

额外的 `@iconify-json` 集合名称。当存在未包含在默认图标预设集合中的新集合时，请使用此选项。

### collections

- **类型:** `Record<string, (() => Awaitable<IconifyJSON>) | undefined | CustomIconLoader | InlineCollection>`
- **默认值:** `undefined`

在 Node.js 环境下，预设会自动搜索已安装的 Iconify 数据集；在浏览器中，此选项用于以自定义加载机制提供图标数据集。

### layer

- **类型:** `string`
- **默认值:** `'icons'`

规则层次。

### customizations

- **类型:** `Omit<IconCustomizations, 'additionalProps' | 'trimCustomSvg'>`
- **默认值:** `undefined`

图标自定义相关配置。

### autoInstall

- **类型:** `boolean`
- **默认值:** `false`

当检测到图标使用时，自动安装图标源包。（仅适用于 Node.js 环境，浏览器下此选项无效）

### unit

- **类型:** `string`
- **默认值:** `'em'`

图标单位的自定义。

### cdn

- **类型:** `string`
- **默认值:** `undefined`

从 CDN 加载图标。应以 `https://` 开头并以 `/` 结尾。

推荐使用：

- `https://esm.sh/`
- `https://cdn.skypack.dev/`

### customFetch

- **类型:** `(url: string) => Promise<any>`
- **默认值:** `undefined`

使用自定义函数获取图标数据（默认使用 [`ofetch`](https://github.com/unjs/ofetch)）。

### processor

- **类型:** `(cssObject: CSSObject, meta: Required<IconMeta>) => void`
- **默认值:** `undefined`

在生成 CSS 字符串前，对 CSS 对象进行处理的处理器函数。详见示例：https://github.com/unocss/unocss/blob/7d83789b0dee8c72c401db24263ea429086de95d/test/preset-icons.test.ts#L66-L82

## 高级自定义图标集清理

在与自定义图标集一同使用此预设时，建议使用类似 [Iconify](https://iconify.design/) 的清理流程对图标集进行整理。所有所需工具均可在 [Iconify Tools](https://iconify.design/docs/libraries/tools/) 中找到。

例如，你可以参考此仓库，该仓库展示了在 `Vue 3` 项目中如何使用此预设：[@iconify/tools/@iconify-demo/unocss](https://github.com/iconify/tools/tree/main/%40iconify-demo/unocss)。

阅读 [清理图标](https://iconify.design/docs/articles/cleaning-up-icons/) 文章了解更多细节。

## 鸣谢

- 此预设的初始想法来自 [@husayt](https://github.com/husayt)。
- 基于 [@userquin](https://github.com/userquin) 提交的 [PR](https://github.com/antfu/unplugin-icons/pull/90) 工作。
