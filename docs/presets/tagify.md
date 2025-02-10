---
title: Tagify 预设
description: 为 UnoCSS 提供 Tagify 模式的预设 (@unocss/preset-tagify)。
outline: deep
---

# Tagify 预设

当你只需要将单一 UnoCSS 规则应用于某个元素时，此预设非常有用。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-tagify
```

```bash [yarn]
yarn add -D @unocss/preset-tagify
```

```bash [npm]
npm install -D @unocss/preset-tagify
```

:::

```ts [uno.config.ts]
import presetTagify from '@unocss/preset-tagify'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetTagify({ /* 选项 */ }),
    // ...其他预设
  ],
})
```

## Tagify 模式

当你只需将单一 UnoCSS 规则应用于一个元素时，此预设非常方便。

例如：

```html
<span class="text-red">红色文字</span>
<div class="flex">flex 布局</div>
我今天感觉 <span class="i-line-md-emoji-grin"></span> 特别好！
```

使用 Tagify 模式，你可以将 CSS 样式直接嵌入 HTML 标签中：

```html
<text-red>红色文字</text-red>
<flex>flex 布局</flex>
我今天感觉 <i-line-md-emoji-grin /> 特别好！
```

以上 HTML 与传统使用方式完全一致。

## 带前缀使用

```js
presetTagify({
  prefix: 'un-'
})
```

```html
<!-- 这将会被匹配 -->
<un-flex> </un-flex>
<!-- 这将不会被匹配 -->
<flex> </flex>
```

## 附加属性

你可以为匹配的规则添加额外的 CSS 属性：

```js
presetTagify({
  // 为匹配的图标添加 display: inline-block
  extraProperties: matched => matched.startsWith('i-')
    ? { display: 'inline-block' }
    : { }
})
```

```js
presetTagify({
  // extraProperties 也可以是一个简单对象
  extraProperties: { display: 'block' }
})
```

## 选项

### prefix

- **类型:** `string`

用于 Tagify 模式的前缀。

### excludedTags

- **类型:** `string[] | RegExp[]`
- **默认值:** `['b', /^h\d+$/, 'table']`

不进行处理的标签列表。

### extraProperties

- **类型:** `Record<string, string> | ((matched: string) => Partial<Record<string, string>>)`

为匹配规则添加额外 CSS 属性。

### defaultExtractor

- **类型:** `boolean`
- **默认值:** `true`

启用默认提取器。
