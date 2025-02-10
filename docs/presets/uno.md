---
title: Uno preset
description: The default preset for UnoCSS (@unocss/preset-uno).
outline: deep
---

# Uno preset

The default preset for UnoCSS. It's currently equivalent to [`@unocss/preset-wind`](/presets/wind).

[Source Code](https://github.com/unocss/unocss/tree/main/packages-presets/preset-uno)

::: info
This preset inherits [`@unocss/preset-wind`](/presets/wind) and [`@unocss/preset-mini`](/presets/mini).
:::

## Installation

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
This preset is included in the `unocss` package, you can also import it from there:

```ts
import { presetUno } from 'unocss'
```

:::

## Usage

This preset attempts to provide a common superset of the popular utility-first frameworks, including Tailwind CSS, Windi CSS, Bootstrap, Tachyons, etc.

For example, `ml-3` (Tailwind CSS), `ms-2` (Bootstrap), `ma4` (Tachyons), and `mt-10px` (Windi CSS) are all valid.

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

## Rules

This preset is compatible with [Tailwind CSS](https://tailwindcss.com/) and [Windi CSS](https://windicss.org/), you can refer to their [documentation](https://tailwindcss.com/docs) for detailed usage.

For all rules and presets included in this preset, please refer to our [interactive docs](https://unocss.dev/interactive/) or directly go to the [source code](https://github.com/unocss/unocss/tree/main/packages-presets/preset-uno).

## Options

::: info
This preset's options are inherited from [`@unocss/preset-mini`](/presets/mini#options).
:::

For more details about the default preset, you can check out our [playground](/play/) and try it out. Meanwhile, you can also check out [the implementations](https://github.com/unocss/unocss/tree/main/packages-presets).
