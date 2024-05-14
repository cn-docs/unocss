---
title: UnoCSS CDN 运行时
description: UnoCSS 的 CSS-in-JS 运行时 (@unocss/runtime)。
outline: deep
---

# 运行时

UnoCSS 运行时提供了一个可以在浏览器中直接运行 UnoCSS 的 CDN 构建。它将检测 DOM 变化并即时生成样式。

## 使用方法

在你的 `index.html` 中添加以下行：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

可以通过在加载运行时之前定义配置来配置运行时：

```html
<!-- 定义 unocss 选项... -->
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
<!-- ... 然后加载运行时 -->
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

默认情况下，将应用 [Uno 预设](/presets/uno)。

运行时不包括预设样式重置，如果你想要样式重置，你可以添加自己的样式重置，或者使用来自 [重置包](/guide/style-reset) 的重置样式。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/normalize.min.css">
<!-- 或者 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css">
```

## 构建版本

有几种构建版本适用于不同的使用场景。

### Uno（默认）

使用 `@unocss/preset-uno` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js"></script>
```

### Attributify

使用 `@unocss/preset-uno` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js"></script>
```

### Mini

使用 `@unocss/preset-mini` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/mini.global.js"></script>
```

### Core

如果你需要混合匹配预设，你可以只加载核心运行时并手动指定预设。所有来自 UnoCSS 的[官方预设](/presets/#预设)都可用。在初始化核心运行时之前加载你需要的预设。

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-icons.global.js"></script>
<script>
  window.__unocss = {
    presets: [
      () => window.__unocss_runtime.presets.presetIcons({
        scale: 1.2,
        cdn: 'https://esm.sh/'
      }),
    ],
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/core.global.js"></script>
```

## 打包器使用

```bash
npm i @unocss/runtime
```

```ts
import initUnocssRuntime from '@unocss/runtime'

initUnocssRuntime({ /* 选项 */ })
```

## 防止 FOUC

由于 UnoCSS 在 DOM 准备就绪后运行，可能会出现“未样式内容的闪烁”(FOUC)，这可能导致用户看到未样式化的页面。

使用 `un-cloak` 属性和诸如 `[un-cloak] { display: none }` 的 CSS 规则来隐藏未样式化的元素，直到 UnoCSS 为其应用样式。

::: code-group
  ```css
  [un-cloak] {
    display: none;
  }
  ```
  ```html
  <div class="text-blue-500" un-cloak>
    这段文字只有在变成蓝色后才可见。
  </div>
  ```
:::
