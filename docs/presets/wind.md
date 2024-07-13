---
title: Wind 预设
description: UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设 (@unocss/preset-wind)。
outline: deep
---

# Wind 预设

UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-wind)

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

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  presets: [
    presetWind(),
  ],
})
```

::: tip
该预设已包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetWind } from 'unocss'
```
:::

## 规则
该预设的主要目标是与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 兼容。请注意，无法保证完全兼容性。有关详细用法，请参阅它们的 [文档](https://tailwindcss.com/docs)。

有关此预设中包含的所有规则和预设，请参阅我们的 <a href="/interactive/" target="_blank">交互式文档</a> 或直接转到 [源代码](https://github.com/unocss/unocss/tree/main/packages/preset-wind)。

## 与 Tailwind CSS 的差异

### 引号

在模板（用于处理的文件）中使用引号是不被支持的，因为这会影响提取器的工作。例如，你不能写 `before:content-['']`。对于这些情况，你可能更倾向于引入一个新的工具类类，比如 `class="before:content-empty"`，以便明确设置。

## 与 Windi CSS 的差异

### 断点

| Windi CSS | UnoCSS |
|:--|:--|
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `>xl:p-1` | `xl:p-1`    |

### 方括号语法中的空格

该预设使用 `_` 替换 `,` 以保留方括号语法中的空格。

| Windi CSS | UnoCSS |
|:--|:--|
| `grid-cols-[1fr,10px,max-content]` | `grid-cols-[1fr_10px_max-content]` |

由于某些 CSS 规则需要 `,` 作为值的一部分，例如 `grid-cols-[repeat(3,auto)]`

## 实验性功能

::: warning
该预设包含实验性功能，可能随时以破坏性方式更改。
:::

### 媒体悬停

媒体悬停解决了[粘滞悬停](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/)问题，即在移动设备上点击包含悬停样式的目标后，该悬停样式会持续存在，直到点击其他地方。

由于常规的 `:hover` 样式可能被广泛使用，此变体使用 `@hover` 语法来区分它与常规的 `hover` 伪类。

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
该预设选项继承自 [`@unocss/preset-mini`](/presets/mini#选项)。
:::

### important
- **类型：** `boolean | string`
- **默认值：** `false`

`important` 选项允许您控制是否应该将 UnoCSS 生成的工具标记为 `!important`。当与具有高特异性选择器的现有 CSS 一起使用 UnoCSS 时，这可能非常有用。

::: warning
使用此选项将使 UnoCSS 生成的所有工具都标记为 `!important`。如果您只想将其应用于特定的工具，请改用 `important:` 变体。
:::

但是，将 `important` 设置为 `true` 可能会在将第三方 JS 库合并到您的元素中时引入一些问题，这些库会向元素添加内联样式。在这些情况下，UnoCSS 的 `!important` 工具会覆盖内联样式，这可能会破坏您的预期设计。

为了解决这个问题，您可以将 important 设置为 ID 选择器，例如 `#app`：

```ts
// uno.config.ts
import { defineConfig } from

  'unocss'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  presets: [
    presetWind({
      important: '#app',
    }),
  ],
})
```

此配置将为所有工具添加给定选择器的前缀，从而有效地增加其特异性，而不会实际使它们变为 `!important`。

`dark:bg-blue` 工具将生成以下 CSS：

```css
#app :is(.dark .dark\:bg-blue) {
    --un-bg-opacity: 1;
    background-color: rgb(96 165 250 / var(--un-bg-opacity));
}
```
