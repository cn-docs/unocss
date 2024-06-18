---
title: UnoCSS Vite 插件
description: UnoCSS 的 Vite 插件 (@unocss/vite)。
outline: deep
---

<script setup lang="ts">
import { examples } from '../.vitepress/content'

const playgrounds = examples.reduce((acc, cur) => {
  acc[cur.name] = cur
  return acc
}, {})
</script>

# Vite 插件

Vite 插件随 `unocss` 包一起发布。

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

安装插件：

```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

创建 `uno.config.ts` 文件：

```ts
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
})
```

将 `virtual:uno.css` 添加到您的主入口文件：

```ts
// main.ts
import 'virtual:uno.css'
```

## 模式

Vite 插件提供了一组模式，可实现不同的行为。

### `global`（默认）

这是插件的默认模式：在此模式下，您需要在入口点添加 `uno.css` 的导入。

此模式启用了一组用于 `build` 和带有 `HMR` 支持的 `dev` 的 Vite 插件。

生成的 `css` 将是一个全局样式表，注入到 `index.html` 中。

### `vue-scoped`

此模式将生成的 CSS 注入到 Vue SFCs 的 `<style scoped>` 中，以实现隔离。

### `svelte-scoped`

`svelte-scoped` 模式已移至其自己的包，请参阅 [@unocss/svelte-scoped/vite](/integrations/svelte-scoped)。

### `shadow-dom`

由于 `Web Components` 使用 `Shadow DOM`，无法直接从全局样式表中为内容设置样式（除非您使用 `CSS custom properties`，这些属性将穿透 `Shadow DOM`），因此，您需要将插件生成的 CSS 内联到 `Shadow DOM` 样式中。

要将生成的 CSS 内联，您只需将插件模式配置为 `shadow-dom` 并在每个 Web 组件样式 CSS 块中包含 `@unocss-placeholder` 魔术占位符。如果您在 Vue SFCs 中定义您的 Web 组件并且希望定义 UnoCSS 以外的自定义样式，您可以将占位符包装在 CSS 注释中，以避免在您的 IDE 中出现语法错误。

### `per-module`（实验性的）

此模式将为每个模块生成一个 CSS 样式表，可进行范围限定。

### `dist-chunk`（实验性的）

此模式将为每个代码块在构建时生成一个 CSS 样式表，非常适合多页面应用。

## 在 DevTools 中编辑类

由于 "按需" 的限制，DevTools 不知道您尚未在源代码中使用的类。因此，如果您想尝试通过直接在 DevTools 中更改类来查看事物的工作原理，只需将以下行添加到您的主入口。

```ts
import 'uno.css'
import 'virtual:unocss-devtools'
```

::: warning
请谨慎使用，我们在底层使用 [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 来检测类的更改。这意味着不仅您的手动更改，而且您的脚本所做的更改也将被检测并包含在样式表中。当您根据脚本标签中的某些逻辑添加动态类时，这可能导致开发和生产构建之间的一些不一致。如果可能的话，我们建议将您的动态部分添加到 [safelist](https://github.com/unocss/unocss/issues/511) 或为您的生产构建设置 UI 回归测试。
:::

## 框架

一些 UI/App 框架可能存在一些必须解决的注意事项，如果您正在使用以下框架之一，请应用建议。

### VanillaJS / TypeScript

当使用 VanillaJS 或 TypeScript 时，您需要添加 `js` 和 `ts` 文件扩展名，以允许 UnoCSS 读取和解析内容，默认情况下，`js` 和 `ts` 文件被排除在外，请查看 [从构建工具管道提取](/guide/extracting#从构建工具管道中提取) 部分。

### React

如果您使用 `@vitejs/plugin-react`：

```ts
// vite.config.js
import UnoCSS from 'unocss/vite'
import React from '@vitejs/plugin-react'

export default {
  plugins: [
    React(),
    UnoCSS(),
  ],
}
```

如果您使用 `@unocss/preset-attributify`，您应该从 `build` 脚本中删除 `tsc`。

如果您使用 `@vitejs/plugin-react` 与 `@unocss/preset-attributify`，您必须在 `@vitejs/plugin-react` 之前添加插件。

```ts
// vite.config.js
import UnoCSS from 'unocss/vite'
import React from '@vitejs/plugin-react'

