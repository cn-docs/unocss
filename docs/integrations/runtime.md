---
title: UnoCSS CDN 运行时
description: UnoCSS 的 CSS-in-JS 运行时（@unocss/runtime）。
outline: deep
---

# 运行时

UnoCSS 运行时提供了一个 CDN 版本，能够在浏览器中直接运行 UnoCSS。它会监控 DOM 变化，并动态生成样式。

## 用法

在你的 `index.html` 中加入如下代码：

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

你可在加载运行时之前通过定义配置对其进行配置：

```html
<!-- 定义 UnoCSS 选项 -->
<script>
  window.__unocss = {
    rules: [
      // 自定义规则...
    ],
    presets: [
      // 自定义预设...
    ],
    // ...
  }
</script>
<!-- 加载运行时 -->
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

默认情况下，会自动应用 [Uno 预设](/presets/uno)。

该运行时不自带预设样式，若需要样式重置，请自行添加或使用 [Reset 包](/guide/style-reset) 提供的样式重置。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/normalize.min.css" />
<!-- 或者 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
```

## 构建版本

针对不同使用需求，提供了多种构建版本：

### Uno（默认）

内置 `@unocss/preset-uno` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js"></script>
```

### Attributify

内置 `@unocss/preset-uno` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js"></script>
```

### Mini

内置 `@unocss/preset-mini` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/mini.global.js"></script>
```

### Core

如果你需要自由组合预设，可以只加载核心运行时，并手动传入预设。所有官方预设（参见 [预设列表](/presets/#presets)）均可使用。在初始化核心运行时之前先加载所需预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-icons.global.js"></script>
<script>
  window.__unocss = {
    presets: [
      () =>
        window.__unocss_runtime.presets.presetIcons({
          scale: 1.2,
          cdn: 'https://esm.sh/',
        }),
    ],
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/core.global.js"></script>
```

## 打包工具用法

```bash
npm i @unocss/runtime
```

```ts
import initUnocssRuntime from '@unocss/runtime'

initUnocssRuntime({ /* options */ })
```

你也可以通过 `defaults` 属性传入 UnoCSS 配置：

```ts
import initUnocssRuntime from '@unocss/runtime'
import config from './uno.config'

initUnocssRuntime({ defaults: config })
```

预设也可以从 `esm.sh` 导入：

```ts
import { defineConfig } from '@unocss/runtime'
import presetIcons from 'https://esm.sh/@unocss/preset-icons/browser'
import presetUno from 'https://esm.sh/@unocss/preset-uno'

export default defineConfig({
  presets: [presetUno(), presetIcons({ cdn: 'https://esm.sh/' })],
})
```

## 防止 FOUC

由于 UnoCSS 在 DOM 加载完成后运行，可能会出现“未样式化内容闪烁”（FOUC）。为防止这种情况，可以利用 `un-cloak` 属性，并在 CSS 中设置例如 `[un-cloak] { display: none }` 来隐藏未应用样式的部分。

::: code-group

```css
[un-cloak] {
  display: none;
}
```

```html
<div class="text-blue-500" un-cloak>该文本仅在应用蓝色样式后显示。</div>
```

:::
