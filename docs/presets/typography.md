---
title: 文字排版预设
description: 为 UnoCSS 提供一组文字段落类，可用于向原始 HTML 添加排版默认设置。
outline: deep
---

# 文字排版预设

为 UnoCSS 提供了一组文字段落类，可用于向原始 HTML 添加排版默认设置。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-typography)

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-typography
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-typography
  ```
  ```bash [npm]
  npm install -D @unocss/preset-typography
  ```
:::

::: tip
此预设已包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetTypography } from 'unocss'
```
:::

## 使用

```js
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 如果使用属性模式，则必需
    presetUno(), // 必需
    presetTypography(),
  ],
})
```

::: code-group
  ```html [类]
  <article class="text-base prose prose-truegray xl:text-xl">
    {{ markdown }}
    <p class="not-prose">
      一些文本
    </p>
  </article>
  ```
  ```html [属性]
  <article text-base prose prose-truegray xl="text-xl">
    {{ markdown }}
    <p class="not-prose">
      一些文本
    </p>
  </article>
  ```
:::

::: warning
注意：`not-prose` 只能作为类使用，不能作为属性使用。
:::

## 亮点

### 任意字号

对正文应用您喜欢的任意字号，`prose` 将为相应的 HTML 元素调整样式。例如，`prose text-lg` 的正文字号为 `1.125rem`，`h1` 的字号将是此大小的 2.25 倍。请参阅[所有支持的 HTML 元素](https://github.com/unocss/unocss/blob/main/packages/preset-typography/src/preflights/default.ts)。

### 任意颜色

使用 UnoCSS 的 `prose-${colorName}` 应用任意颜色（例如 `prose-coolgray`、`prose-sky`），因为 `prose` 默认不包含任何颜色。请参阅[所有可用颜色](#颜色)。例如，`prose prose-truegray` 将为相应的 HTML 元素使用相应的颜色。

### 一键启用暗模式

使用 `prose-invert` 应用排版暗模式（用户需要处理背景色）。例如，`prose dark:prose-invert` 将在暗模式中使用反色。

### 您自己的样式

不在 `prose` 内的元素的样式保持不变。与 UnoCSS 一样，不会重置样式。

### 使用 `not` 实用程序撤销

将 `not-prose` 应用于元素以撤消排版样式。例如，`<table class="not-prose">` 将跳过此预设为 `table` 元素的样式 **（注意：`not` 实用程序仅限于类，因为它仅用于 CSS 选择器且不会被 UnoCSS 扫描）**。

### 兼容选项

此预设使用了一些不常见支持的伪类，但您可以禁用它们。（[#2064](https://github.com/unocss/unocss/pull/2064)）

- 如果启用 `noColonNot` 或 `noColonWhere`，则将无法使用 `not-prose`。
- 如果启用 `noColonIs`，则属性模式将具有错误行为。

## 实用程序

|  规则   |                                            此规则的样式                                                    |
| :-----: | :--------------------------------------------------------------------------------------------------------: |
| `prose` | 请参阅[GitHub](https://github.com/unocss/unocss/blob/main/packages/preset-typography/src/preflights/default.ts)。 |

### 颜色

| 规则（颜色）  |
| ------------- |
| `prose-rose`    |
| `prose-pink`    |
| `prose-fuchsia` |
| `prose-purple`  |
| `prose-violet`  |
| `prose-indigo`  |
| `prose-blue`    |
| `prose-sky`     |
| `prose-cyan`    |
| `prose-teal`    |
| `prose-emerald` |
| `prose-green`   |
| `prose-lime`    |
| `prose-yellow`  |
| `prose-amber`   |
| `prose-orange`  |
| `prose-red`     |
| `prose-gray`    |
| `prose-slate`   |
| `prose-zinc`    |
| `prose-neutral` |
| `prose-stone`   |

## 选项

此预设具有用于喜欢覆盖或扩展的用户的 `selectorName` 和 `cssExtend` 配置。

:::tip
传递给 `cssExtend` 的 CSS 声明将

- **覆盖** 内置样式（如果值冲突），否则
- 与内置样式**深度合并**。
  :::

### selectorName
- **类型：** `string`
- **默认值：** `prose`

用于排版工具的类名。要将样式撤销到元素，请像 `not-${selectorName}` 一样使用。

:::tip
`not` 实用程序仅在类中可用。
:::

### cssExtend
- **类型：** `Record<string, CSSObject>`
- **默认值：** `undefined`

使用 CSS 声明块扩展或覆盖 CSS 选择器。

### compatibility
- **类型：** `TypographyCompatibilityOptions`
- **默认值：** `undefined`

请参阅[兼容选项

](#兼容选项)。
:::warning
请注意，它会影响某些功能。
:::
```ts
interface TypographyCompatibilityOptions {
  noColonWhere?: boolean
  noColonIs?: boolean
  noColonNot?: boolean
}
```

## 示例

```ts
// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetTypography } from '@unocss/preset-typography'

export default defineConfig({
  presets: [
    presetAttributify(), // 如果使用属性模式，则必需
    presetUno(), // 必需
    presetTypography({
      selectorName: 'markdown', // 现在可以像 `markdown markdown-gray`、`not-markdown` 一样使用
      // cssExtend 是一个带有 CSS 选择器作为键和 CSS 声明块作为值的对象，就像编写普通的 CSS 一样。
      cssExtend: {
        'code': {
          color: '#8b5cf6',
        },
        'a:hover': {
          color: '#f43f5e',
        },
        'a:visited': {
          color: '#14b8a6',
        },
      },
    }),
  ],
})
```

## 致谢

- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Windi CSS Typography](https://github.com/windicss/windicss/tree/main/src/plugin/typography)
