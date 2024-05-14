---
title: Core
description: UnoCSS 的核心引擎，没有任何预设。可以用作您自己原子 CSS 框架的引擎。
---

# Core

UnoCSS 的核心引擎，没有任何预设：`@unocss/core`。可以用作您自己原子 CSS 框架的引擎。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/core
  ```
  ```bash [yarn]
  yarn add -D @unocss/core
  ```
  ```bash [npm]
  npm install -D @unocss/core
  ```
:::

## 用法

```ts
import { createGenerator } from '@unocss/core'

const generator = createGenerator(
  { /* 用户选项 */ },
  { /* 默认选项 */ }
)

const { css } = await generator.generate(code)
```

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
