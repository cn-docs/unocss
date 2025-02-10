---
title: UnoCSS Svelte Scoped
description: UnoCSS 的 Svelte Scoped Vite 插件和 Svelte 预处理器。
outline: deep
---

# Svelte Scoped

该插件将每个 Svelte 组件中工具类的样式直接注入到组件的 `<style>` 块中，而不是放在全局 CSS 文件中。

例如，下面这个 Svelte 组件：

```svelte
<div class="mb-1" />
```

会被转换为：

```svelte
<div class="uno-ei382o" />

<style>
  :global(.uno-ei382o) {
    margin-bottom: 0.25rem;
  }
</style>
```

## 何时使用

| 使用场景 |     | 描述                                                                                                                                           | 推荐使用方案                                         |
| -------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 小型应用 | :x: | 拥有一个全局 CSS 文件更便捷，建议使用常规 Vite 插件（参见 [Svelte](/integrations/vite#svelte) 或 [SvelteKit](/integrations/vite#sveltekit)）。 | [unocss/vite](/integrations/vite#svelte)             |
| 大型应用 | ✅  | Svelte Scoped 能有效避免全局 CSS 文件体积不断增长。                                                                                            | [@unocss/svelte-scoped/vite](#vite-plugin)           |
| 组件库   | ✅  | 工具类样式直接打包进组件，无需依赖使用端构建时载入 UnoCSS。                                                                                    | [@unocss/svelte-scoped/preprocess](#svelte-预处理器) |

## 工作原理

常规的 UnoCSS/Tailwind CSS 配置会将工具类样式生成到全局 CSS 文件中，并保证正确的顺序。而 Svelte Scoped 则会将生成的样式分散到各个 Svelte 组件中，但同时需要确保这些工具类全局可用（以支持如右-to-left 等场景）。这通过将样式使用 Svelte 的 `:global()` 包裹，并基于文件名及类名生成独一无二的全局类名来实现。

## 用法

由于 Svelte Scoped 会重写工具类名称，因此仅支持以下场景：

| 支持的语法        | 示例                             |
| ----------------- | -------------------------------- |
| 类属性            | `<div class="mb-1" />`           |
| 类指令            | `<div class:mb-1={condition} />` |
| 类指令简写        | `<div class:logo />`             |
| 组件的 class 属性 | `<Button class="mb-1" />`        |

Svelte Scoped 设计为可以直接替换现有的工具类写法。尽管支持类属性中的表达式（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但建议使用类指令语法。此外，若你在 `<script>` 中或其他地方（如使用 attributify 模式）使用工具类，可能需要借助 `safelist` 等选项来确保这些工具类正确生成，请参考下文[预设支持](#presets-support)部分。

### 上下文感知

虽然样式在各组件中生成，但它们依然作为全局类存在，可作用于组件外的元素。例如：

#### 依赖父元素

例如依赖父组件属性的类：

```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```

转换后为：

```svelte
<div class="uno-3hashz"></div>

<style>
  :global(.dark .uno-3hashz) {
    margin-bottom: 0.5rem;
  }
  :global([dir="rtl"] .uno-3hashz) {
    right: 0rem;
  }
</style>
```

#### 子元素间距

为多个子元素添加间距，即使它们来自不同组件：

```svelte
<div class="space-x-1">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>
```

转换后为：

```svelte
<div class="uno-7haszz">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>

<style>
  :global(.uno-7haszz > :not([hidden]) ~ :not([hidden])) {
    --un-space-x-reverse: 0;
    margin-left: calc(0.25rem * calc(1 - var(--un-space-x-reverse)));
    margin-right: calc(0.25rem * var(--un-space-x-reverse));
  }
</style>
```

#### 传递类给子组件

可以在组件中通过 `class` 属性传递自定义类：

```svelte
<Button class="px-2 py-1">Login</Button>
```

转换后为：

```svelte
<Button class="uno-4hshza">Login</Button>

<style>
  :global(.uno-4hshza) {
    padding-left:0.5rem;
    padding-right:0.5rem;
    padding-top:0.25rem;
    padding-bottom:0.25rem;
  }
</style>
```

在接收组件中，你可以通过 `{$$props.class}` 将外部传入的类连接到目标元素上，例如：

```svelte
<div class="{$$props.class} foo bar"></div>
```

### 应用指令

你可以在 `<style>` 块中使用应用指令，如 `--at-apply` 或 `@apply`，也可通过 `applyVariables` 选项自定义变量。

Svelte Scoped 可以正确处理诸如 `dark:text-white` 等依赖上下文的工具类，而常规的 [`@unocss/transformer-directives`](/transformers/directives) 由于没有针对 Svelte 进行专门设计，可能无法正确处理。例如，以下示例：

```svelte
<div />

<style>
  div {
    --at-apply: rtl:ml-2;
  }
</style>
```

会被转换为：

```svelte
<div />

<style>
  :global([dir=\\"rtl\\"]) div {
    margin-right: 0.5rem;
  }
</style>
```

为确保 `rtl:ml-2` 能生效，`[dir="rtl"]` 需要使用 `:global()` 包裹，而不可将 `div` 同时包含进去，否则会影响所有 `div`。

### 其他样式块指令

`theme()` 同样受支持，但 [@screen](https://unocss.dev/transformers/directives#screen) 指令则**不**支持。

## Vite Plugin

在 Svelte 或 SvelteKit 应用中，Svelte Scoped 可将生成的样式直接注入组件，同时保留全局中仅必要的样式。请参阅 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)（StackBlitz）。

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-scoped)

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```

```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```

```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```

:::

#### 添加插件

在你的 Vite 配置中添加 `@unocss/svelte-scoped/vite` 插件：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 查看类型定义以了解所有内置重置选项或如何传入自定义文件
      // ...其他 Svelte Scoped 选项
    }),
    sveltekit(),
  ],
})
```

#### 添加配置文件

请按照需求配置你的 `uno.config.ts` 文件，配置方法与其它集成一致。

#### 全局样式

虽然大部分工具类样式会放入各个组件中，但预设样式、白名单和（可选的）重置样式需放入全局样式表中。
在 `<head>` 标签中添加 `%unocss-svelte-scoped.global%` 占位符（在 Svelte 中位于 `index.html`；在 SvelteKit 中放在 `app.html` 中并位于 `%sveltekit.head%` 之前）：

<!-- eslint-skip -->

```html [index.html]
<head>
  <!-- ... -->
  <title>SvelteKit 使用 UnoCSS Svelte Scoped</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```

如果你使用 SvelteKit，还必须在 `src/hooks.server.js` 文件中添加如下代码，在 `transformPageChunk` 钩子中替换占位符：

```js [src/hooks.server.js]
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(
        '%unocss-svelte-scoped.global%',
        'unocss_svelte_scoped_global_styles'
      ),
  })
  return response
}
```

请确保此转换代码所在的文件路径中包含 `hooks` 与 `server`，以便 Svelte Scoped 正确查找并替换全局样式占位符。
在普通的 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子会自动处理该操作。

## Svelte 预处理器

在构建独立组件库时，可以使用预处理器将生成的样式直接嵌入到组件内部，从而使组件库无需依赖外部 CSS 文件。请参考 [SvelteKit Library 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)（StackBlitz）。

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```

```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```

```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```

:::

#### 添加预处理器

在你的 Svelte 配置文件（例如 `svelte.config.js`）中引入 `@unocss/svelte-scoped/preprocess`：

```ts [svelte.config.js]
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from '@unocss/svelte-scoped/preprocess'

const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
      // ...预处理器选项
    }),
  ],
  // 其他 Svelte 配置
}
```

#### 开发模式下不合并类名

在开发模式中，Vite 插件会自动检测环境，使生成的类名保留各自的独立哈希，便于调试。而在生产中则合并多个工具类为单一类。
若使用预处理器，也需手动根据环境设置 `combine` 选项。例如，安装 [cross-env](https://www.npmjs.com/package/cross-env) 并在 package.json 中这样配置：

```
"dev": "cross-env NODE_ENV=development vite dev"
```

然后在 `svelte.config.js` 中：

```diff
+const prod = process.env.NODE_ENV !== 'development'
const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
+      combine: prod,
    }),
  ],
}
```

#### 添加配置文件

按照常规方法配置你的 `uno.config.ts` 文件即可。

### 预设样式

当使用预处理器时，可以在需要的组件中通过添加 `uno-preflights` 属性来注入预设样式。例如：

```html
<style uno-preflights></style>
```

以“.”开头的预设样式（如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`）会自动被包裹在 `:global()` 中，避免被 Svelte 编译器剔除。

