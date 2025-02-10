---
title: 核心
description: UnoCSS 的核心引擎，不包含任何预设。它可以作为你自己原子 CSS 框架的引擎使用。
---

# 核心

UnoCSS 的核心引擎（无预设）：`@unocss/core`。它可以作为你自己原子 CSS 框架的引擎使用。

## 安装

::: code-group

```bash
pnpm add -D @unocss/core
```

```bash
yarn add -D @unocss/core
```

```bash
npm install -D @unocss/core
```

:::

## 使用

```ts
import { createGenerator } from '@unocss/core'

const generator = await createGenerator(
  { /* 用户选项 */ },
  { /* 默认选项 */ }
)

const { css } = await generator.generate(code)
```

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
