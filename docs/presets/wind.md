---
title: Wind 预设
description: UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设 (@unocss/preset-wind)。
outline: deep
---

# Wind 预设

UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind)

::: info
该预设继承自 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-wind
```

```bash [yarn]
yarn add -D @unocss/preset-wind
```

```bash [npm]
npm install -D @unocss/preset-wind
```

:::

```ts [uno.config.ts]
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，也可以直接从中导入：

```ts
import { presetWind } from 'unocss'
```

:::

## 规则

该预设的主要目标是提供与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 的兼容性。需要注意的是，完全的兼容性可能无法保证。详细用法请参阅各自的 [文档](https://tailwindcss.com/docs)。

关于此预设中包含的所有规则和预设，请参考我们的 <a href="/interactive/" target="_blank">交互文档</a> 或直接查看 [源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind)。

## 与 Tailwind CSS 的差异

### 引号

由于提取器的工作方式，不支持在模板文件中使用引号。例如，你将无法书写 `before:content-['']`。对于这种情况，你可以引入一个明确设置的新的工具类，例如 `class="before:content-empty"`。

### 使用任意值的 background-position

Tailwind [允许](https://tailwindcss.com/docs/background-position#using-custom-values) 直接使用裸语法为 `background-position` 设定任意值：

```html
<div class="bg-[center_top_1rem]"></div>
```

而 Wind 预设会将 `center_top_1rem` 解释为颜色。可以使用 `position:` 前缀来达到相同的效果：

```html
<div class="bg-[position:center_top_1rem]"></div>
```

### 动画 (Animates)

Tailwind CSS 内置的动画较少，我们完全支持其动画规则，并且在内部集成了 [Animate.css](https://github.com/animate-css/animate.css) 以提供更多动画效果。

你可以使用 `animate-` 前缀帮助 IntelliSense 快速找到所需动画。

::: tip
我们不会合并 Tailwind 与 Animate.css 中冲突的动画名称。如果你需要使用 Animate.css 的动画名称，请使用 `animate-<name>-alt`。
:::

例如

|                                                                                                                                         Tailwind CSS                                                                                                                                          |                                                                                                                                            Animate.css                                                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                       `animate-bounce`                                                                                                                                        |                                                                                                                                       `animate-bounce-alt`                                                                                                                                        |
| <div w-full flex="~ items-center justify-center"><div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> | <div w-full flex="~ items-center justify-center"><div class="animate-bounce-alt bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> |

如果你希望自定义或修改动画效果，我们提供了高度可定制的配置项。你可以通过配置项修改动画的持续时间、延迟、缓动函数等。

```ts [uno.config.ts]
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      durations: {
        custom: '1s',
      },
      timingFns: {
        custom: 'cubic-bezier(0.4,0,.6,1)',
      },
      properties: {
        custom: { 'transform-origin': 'center' },
      },
      counts: {
        custom: 'infinite',
      },
    }
  }
})
```

预览自定义动画效果：

<div class="animate-custom bg-white dark:bg-slate-800 p-2 w-fit ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-md flex items-center justify-center">animate-custom</div>

::: tip
你也可以为动画添加 `category` 以便更好地分组管理，这将使下游工具更容易消费动画效果。

```ts [uno.config.ts] {9}
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      // ...
      category: {
        custom: 'Zooming',
      },
    }
  }
})
```

:::

## 与 Windi CSS 的差异

### 断点

| Windi CSS | UnoCSS      |
| :-------- | :---------- |
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `>xl:p-1` | `xl:p-1`    |

### 括号语法中的空格

该预设使用 `_` 代替 `,` 以在括号语法中保留空格。

| Windi CSS                          | UnoCSS                             |
| :--------------------------------- | :--------------------------------- |
| `grid-cols-[1fr,10px,max-content]` | `grid-cols-[1fr_10px_max-content]` |

由于某些 CSS 规则的值需要包含 `,`，例如 `grid-cols-[repeat(3,auto)]`。

## 实验性功能

::: warning
此预设包含实验性功能，可能会随时发生破坏性变更。
:::

### 媒体悬停 (Media Hover)

媒体悬停解决了 [sticky hover](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/) 的问题，即在移动设备上点击包含悬停样式的目标后，该悬停样式会持续存在直到点击其他地方。

由于常规的 `:hover` 样式被广泛使用，所以该变体使用 `@hover` 语法来区别于常规的 `hover` 伪类。

变体 `@hover-text-red` 将输出：

```css
@media (hover: hover) and (pointer: fine) {
  .\@hover-text-red:hover {
    --un-text-opacity: 1;
    color: rgb(248 113 113 / var(--un-text-opacity));
  }
}
```

## 选项

::: info
此预设的选项继承自 [`@unocss/preset-mini`](/presets/mini#选项)。
:::

### important

- **类型:** `boolean | string`
- **默认值:** `false`

`important` 选项允许你控制 UnoCSS 生成的工具类是否添加 `!important`。这在与现有的具有高特异性选择器的 CSS 一起使用时非常有用。

::: warning
使用该选项会将所有 UnoCSS 的工具类都标记为 !important。如果你只希望对特定工具类应用 `important:` 变体，应使用该变体。
:::

然而，将 `important` 设置为 `true` 可能会引入一些问题，比如在使用添加内联样式的第三方 JavaScript 库时，UnoCSS 的 `!important` 工具类会覆盖内联样式，从而破坏设计。

为解决此问题，你可以将 `important` 设置为 ID 选择器，例如 `#app`：

```ts [uno.config.ts]
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind({
      important: '#app',
    }),
  ],
})
```

该配置会在所有工具类前添加指定选择器，从而提高其特异性，而无需实际使用 `!important`。

例如，工具类 `dark:bg-blue` 将输出：

```css
#app :is(.dark .dark\:bg-blue) {
  --un-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--un-bg-opacity));
}
```
