---
title: UnoCSS Svelte 作用域
description: Svelte 作用域的 Vite 插件和 Svelte 预处理器为 UnoCSS。
outline: deep
---

# Svelte 作用域

将每个 Svelte 组件的实用样式直接放入 Svelte 组件的 `<style>` 块中，而不是全局 CSS 文件中。

例如，这个组件：

```svelte
<div class="mb-1" />
```

被转换为：

```svelte
<div class="uno-ei382o" />

<style>
  :global(.uno-ei382o) {
    margin-bottom: 0.25rem;
  }
</style>
```

## 何时使用

| 使用场景 | | 描述 | 使用的包 |
| --- | --- | --- | --- |
| 小型应用 | :x: | 使用一个全局 CSS 文件更方便。使用常规 Vite 插件 [Svelte](/integrations/vite#svelte)/[SvelteKit](/integrations/vite#sveltekit)。 | [unocss/vite](/integrations/vite#svelte) |
| 大型应用 | ✅ | Svelte 作用域可以帮助你避免全局 CSS 文件的不断增长。 | [@unocss/svelte-scoped/vite](#vite-plugin) |
| 组件库 | ✅ | 生成的样式直接放在构建的组件中，无需在使用应用的构建管道中使用 UnoCSS。 | [@unocss/svelte-scoped/preprocess](#svelte-preprocessor) |

## 工作原理

常规的 UnoCSS/Tailwind CSS 设置将实用样式放在全局 CSS 文件中，并进行适当的排序。相比之下，Svelte 作用域将你的样式分布在许多随机排序的 Svelte 组件 CSS 文件中。然而，它必须保持实用样式的全局性，以便在需要时能够意识到上下文，如从右到左等其他[使用场景](#context-aware)。这提出了一个挑战，通过使用 Svelte 的 `:global()` 包装器来解决，默认的 Svelte CSS 散列方法并改用基于文件名+类名生成唯一类名的散列。

## 使用方法

因为 Svelte 作用域重写了你的实用类名，你在哪里可以写它们是有限制的：

| 支持的语法 | 示例 |
| --- | --- |
| 类属性 | `<div class="mb-1" />` |
| 类指令 | `<div class:mb-1={condition} />` |
| 类指令简写 | `<div class:logo />` |
| 类属性 | `<Button class="mb-1" />` |

Svelte 作用域设计为使用实用样式的项目的替代品。因此，也支持在类属性中找到的表达式（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但我们建议你继续使用类指令语法。同时注意，如果你以其他方式使用了类名，如将它们放在 `<script>` 块中或使用属性化模式，则你需要在使用 Svelte 作用域之前采取额外的步骤。你可以使用 `safelist` 选项，并查看下面的[预设支持](#预设支持)部分以获取更多提示。

### 上下文感知

尽管样式分布在你的应用的 Svelte 组件中，它们仍然是全局类，并且会与其特定组件外的元素关系工作。以下是一些示例：

#### 父级依赖

依赖于父组件中的属性的类：

```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```

转变为：

```svelte
<div class="uno-3hashz"></div>

<style>
  :global(.dark .uno-3hashz) {
    margin-bottom: 0.5rem;
  }
  :global([dir="rtl"] .

uno-3hashz) {
    right: 0rem;
  }
</style>
```

#### 子级影响

你可以在一些位于不同组件中的 3 个子元素之间添加空间：

```svelte
<div class="space-x-1">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>
```

转变为：

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

#### 将类传递给子组件

你可以向组件添加一个 `class` 属性，以允许在使用该组件的任何地方传递自定义类。

```svelte
<Button class="px-2 py-1">Login</Button>
```

转变为：

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

在接收组件中实现类的一种简单方法是将它们放在使用 `{$$props.class}` 的元素上，如 `div class="{$$props.class} foo bar" />`。

### 应用指令

你可以在 `<style>` 块中使用应用指令，使用 `--at-apply` 或 `@apply`，或使用 `applyVariables` 选项设置的自定义值。

Svelte 作用域甚至能够正确处理如 `dark:text-white` 这样的上下文依赖类，而常规的 [`@unocss/transformer-directives`](/transformers/directives) 包因为它没有为 Svelte 样式块专门构建，无法正确处理。例如，使用 Svelte 作用域，这个组件：

```svelte
<div />

<style>
  div {
    --at-apply: rtl:ml-2;
  }
</style>
```

将被转换为：

```svelte
<div />

<style>
  :global([dir="rtl"]) div {
    margin-right: 0.5rem;
  }
</style>
```

为了使 `rtl:ml-2` 正确工作，`[dir="rtl"]` 选择器被包裹在 `:global()` 中以防止 Svelte 编译器自动剥离它，因为组件没有带有该属性的元素。然而，`div` 不能包含在 `:global()` 包装器中，因为那样的话这个样式将影响你的应用中的每一个 `div`。

### 其他样式块指令

使用 [theme()](https://unocss.dev/transformers/directives#theme) 也受支持，但 [@screen](https://unocss.dev/transformers/directives#screen) **不**。

## Vite 插件

在 Svelte 或 SvelteKit 应用中，将生成的样式直接注入到你的 Svelte 组件中，同时将最少必需的样式放在全局样式表中。查看 Stackblitz 中的 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)：

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-scoped)

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

将 `@unocss/svelte-scoped/vite` 添加到你的 Vite 配置中：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 见类型定义了解所有包含的重置选项或如何传入你自己的
      // ...其他 Svelte 作用域选项
    }),
    sveltekit(),
  ],
})
```

#### 添加配置文件

设置你的 `uno.config.ts` 文件，如[下面](#configuration)所述。

#### 全局样式

尽管几乎所有样式都放在各个组件中，但仍有一些必须放在全局样式表中：预设样式、安全列表和可选的重置（如果使用 `injectReset` 选项）。

将 `%unocss-svelte-scoped.global%` 占位符添加到你的 `<head>` 标签中。在 Svelte 中，这是 `index.html`。在 SvelteKit 中，这将在 `app.html` 的 `%sveltekit.head%` 之前：

```html [index.html]
<head>
  <!-- ... -->
  <title>SvelteKit using UnoCSS Svelte Scoped</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```

如果使用 SvelteKit，你还必须在你的 `src/hooks.server.js` 文件中的 `transformPageChunk` 钩子中添加以下内容：

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

这种转换必须在一个文件中，其[路径包括 `hooks` 和 `server`](https://github.com/unocss/unocss/blob/main/packages/svelte-scoped/src/_vite/global.ts#L12)（例如 `src/hooks.server.js`, `src/hooks.server.ts`），因为 `svelte-scoped` 将在你的服务器钩子文件中查找以替换 `unocss_svelte_scoped_global_styles` 为你的全球样式。确保不要从另一个文件导入这种转换，如当使用 [`@sveltejs/kit/hooks`](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence) 中的 `sequence`。

*在常规的 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子将自动执行此操作。*

## Svelte 预处理器

使用实用样式构建一个不依赖于包含伴随 CSS 文件的组件库，通过预处理器将生成的样式直接放在构建的组件中。查看 Stackblitz 中的 [SvelteKit Library 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)：

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-preprocess)

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

将 `@unocss/svelte-scoped/preprocess` 添加到你的 Svelte 配置中：

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

#### 开发中不合并类名

当在常规应用中使用 Svelte 作用域时，Vite 插件会自动检测 `dev` 与 `build`。在开发中，类将被保持独立并就地散列，以便在你的浏览器开发工具中轻松开启/关闭。`class="mb-1 mr-1"` 将转换为类似 `class="_mb-1_9hwi32 _mr-1_84jfy4"`。在生产中，这些将被编译成使用你选择的前缀（默认为 `uno-`）和基于文件名+类名的散列的单一类名，例如 `class="uno-84dke3"`。

如果你希望在使用预处理器时获得相同的行为，你必须根据环境手动设置 `combine` 选项。一种方法是安装 [cross-env](https://www.npmjs.com/package/cross-env) 并将你的开发脚本更新为：

```
"dev": "cross-env NODE_ENV=development vite dev"
```

然后调整你的 svelte.config.js：

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

设置你的 `uno.config.ts` 文件，如[下面](#configuration)所述。

### 预设样式

当使用预处理器时，你可以选择在需要预设样式的特定组件中包含它们，方法是添加 `uno-preflights` 作为样式属性。

```html
<style uno-preflights></style>
```

任何以句点开始的特殊预设样式，例如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`，将被包裹在 `:global()` 中以避免被 Svelte 编译器自动剥离。

