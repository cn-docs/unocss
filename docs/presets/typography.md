---
title: 排版预设
description: UnoCSS 的排版工具类 (@unocss/preset-typography)。
outline: deep
---

# 排版预设

提供一组用于为纯 HTML 添加默认排版样式的 prose 类。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)

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
该预设包含在 `unocss` 包中，也可以直接从中导入：

```ts
import { presetTypography } from 'unocss'
```

:::

## 用法

```js [uno.config.js]
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 若使用 attributify 模式需添加
    presetUno(), // 必需的预设
    presetTypography(),
  ],
})
```

::: code-group

```html
<!-- 使用类名 -->
<article class="text-base prose prose-truegray xl:text-xl">
  {{ markdown }}
  <p class="not-prose">一些文字</p>
</article>
```

```html
<!-- 使用属性 -->
<article text-base prose prose-truegray xl="text-xl">
  {{ markdown }}
  <p class="not-prose">一些文字</p>
</article>
```

:::

::: warning
注意：`not-prose` 只能作为类使用，属性中不可使用。
:::

## 特性

### 任意字体大小

可以为主体应用任何字体大小，并且 `prose` 会根据该大小自动调整各 HTML 元素的样式。例如，`prose text-lg` 会将主体字体大小设置为 `1.125rem`，而 `h1` 则会以此为基础缩放 2.25 倍。详见 [支持的 HTML 元素](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。

### 任意颜色

使用 UnoCSS，你可以通过 `prose-${颜色名}` 为排版应用任意颜色（例如 `prose-coolgray`、`prose-sky`），因为默认情况下 `prose` 不设置颜色。例如 `prose prose-truegray` 会为各 HTML 元素应用对应颜色。

### 单一工具类启用暗模式

通过 `prose-invert` 可以让排版在暗模式下使用反转颜色（背景色需要用户自行设置）。例如，`prose dark:prose-invert` 会在暗模式下使用反转颜色。

### 自定义样式

不在 `prose` 内的元素样式保持不变，与 UnoCSS 没有样式重置。

### 使用 `not` 工具取消排版样式

对不希望应用排版样式的元素，添加 `not-prose` 类即可取消预设样式。例如，`<table class="not-prose">` 将跳过对 `table` 元素的排版样式。**（注意：`not` 工具仅可用作类，因为它只在 CSS 选择器中生效，UnoCSS 不会扫描属性中的 `not`）**

### 兼容性选项

此预设使用了一些较少支持的伪类，不过你可以禁用它们。（参见 [#2064](https://github.com/unocss/unocss/pull/2064)）

- 如果启用 `noColonNot` 或 `noColonWhere`，则 `not-prose` 将不可用。
- 如果启用 `noColonIs`，则 attributify 模式可能会出现问题。

## 工具类

| 规则    | 生成的样式                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `prose` | 详见 [GitHub](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。 |

### 颜色

| 颜色相关规则    |
| --------------- |
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

该预设提供了 `selectorName` 和 `cssExtend` 两个配置项，供用户覆写或扩展样式。

::: tip
传入 `cssExtend` 的 CSS 声明块将：

- **覆盖** 内置样式（如果有冲突），否则
- **与内置样式进行深度合并**。
  :::

### selectorName

- **类型:** `string`
- **默认值:** `prose`

用于排版工具类的类名。要取消预设对元素的排版样式，请使用 `not-${selectorName}`（默认为 `not-prose`）。

::: tip
`not` 工具仅能作为类使用。
:::

### cssExtend

- **类型:** `Record<string, CSSObject>`
- **默认值:** `undefined`

扩展或覆盖特定 CSS 选择器的样式。

### compatibility

- **类型:** `TypographyCompatibilityOptions`
- **默认值:** `undefined`

参见 [兼容性选项](#compatibility-options)。
::: warning
注意：此选项可能会影响某些功能。
:::

```ts
interface TypographyCompatibilityOptions {
  noColonWhere?: boolean
  noColonIs?: boolean
  noColonNot?: boolean
}
```

## 示例

```ts [uno.config.ts]
import { presetTypography } from '@unocss/preset-typography'
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 若使用 attributify 模式需添加此预设
    presetUno(), // 必需预设
    presetTypography({
      selectorName: 'markdown', // 使用方式改为 `markdown markdown-gray`、`not-markdown`
      // cssExtend 为一个对象，键为 CSS 选择器，值为 CSS 声明块，与普通 CSS 写法一致
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

## 鸣谢

- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Windi CSS Typography](https://github.com/windicss/windicss/tree/main/src/plugin/typography)
