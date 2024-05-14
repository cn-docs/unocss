---
title: 层级
icon: ph:stack-bold
description: UnoCSS 允许您根据需要定义层级。
---

# 层级

CSS 的顺序会影响它们的优先级。虽然引擎会[保持规则的顺序](/config/rules#排序)，但有时您可能希望将一些工具类分组以显式控制它们的顺序。

## 用法

与 Tailwind CSS 提供的三个固定层级（`base`、`components`、`utilities`）不同，UnoCSS 允许您根据需要定义层级。要设置层级，您可以将元数据作为规则的第三项传递：

```ts
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: 'utilities' }],
  // 当您省略层级时，它将是 `default`
  ['btn', { padding: '4px' }],
]
```

这将生成：

```css
/* layer: default */
.btn { padding: 4px; }
/* layer: utilities */
.m-2 { margin: 0.5rem; }
```

也可以在每个预设样式上设置层级：

```ts
preflights: [
  {
    layer: 'my-layer',
    getCSS: async () => (await fetch('my-style.css')).text(),
  },
]
```

## 排序

您可以通过以下方式控制层级顺序：

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

当您希望在层级之间加入自定义 CSS 时，可以更新您的入口模块：

```ts
// 'uno:[layer-name].css'
import 'uno:components.css'

// 非 'components' 和 'utilities' 的层级将回退到这里
import 'uno.css'

// 您自己的 CSS
import './my-custom.css'

// "utilities" 层级将具有最高优先级
import 'uno:utilities.css'
```

## CSS 层叠层

您可以通过以下方式输出 CSS 层叠层：

```ts
outputToCssLayers: true
```

您可以通过以下方式更改 CSS 层的名称：

```ts
outputToCssLayers: (layer) => {
  // 默认层将输出到 "utilities" CSS 层。
  if (layer === 'default')
    return 'utilities'

  // 快捷方式层将输出到 "utilities" CSS 层的 "shortcuts" 子层。
  if (layer === 'shortcuts')
    return 'utilities.shortcuts'

  // 所有其他层将使用它们的名称作为 CSS 层的名称。
}
```