export default {
  plugins: [
    UnoCSS(),
    React(),
  ],
}
```

您可以在 [examples/vite-react](https://github.com/unocss/unocss/tree/main/examples/vite-react) 目录中找到一个使用这两个插件的 `React` 示例项目，检查 `package.json` 文件中的脚本和其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-react']"  class="Link" integrations />

### Preact

如果您使用 `@preact/preset-vite`：

```ts
// vite.config.js
import Preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Preact(),
  ],
}
```

或者如果您使用 `@prefresh/vite`：

```ts
// vite.config.js
import Prefresh from '@prefresh/vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Prefresh(),
  ],
}
```

如果您使用 `@unocss/preset-attributify`，您应该从 `build` 脚本中删除 `tsc`。

您可以在 [examples/vite-preact](https://github.com/unocss/unocss/tree/main/examples/vite-preact) 目录中找到一个使用这两个插件的 `Preact` 示例项目，检查 `package.json` 文件中的脚本和其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-preact']"  class="Link" integrations />

### Svelte

您必须在 `@sveltejs/vite-plugin-svelte` 之前添加插件。

要支持 `class:foo` 和 `class:foo={bar}`，请添加插件并在 `extractors` 选项上配置 `extractorSvelte`。

您可以使用简单的规则与 `class:`，例如 `class:bg-red-500={foo}`，或者使用 `shortcuts` 来包含多个规则，查看下面链接示例项目中的 `src/App.svelte`。

```ts
// vite.config.js
import { svelte } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from 'unocss/vite'
import extractorSvelte from '@unocss/extractor-svelte'

export default {
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* more options */
    }),
    svelte(),
  ],
}
```

<ContentExample :item="playgrounds['vite-svelte']"  class="Link" integrations />

### Sveltekit

要支持 `class:foo` 和 `class:foo={bar}`，请添加插件并在 `extractors` 选项上配置 `extractorSvelte`。

您可以使用简单的规则与 `class:`，例如 `class:bg-red-500={foo}`，或者使用 `shortcuts` 来包含多个规则，查看下面链接示例项目中的 `src/routes/+layout.svelte`。

```ts
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from 'unocss/vite'
import extractorSvelte from '@unocss/extractor-svelte'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* more options */
    }),
    sveltekit(),
  ],
}
```

<ContentExample :item="playgrounds['sveltekit']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-preprocess']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-scoped']"  class="Link" integrations />

### Web Components

要与 Web 组件一起使用，您需要在插件上启用 `shadow-dom` 模式。

不要忘记删除 `uno.css` 的导入，因为 `shadow-dom` 模式不会暴露它，应用程序将无法工作。

```ts
// vite.config.js
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      /* more options */
    }),
  ],
}
```

在每个 `web component` 中，只需在其样式 CSS 块中添加 `@unocss-placeholder`：

```ts
const template = document.createElement('template')
template.innerHTML = `
<style>
:host {...}
@unocss-placeholder
</style>
<div class="m-1em">
...
</div>
`
```

如果您正在使用 [Lit](https://lit.dev/)：

```ts
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {...}
    @unocss-placeholder
  `
  // ...
}
```

您可以在 [examples/vite-lit](https://github.com/unocss/unocss/tree/main/examples/vite-lit) 目录中找到一个使用了 `Web Components` 的示例项目。

#### `::part` 内置支持

您可以使用 `::part`，因为该插件通过 `preset-mini` 的 `shortcuts` 和使用 `part-[<part-name>]:<rule|shortcut>` 规则支持它，例如将其与简单规则一起使用，如 `part-[<part-name>]:bg-green-500`，或者使用一些 `shortcut`：在下面链接示例项目的 `src/my-element.ts` 中查看。

`part-[<part-name>]:<rule|shortcut>` 只会在使用 `shadow-dom` 模式的此插件中工作。

该插件使用 `nth-of-type` 来避免与同一 Web 组件中的多个部分发生冲突，并且对于不同 Web 组件上的相同部分，您无需担心，插件将为您处理。

```ts
// vite.config.js
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      shortcuts: [
        { 'cool-blue': 'bg-blue-500 text-white' },
        { 'cool-green': 'bg-green-500 text-black' },
      ],
      /* more options */
    }),
  ],
}
```

然后在您的 Web 组件中：

```ts
// my-container-wc.ts
const template = document.createElement('template')
template.innerHTML = `
<style>
@unocss-placeholder
</style>
<my-wc-with-parts class="part-[cool-part]:cool-blue part-[another-cool-part]:cool-green">...</my-wc-with-parts>
`
```

```ts
// my-wc-with-parts.ts
const template = document.createElement('template')
template.innerHTML = `
<style>
@unocss-placeholder
</style>
<div>
  <div part="cool-part">...</div>
  <div part="another-cool-part">...</div>
</div>
`
```
<ContentExample :item="playgrounds['vite-lit']"  class="Link" integrations />

### Solid

您需要在 UnoCSS 的插件之后添加 `vite-plugin-solid` 插件。

```ts
// vite.config.js
import solidPlugin from 'vite-plugin-solid'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      /* options */
    }),
    solidPlugin(),
  ],
}
```

<ContentExample :item="playgrounds['vite-solid']"  class="Link" integrations />

### Elm

您需要在 UnoCSS 的插件之前添加 `vite-plugin-elm` 插件。

```ts
// vite.config.js
import { defineConfig } from 'vite'
import Elm from 'vite-plugin-elm'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    Elm(),
    UnoCSS(),
  ],
})
```

<ContentExample :item="playgrounds['vite-elm']"  class="Link" integrations />

## Legacy

If `@vitejs/plugin-legacy` with `renderModernChunks: false`, your need add it to `unocss` option

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetUno()],
      legacy: {
        renderModernChunks: false,
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderModernChunks: false,
    }),
  ],
})
```

## License

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
