---
title: Uno 预设
description: UnoCSS 的默认预设 (@unocss/preset-uno)。
outline: deep
---

# Uno 预设

UnoCSS 的默认预设。目前它与 [`@unocss/preset-wind`](/presets/wind) 等价。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-uno)

::: info
该预设继承自 [`@unocss/preset-wind`](/presets/wind) 和 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-uno
```

```bash [yarn]
yarn add -D @unocss/preset-uno
```

```bash [npm]
npm install -D @unocss/preset-uno
```

:::

```ts [uno.config.ts]
import presetUno from '@unocss/preset-uno'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，也可以直接从中导入：

```ts
import { presetUno } from 'unocss'
```

:::

## 用法

该预设旨在提供一个覆盖主流工具优先框架的超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。

例如，`ml-3`（Tailwind CSS）、`ms-2`（Bootstrap）、`ma4`（Tachyons）以及 `mt-10px`（Windi CSS）均为合法工具类。

```css
.ma4 {
  margin: 1rem;
}
.ml-3 {
  margin-left: 0.75rem;
}
.ms-2 {
  margin-inline-start: 0.5rem;
}
.mt-10px {
  margin-top: 10px;
}
```

## 规则

该预设与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 兼容，详细用法请参考它们的 [文档](https://tailwindcss.com/docs)。

关于预设中包含的所有规则和预设，请访问我们的 [交互文档](https://unocss.dev/interactive/) 或直接查看 [源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-uno)。

## 选项

::: info
该预设的选项继承自 [`@unocss/preset-mini`](/presets/mini#选项)。
:::

欲了解更多默认预设详情，请访问我们的 [Playground](/play/) 试用，同时也可查看 [实现代码](https://github.com/unocss/unocss/tree/main/packages-presets)。