*如果你的类不依赖于预设样式或你的构建组件仅在已包含预设样式的应用中使用，则在单个组件中添加预设样式是不必要的。*

### 安全列表

当使用预处理器时，你可以选择通过添加 `uno-safelist` 作为样式属性，在组件中包含安全列表类。

```html
<style uno-safelist></style>
```

你的安全列表样式将被包裹在 `:global()` 中以避免被 Svelte 编译器自动剥离。

## 配置

将你的 UnoCSS 设置放在 `uno.config.ts` 文件中：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

由于正常 UnoCSS 全局使用和 Svelte 作用域使用之间的差异，不支持提取器。支持预设和变换器，如下节所述。有关所有其他详细信息，请参阅 [配置文件](/guide/config-file) 和 [配置参考](/config/)。

### 预设支持

由于需要在全局样式表中有少量必要样式，并且其他样式包含在需要的每个组件中，预设需要根据情况进行处理：

| 预设 | 支持 | 注释 |
| --- | :-- | :-- |
| [@unocss/preset-uno](https://unocss.dev/presets/uno), [@unocss/preset-mini](https://unocss.dev/presets/mini), [@unocss/preset-wind](https://unocss.dev/presets/wind), [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons), [@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages/preset-icons) | ✅ |

这些和所有社区插件，例如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)，只依赖于规则/变体/预设样式将工作。 |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages/preset-typography) | ✅ | 由于这个预设如何向你的预设样式中添加规则集，你必须在使用这个预设时将 `prose` 类添加到你的安全列表中，否则预设样式将永远不会被触发。这个预设的其他所有类，例如 `prose-pink`，可以在组件作用域中使用。 |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages/preset-rem-to-px) | ✅ | 这个和所有类似的预设，只修改样式输出将工作。 |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages/preset-attributify) | - | 预设不会工作。相反，使用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件（`attributifyToClass({ include: [/\.svelte$/]})`）在 Svelte 作用域 Vite 插件之前 |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages/preset-tagify) | - | 添加自定义提取器的预设将不会工作。创建一个预处理器来将 `<text-red>Hi</text-red>` 转换为 `<span class="text-red">Hi</span>`，然后创建 PR 添加链接这里。 |

