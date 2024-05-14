---
title: 预设样式
description: 你可以从配置中注入原始的 CSS 作为预设样式。解析后的主题可用于自定义 CSS。
---

# 预设样式

你可以从配置中注入原始的 CSS 作为预设样式。解析后的 `theme` 可用于自定义 CSS。

<!--eslint-skip-->

```ts
preflights: [
    {
        getCSS: ({ theme }) => `
      * {
        color: ${theme.colors.gray?.[700] ?? '#333'};
        padding: 0;
        margin: 0;
      }
    `,
    },
]
```