如果你的组件不依赖这些预设样式，或仅在已注入预设样式的应用中使用，则无需在组件中添加。

### 白名单

使用预处理器时，你可通过添加 `uno-safelist` 属性，将白名单内的工具类注入到当前组件中：

```html
<style uno-safelist></style>
```

这些样式也会自动被包裹在 `:global()` 中，避免被 Svelte 剔除。

## 配置

在 `uno.config.ts` 中配置 UnoCSS：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

由于普通的提取器不适用于 Svelte Scoped，因此 extractors 不受支持；预设与转换器的使用方式与标准用法一致，详情请参阅 [配置文件](/guide/config-file) 与 [配置参考](/config/)。

### 预设支持

由于部分样式必须在全局中生成，而其它则在组件中生成，预设支持需区分对待：

| 预设                                                                                                                                                                                                                                                                                                                                                                  | 支持情况 | 备注                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@unocss/preset-uno](https://unocss.dev/presets/uno), [@unocss/preset-mini](https://unocss.dev/presets/mini), [@unocss/preset-wind](https://unocss.dev/presets/wind), [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons), [@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons) |    ✅    | 这些（以及所有仅依赖规则、变体、预设样式的社区预设，例如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)）均可使用。                                                                          |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)                                                                                                                                                                                                                                                            |    ✅    | 此预设通过在全局预设样式中添加规则组实现，需确保触发该预设的 `prose` 类被加入白名单，否则预设样式不会被应用；其它如 `prose-pink` 等类可直接在组件中生效。                                                              |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)                                                                                                                                                                                                                                                              |    ✅    | 该预设以及所有仅修改样式输出的预设均可使用。                                                                                                                                                                           |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)                                                                                                                                                                                                                                                          |    -     | 不支持该预设。请使用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件（配置 `attributifyToClass({ include: [/\.svelte$/]})`）在 Svelte Scoped 之前转换属性为类名。 |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)                                                                                                                                                                                                                                                                    |    -     | 添加自定义提取器的预设不支持。建议创建预处理器将 `<text-red>Hi</text-red>` 转换为 `<span class="text-red">Hi</span>`，然后提交 PR 将链接添加到文档中。                                                                 |

对于其它预设，如不依赖传统 `class="..."` 写法，则需要先通过预处理器将其转换为相应的类；若预设添加了类似 `.prose` 类，则需将触发该预设的类加入白名单。

### 转换器支持

转换器支持适用于普通 CSS 文件（css|postcss|sass|scss|less|stylus|styl）。在 `vite.config.ts` 配置中，通过 `cssFileTransformers` 选项添加所需转换器：

```ts [vite.config.ts]
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  plugins: [
    UnoCSS({
      cssFileTransformers: [transformerDirectives()],
    }),
    sveltekit(),
  ],
})
```

::: info
由于 Svelte Scoped 的工作原理，转换器在 Svelte 组件内部不支持使用。
:::
