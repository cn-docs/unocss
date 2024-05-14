---
title: 图标预设
description: 使用 UnoCSS（@unocss/preset-icons）为任何图标提供纯 CSS 解决方案。
outline: deep
---

<script setup>
const toggleDark = () => {
  document.querySelector('.VPSwitchAppearance')?.click()
}
</script>

# 图标预设

使用 UnoCSS 为任何图标提供纯 CSS 解决方案。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-icons)

::: tip
推荐阅读：[纯 CSS 图标](https://antfu.me/posts/icons-in-pure-css)
:::

按照以下约定使用图标：

- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

例如：

```html
<!-- 来自 Phosphor 图标库的基本锚点图标 -->
<div class="i-ph-anchor-simple-thin" />
<!-- 来自 Material Design 图标库的橙色警报 -->
<div class="i-mdi-alarm text-orange-400" />
<!-- 大型 Vue 标志 -->
<div class="i-logos-vue text-3xl" />
<!-- 亮色模式下的太阳，暗色模式下的月亮，来自 Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji 的笑脸，悬停时变成泪水 -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-ph:anchor-simple-thin" />
  <div class="i-mdi:alarm text-orange-400 hover:text-teal-400" />
  <div class="w-2em h-2em i-logos:vue transform transition-800 hover:rotate-180" />
  <button class="i-carbon:sun dark:i-carbon:moon !w-2em !h-2em" @click="toggleDark()" title="切换深色模式"/>
  <div class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy" />
  <div class="text-base my-auto flex"><div class="i-carbon:arrow-left my-auto mr-1" /> 鼠标悬停</div>
</div>

查看[所有可用图标](https://icones.js.org/)。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-icons @iconify-json/[你想要的集合]
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-icons @iconify-json/[你想要的集合]
  ```
  ```bash [npm]
  npm install -D @unocss/preset-icons @iconify-json/[你想要的集合]
  ```
:::

我们使用 [Iconify](https://iconify.design) 作为图标数据源。您需要按照 `@iconify-json/*` 模式在 `devDependencies` 中安装相应的图标集。例如，Material Design Icons 的图标集为 `@iconify-json/mdi`，Tabler 的图标集为 `@iconify-json/tabler`。您可以参考 [Icônes](https://icones.js.org/) 或 [Iconify](https://icon-sets.iconify.design/) 查看所有可用集合。

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetIcons({ /* 选项 */ }),
    // ...其他预设
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetIcons } from 'unocss'
```
:::

::: info
您也可以单独使用此预设作为您现有 UI 框架的补充，以获得纯 CSS 图标！
:::

如果您希望一次性安装 Iconify 上所有可用的图标集（约 130MB）：

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

### 额外属性

您可以提供额外的 CSS 属性来控制图标的默认行为。以下是将图标默认设置为内联的示例：

```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
    // ...
  },
})
```

## 模式覆盖

默认情况下，此预设将根据图标的特性自动选择渲染模式。您可以在这篇[博文](https://antfu.me/posts/icons-in-pure-css)中了解更多。在某些情况下，您可能希望为每个图标明确设置渲染模式。

- `?bg` 代表 `background-img` - 将图标渲染为背景图像
- `?mask` 代表 `mask` - 将图标渲染为蒙版图像

例如，`vscode-icons:file-type-light-pnpm` 是一个带有颜色的图标（`svg` 不包含 `currentColor`），将以背景图像方式渲染。使用 `vscode-icons:file-type-light-pnpm?mask` 可以将其渲染为蒙版图像，并绕过其颜色。

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

您可以通过 `@iconify-json/[您想要的集合]`、`@iconify/json` 或使用您的自定义集合通过 `UnoCSS` 配置中的 `collections` 选项来提供集合。

### 浏览器

要加载 `iconify` 集合，您应该使用 `@iconify-json/[您想要的集合]`，而不是 `@iconify/json`，因为 `json` 文件非常庞大。

#### 打包工具

在使用打包工具时，您可以使用 `动态导入` 来提供集合，这样它们将作为异步块进行打包，并在需要时加载。

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

或者，如果您更喜欢从 CDN 获取它们，您可以指定 `cdn` 选项，从 `v0.32.10` 开始。我们推荐 [esm.sh](https://esm.sh/) 作为 CDN 提供商。

```ts
presetIcons({
  cdn: 'https://esm.sh/'
})
```

#### 自定义

您还可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L17) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L86) 提供自定义集合，例如使用 `InlineCollection`：

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

然后，您可以在您的 HTML 中使用它：`<span class="i-custom:circle"></span>`

### Node.js

在 `Node.js` 中，预设将自动搜索已安装的 `iconify` 数据集，因此您不需要注册 `iconify` 集合。

您还可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L24) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L100) 提供自定义集合。

#### FileSystemIconLoader

此外，您还可以使用 [FileSystemIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/node-loaders.ts#L9) 从文件系统加载自定义图标。您需要将 `@iconify/utils` 包安装为 `dev 依赖`。

```ts
// uno.config.ts
import fs from 'node:fs/promises'
import { defineConfig, presetIcons } from 'unocss'

