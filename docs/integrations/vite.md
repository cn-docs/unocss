---
title: UnoCSS Vite 插件
description: UnoCSS 的 Vite 插件（@unocss/vite）。
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

该插件随 `unocss` 包一同发布。

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

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
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

在主入口中导入 `virtual:uno.css`：

```ts [main.ts]
import 'virtual:uno.css'
```

## 模式

该插件内置多种模式以实现不同的行为。

### `global`（默认）

默认模式下，需要在入口文件中导入 `uno.css`。此模式为 `build` 与支持 HMR 的 `dev` 环境启用了多种 Vite 插件，生成的 CSS 会以全局样式注入到 `index.html` 中。

### `vue-scoped`

该模式会将生成的 CSS 注入到 Vue SFC 的 `<style scoped>` 中，从而实现样式隔离。

### `svelte-scoped`

`svelte-scoped` 模式现已移至独立包，参见 [@unocss/svelte-scoped/vite](/integrations/svelte-scoped)。

### `shadow-dom`

针对 Web 组件，由于 Shadow DOM 无法直接引用全局样式（除非使用 CSS 自定义属性），此模式会将生成的 CSS 内联到 Shadow DOM 中。使用时，只需将插件模式设置为 `shadow-dom` 并在每个 Web 组件样式块中添加 `@unocss-placeholder` 占位符即可。如果在 Vue SFC 中定义组件并希望添加自定义样式，可将占位符包裹在 CSS 注释中以避免 IDE 报错。

### `per-module`（实验性）

该模式为每个模块生成独立的 CSS 文件，并可实现样式隔离。

### `dist-chunk`（实验性）

该模式在构建时为每个代码块生成 CSS 文件，适用于多页应用（MPA）。

## 在开发者工具中编辑类名

由于按需生成机制可能导致开发者工具中暂未显示全部工具类，你可以在入口文件中添加以下代码，从而使开发者工具实时检测类名变化：

```ts
import 'uno.css'
import 'virtual:unocss-devtools'
```

::: warning
请谨慎使用。底层使用 [`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 监测类名变化，这可能导致开发环境与生产构建之间出现不一致。建议将动态生成的类添加到 [白名单](https://github.com/unocss/unocss/issues/511) 中，或者为生产构建配置 UI 回归测试。
:::

## 框架支持

部分 UI/应用框架可能需特殊配置以确保正常工作：

### VanillaJS / TypeScript

在使用 VanillaJS 或 TypeScript 时，需要将 `.js` 与 `.ts` 文件扩展名加入 UnoCSS 扫描范围，参见[从构建工具流水线中提取](#extracting-from-build-tools-pipeline)章节。

### React

如果使用 `@vitejs/plugin-react`：

```ts [vite.config.ts]
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    React(),
    UnoCSS(),
  ],
}
```

若使用 `@unocss/preset-attributify`，请从 `build` 脚本中移除 `tsc`。
且当将 `@vitejs/plugin-react` 与 `@unocss/preset-attributify` 同时使用时，务必确保 UnoCSS 插件位于 `@vitejs/plugin-react` 之前：

```ts [vite.config.ts]
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    React(),
  ],
}
```

在 `examples/vite-react` 目录中提供了 React 示例项目，可参考其 package.json 与 Vite 配置。

<ContentExample :item="playgrounds['vite-react']"  class="Link" integrations />

### Preact

如果使用 `@preact/preset-vite`：

```ts [vite.config.ts]
import Preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Preact(),
  ],
}
```

或者使用 `@prefresh/vite`：

```ts [vite.config.ts]
import Prefresh from '@prefresh/vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Prefresh(),
  ],
}
```

若使用 `@unocss/preset-attributify`，同样请移除构建时的 `tsc`，并参考 `examples/vite-preact` 项目。

<ContentExample :item="playgrounds['vite-preact']"  class="Link" integrations />

### Svelte

使用 Svelte 时必须将 UnoCSS 插件置于 `@sveltejs/vite-plugin-svelte` 之前。
要支持 `class:foo` 以及 `class:foo={bar}` 的写法，需在 `UnoCSS` 配置中添加 `extractorSvelte` 选项：

```ts [vite.config.ts]
import { svelte } from '@sveltejs/vite-plugin-svelte'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'

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

### SvelteKit

在 SvelteKit 中，同样需要添加 `extractorSvelte` 以支持 `class:foo` 与 `class:foo={bar}`：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'

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

对于 Web 组件，需要在 UnoCSS 插件中启用 `shadow-dom` 模式，并移除全局 `uno.css` 引入，否则应用将无法工作。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      /* 更多选项 */
    }),
  ],
}
```

在 Web 组件中，在样式块中添加 `@unocss-placeholder` 占位符：

```ts
const template = document.createElement('template')
template.innerHTML = `

<style>
:host { ... }
@unocss-placeholder
</style>
<div class="m-1em">
  ...
</div>
`
```

如果你使用 [Lit](https://lit.dev/)：

```ts
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`  :host { ... }
    @unocss-placeholder`
// ...
}
```

有关 Web Components 示例，请参考 `examples/vite-lit`。

#### `::part` 内置支持

插件支持 `::part`，可以使用 `part-[<part-name>]:<rule|shortcut>` 规则，在 Web 组件中使用（仅在 `shadow-dom` 模式下有效）。插件会使用 `nth-of-type` 避免多个 part 冲突。

例如：

```ts
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

然后在 Web 组件中：

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

使用 Solid 时，需要将 `vite-plugin-solid` 插件放在 UnoCSS 插件之后：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import solidPlugin from 'vite-plugin-solid'

export default {
  plugins: [
    UnoCSS({
      /* 选项 */
    }),
    solidPlugin(),
  ],
}
```

<ContentExample :item="playgrounds['vite-solid']"  class="Link" integrations />

### Elm

使用 Elm 时，需要将 `vite-plugin-elm` 插件放在 UnoCSS 插件之前：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Elm from 'vite-plugin-elm'

export default defineConfig({
  plugins: [
    Elm(),
    UnoCSS(),
  ],
})
```

<ContentExample :item="playgrounds['vite-elm']"  class="Link" integrations />

## Legacy 模式

若使用 `@vitejs/plugin-legacy` 且配置了 `renderModernChunks: false`，则需要在 UnoCSS 选项中作相应配置：

```ts
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
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

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
