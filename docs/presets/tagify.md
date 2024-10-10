---
title: Tagify 预设
description: 为 UnoCSS 启用 Tagify 模式 (@unocss/preset-tagify)。
outline: deep
---

# Tagify 预设

此预设为其他预设启用了 [Tagify 模式](#tagify-模式)。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-tagify)

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
    presetTagify({ /* options */ }),
    // ...other presets
  ],
})
```

## Tagify 模式

当您只需要将单个 unocss 规则应用于元素时，此预设会非常有用。

```html
<span class="text-red"> 红色文本 </span>
<div class="flex"> 弹性盒 </div>
今天我感觉 <span class="i-line-md-emoji-grin"></span>！
```

使用 Tagify 模式，您可以将 CSS 样式嵌入到 HTML 标签中：

```html
<text-red> 红色文本 </text-red>
<flex> 弹性盒 </flex>
今天我感觉 <i-line-md-emoji-grin />！
```

上面的 HTML 就像您期望的那样工作。

## 使用前缀

```js
presetTagify({
  prefix: 'un-'
})
```

```html
<!-- 这将被匹配 -->
<un-flex> </un-flex>
<!-- 这不会被匹配 -->
<flex> </flex>
```

## 额外属性

您可以向匹配的规则注入额外的属性：

```js
presetTagify({
  // 将 display: inline-block 添加到匹配的图标
  extraProperties: matched => matched.startsWith('i-')
    ? { display: 'inline-block' }
    : { }
})
```

```js
presetTagify({
  // extraProperties 也可以是普通对象
  extraProperties: { display: 'block' }
})
```

## 选项

### prefix
- **类型：** `string`

要用于 Tagify 变体的前缀。

### excludedTags
- **类型：** `string[] | RegExp[]`
- **默认值：** `['b', /^h\d+$/, 'table']`

不进行处理的标签。

### extraProperties
- **类型：** `Record<string, string> | ((matched: string) => Partial<Record<string, string>>)`

要应用于匹配规则的额外 CSS 属性。

### defaultExtractor
- **类型：** `boolean`
- **默认值：** `true`

启用默认提取器。