// loader helpers
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        // key as the collection name
        'my-icons': {
          account: '<svg><!-- ... --></svg>',
          // load your custom icon lazily
          settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
          /* ... */
        },
        'my-other-icons': async (iconName) => {
          // your custom loader here. Do whatever you want.
          // for example, fetch from a remote server:
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
        },
        // a helper to load icons from the file system
        // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
        // you can also provide a transform callback to change each icon (optional)
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

从 `@iconify/utils v2.1.20` 开始，您可以使用其他包来加载其他作者的图标，使用新的 [createExternalPackageIconLoader](https://github.com/iconify/iconify/blob/main/packages/utils/src/loader/external-pkg.ts#L13) 辅助工具。

::: warning 警告
外部包必须包含带有 `IconifyJSON` 格式中的 `icons` 数据的 `icons.json` 文件，可以使用 Iconify Tools 导出。查看[将图标集导出为 JSON 包](https://iconify.design/docs/libraries/tools/export/json-package.html)获取更多详情。
:::

例如，您可以使用 `an-awesome-collection` 或 `@my-awesome-collections/some-collection` 来加载您的自定义或第三方图标：
```ts
// uno.config.ts
import { defineConfig, presetIcons } from 'unocss'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'

export default defineConfig({
  presets: [
    presetIcons({
      collections: createExternalPackageIconLoader('an-awesome-collection')
    })
  ]
})
```

您还可以将其与其他自定义图标加载程序结合使用，例如：
```ts
// uno.config.ts
import { defineConfig, presetIcons } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'

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

## 图标定制

您可以使用 `customizations` 配置选项自定义所有图标。

可用的自定义函数包括：

- `transform`：转换原始的 `svg`，仅在使用 `custom` 图标集（不包括 `iconify` 图标集）时应用。
- `customize`：更改默认图标定制值。
- `iconCustomizer`：更改默认图标定制值。

对于每个加载的图标，自定义将按照以下顺序应用：

- 如果提供了 `transform` 并且使用自定义图标集，则对原始的 `svg` 应用 `transform`。
- 如果提供了 `customize`，则应用默认定制。
- 如果提供了 `iconCustomizer`，则应用 `customize` 定制。

### 全局自定义图标转换

当加载您的自定义图标时，您可以对其进行转换，例如添加 `fill` 属性为 `currentColor`：

```ts
presetIcons({
  customizations: {
    transform(svg) {
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

从版本 `0.30.8` 开始，`transform` 提供了 `collection` 和 `icon` 名称：

```ts
presetIcons({
    customizations: {
        transform(svg, collection, icon) {
            // 不对此集合上的此图标应用填充
            if (collection === 'custom' && icon === 'my-icon')
                return svg
            return svg.replace(/#fff/, 'currentColor')
        }
    }
})
```

### 全局图标定制

在加载任何图标时，您可以为它们配置共同的属性，例如配置相同的大小：

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

### 图标/集合定制

您可以使用 `iconCustomizer` 配置选项来定制每个图标。

`iconCustomizer` 优先于配置。

`iconCustomizer` 将应用于任何集合，即对于从 `custom` 加载器中加载的每个图标，`custom collections` 上的 `inlined` 或从 `@iconify` 中加载的每个图标。

例如，您可以配置 `iconCustomizer` 来更改集合中的所有图标或集合中的单个图标：

```ts
presetIcons({
  customizations: {
    iconCustomizer(collection, icon, props) {
      // 自定义此集合中的所有图标
      if (collection === 'my-other-icons') {
        props.width = '4em'
        props.height = '4em'
      }
      // 自定义此集合中的此图标
      if (collection === 'my-icons' && icon === 'account') {
        props.width = '6em'
        props.height = '6em'
      }
      // 自定义此集合中的 @iconify 图标
      if (collection === 'mdi' && icon === 'account') {
        props.width = '2em'
        props.height = '2em'
      }
    }
  }
})
```

## 选项

### scale

- 类型：`number`
- 默认值：`1`

与当前字体大小（1em）相关的比例。

### mode

- 类型：`'mask' | 'background-img' | 'auto'`
- 默认值：`'auto'`
- 查看：https://antfu.me/posts/icons-in-pure-css

生成的 CSS 图标的模式。

:::tip
- `mask` - 使用背景颜色和 `mask` 属性进行单色图标的渲染
- `background-img` - 使用背景图像渲染图标，颜色是静态的
- `auto` - 根据图标的样式智能地在 `mask` 和 `background-img` 之间决定模式
  :::

### prefix

- 类型：`string | string[]`
- 默认值：`'i-'`

用于匹配图标规则的类前缀。

### extraProperties

- 类型：`Record<string, string>`
- 默认值：`{}`

应用于生成的 CSS 的额外 CSS 属性。

### warn

- 类型：`boolean`
- 默认值：`false`

匹配到缺少的图标时发出警告。

### collections

- 类型：`Record<string, (() => Awaitable<IconifyJSON>) | undefined | CustomIconLoader | InlineCollection>`
- 默认值：`undefined`

在 Node.js 环境中，预设将自动搜索已安装的 iconify 数据集。在浏览器中使用时，此选项用于提供具有自定义加载机制的数据集。

### layer

- 类型：`string`
- 默认值：`'icons'`

规则层。

### customizations

- 类型：`Omit<IconCustomizations, 'additionalProps' | 'trimCustomSvg'>`
- 默认值：`undefined`

自定义图标定制。

### autoInstall

- 类型：`boolean`
- 默认值：`false`

当检测到使用时，自动安装图标源包。

:::warning
仅在 `node` 环境中有效，在 `browser` 中此选项将被忽略。
:::

### unit

- 类型：`string`
- 默认值：`'em'`

自定义图标单位。

### cdn

- 类型：`string`
- 默认值：`undefined`

从 CDN 加载图标。应以 `https://` 开头，以 `/` 结尾。

推荐：

- `https://esm.sh/`
- `https://cdn.skypack.dev/`

### customFetch

- 类型：`(url: string) => Promise<any>`
- 默认值：`undefined`

预设使用 [`ofetch`](https://github.com/unjs/ofetch) 作为默认的 fetcher，您也可以自定义 fetch 函数以提供图标数据。

### processor

- 类型：`(cssObject: CSSObject, meta: Required<IconMeta>) => void`
- 默认值：`undefined`

```ts
interface IconMeta {
  collection: string
  icon: string
  svg: string
  mode?: IconsOptions['mode']
}
```

在字符串化之前对 CSS 对象进行处理的处理器。参见[示例](https://github.com/unocss/unocss/blob/7d83789b0dee8c72c401db24263ea429086de95d/test/preset-icons.test.ts#L66-L82)。

## 高级自定义图标集清理

使用此预设与您的自定义图标时，考虑使用类似于 [Iconify](https://iconify.design/) 对于任何图标集所做的清理过程。您可以在 [Iconify Tools](https://iconify.design/docs/libraries/tools/) 中找到所有所需的工具。

您可以检查此存储库，使用此预设在 `Vue 3` 项目上：[@iconify/tools/@iconify-demo/unocss](https://github.com/iconify/tools/tree/main/%40iconify-demo/unocss)。

阅读 [清理图标](https://iconify.design/docs/articles/cleaning-up-icons/) 文章以获取更多详情。

## 鸣谢

- 此预设灵感来自于由 [@husayt](https://github.com/husayt) 创建的 [此问题](https://github.com/antfu/unplugin-icons/issues/88)。
- 基于由 [@userquin](https://github.com/userquin) 创建的 [此 PR](https://github.com/antfu/unplugin-icons/pull/90) 的工作。
