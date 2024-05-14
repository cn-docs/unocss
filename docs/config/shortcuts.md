---
title: 快捷方式
description: UnoCSS 提供的快捷方式功能类似于 Windi CSS 的功能。
---

# 快捷方式

快捷方式允许您将多个规则组合成单个简写，灵感来自于 [Windi CSS](https://windicss.org/features/shortcuts.html)。

## 使用方法

<!--eslint-skip-->

```ts
shortcuts: {
  // 快捷方式到多个实用程序
  'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  // 单个实用程序别名
  'red': 'text-red-100',
}
```

除了简单的映射之外，UnoCSS 还允许您定义动态快捷方式。

类似于 [规则](/config/rules)，动态快捷方式是匹配器 `RegExp` 和处理程序函数的组合。

```ts
shortcuts: [
  // 你仍然可以使用对象样式
  {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
  },
  // 动态快捷方式
  [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
]
```

通过这种方式，我们可以使用 `btn-green` 和 `btn-red` 来生成以下 CSS：

```css
.btn-green {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgb(220 252 231 / var(--un-text-opacity));
}
.btn-red {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgb(254 226 226 / var(--un-text-opacity));
}
```
