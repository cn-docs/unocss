---
title: 指南
description: UnoCSS 入门
---

## 什么是 UnoCSS？

UnoCSS 是即时原子 CSS 引擎，旨在灵活和可扩展。核心是不带偏见的，所有的 CSS 实用工具都是通过预设提供的。

例如，您可以通过在本地 [配置文件](/guide/config-file) 中提供规则来定义自定义 CSS 实用工具。

```ts
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

这将在您的项目中添加一个新的 CSS 实用工具 `m-1`。由于 UnoCSS 是按需的，在您的代码库中使用它之前它不会起作用。所以假设我们有这样一个组件：

```html
<div class="m-1">Hello</div>
```

`m-1` 将被检测到，并生成以下 CSS：

```css
.m-1 { margin: 1px; }
```

为了使它更灵活，您可以通过将规则的第一个参数（我们称之为匹配器）更改为 `RegExp`，并将主体更改为函数来使您的规则动态化，例如：

```diff
// uno.config.ts
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }],
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

通过这样做，现在您可以拥有任意的边距实用工具，例如 `m-1`、`m-100` 或 `m-52.43`。再次强调，UnoCSS 只有在您使用它们时才会生成它们。

```html
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

```css
.m-1 { margin: 1px; }
.m-7.5 { margin: 7.5px; }
```

## 预设

一旦您制定了几条规则，就可以将它们提取到一个预设中，并与他人共享。例如，您可以为公司的设计系统创建一个预设，并与团队共享。

```ts
// my-preset.ts
import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
  variants: [/* ... */],
  shortcuts: [/* ... */],
  // ...
}
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset, // 您自己的预设
  ],
})
```

类似地，我们提供了一些[官方预设](/presets/)供您立即使用，您还可以找到许多有趣的[社区预设](/presets/community)。

## 尝试

您可以在浏览器中尝试 UnoCSS，打开 <a href="/play/" target="_blank">Playground</a>。或在 <a href="/interactive/" target="_blank">交互文档</a> 中查找默认预设的实用工具。

## 集成

UnoCSS 提供了各种框架/工具的集成：

<ContentIntegrations />

## 示例

所有示例的源代码都可以在 [/examples](https://github.com/unocss/unocss/tree/main/examples) 目录中找到。

<ContentExamples/>
