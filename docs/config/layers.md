---
title: 层级
icon: ph:stack-bold
description: UnoCSS 允许您根据需要定义层级。
---

# 层级

CSS 的顺序会影响其优先级。虽然引擎会 [保持规则的顺序](/config/rules#排序)，但有时您可能希望将某些工具类分组，以显式控制它们的顺序。

## 用法

与 Tailwind CSS 固定的三个层级（`base`、`components`、`utilities`）不同，UnoCSS 允许您根据需要自定义层级。设置层级时，您可以将元数据作为规则的第三项传递：

```ts
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: 'utilities' }],
  // 当省略层级时，默认为 `default`
  ['btn', { padding: '4px' }],
]
```

这将生成：

<!-- eslint-skip -->

```css
/* layer: default */
.btn { padding: 4px; }
/* layer: utilities */
.m-2 { margin: 0.5rem; }
```

您也可以在每个预设样式中设置层级：

```ts
preflights: [
  {
    layer: 'my-layer',
    getCSS: async () => (await fetch('my-style.css')).text(),
  },
]
```

## 排序

您可以通过如下方式控制层级顺序：

<!--eslint-skip-->

```ts
layers: {
  'components': -1,
  'default': 1,
  'utilities': 2,
  'my-layer': 3,
}
```

未指定顺序的层级将按字母顺序排序。

如果您希望在层级之间插入自定义 CSS，可以更新入口模块：

```ts
// 'uno:[layer-name].css'
import 'uno:components.css'

// 非 'components' 和 'utilities' 的层级将回退到这里
import 'uno.css'

// 您自己的 CSS
import './my-custom.css'

// "utilities" 层级具有最高优先级
import 'uno:utilities.css'
```

## CSS 层叠层

可通过以下方式输出 CSS 级联层：

```ts
outputToCssLayers: true
```

并可修改 CSS 层的名称：

```ts
outputToCssLayers: {
  cssLayerName: (layer) => {
    // 默认情况下，内部层 `default` 会输出到 "utilities" CSS 层
    if (layer === 'default')
      return 'utilities'

    // "shortcuts" 层会输出到 "utilities.shortcuts" 子层
    if (layer === 'shortcuts')
      return 'utilities.shortcuts'

    // 其它层则使用其自身的名称作为 CSS 层名称
  }
}
```

## 利用变体创建层

可以使用变体来创建层。

使用 `uno-layer-<name>:` 可创建 UnoCSS 层，例如：

```html
<p class="uno-layer-my-layer:text-xl">text</p>
```

<!-- eslint-skip -->

```css
/* layer: my-layer */
.uno-layer-my-layer\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
```

使用 `layer-<name>:` 可创建 CSS 中的 `@layer`，例如：

```html
<p class="layer-my-layer:text-xl">text</p>
```

<!-- eslint-skip -->

```css
/* layer: default */
@layer my-layer { .layer-my-layer\:text-xl { font-size: 1.25rem; line-height: 1.75rem; } }
```