对于其他预设，如果它们不依赖于传统的 `class="..."` 使用，你需要先预处理那些类名到 `class="..."` 属性中。如果它们添加像 typography 的 `.prose` 类这样的预设，则你需要将触发预设添加的类放在你的安全列表中。

### 变换器支持

变换器支持你的 CSS 文件（css|postcss|sass|scss|less|stylus|styl）。要使用它们，请在你的 `vite.config.ts` 中的 `cssFileTransformers` 选项中添加变换器：

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
由于 Svelte 作用域的工作方式，变换器不支持在 Svelte 组件中使用。
:::

## 作用域实用类释放创造力

一些建议，关于何时可能想使用作用域样式：如果你在一个大型项目的生命周期中已经到了每次使用类似 `.md:max-w-[50vw]` 的类（你知道它只被使用了一次）时，你都会感到不适，因为你感觉你的全局样式表的大小越来越大，那么请尝试这个包。不愿使用你需要的确切类会抑制创造力。当然，你可以在样式块中使用 `--at-apply: md:max-w-[50vw]`，但这很繁琐，而且上下文中的样式很有用。此外，如果你想在你的项目中包含大量图标，你会开始感觉到将它们添加到全局样式表的重量。当每个组件承担其自身样式和图标的重量时，你可以继续扩展你的项目，而无需分析每次新添加的成本效益。

## 许可

- MIT 许可证 &copy; 2022-PRESENT [Jacob Bowdoin](https://github.com/jacob-8)
