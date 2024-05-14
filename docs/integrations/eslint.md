---
title: UnoCSS ESLint 配置
description: UnoCSS 的 ESLint 配置 (@unocss/eslint-config)。
---

# ESLint 配置

UnoCSS 的 ESLint 配置：`@unocss/eslint-config`。

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/eslint-config
  ```
  ```bash [yarn]
  yarn add -D @unocss/eslint-config
  ```
  ```bash [npm]
  npm install -D @unocss/eslint-config
  ```
:::

使用 [扁平配置样式](https://eslint.org/docs/latest/use/configure/configuration-files-new)：

```js
// eslint.config.js
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
  // 其他配置
]
```

在传统的 `.eslintrc` 样式中：

```json
{
  "extends": [
    "@unocss"
  ]
}
```

## 规则

- `@unocss/order` - 强制类选择器的特定顺序。
- `@unocss/order-attributify` - 强制属性化选择器的特定顺序。
- `@unocss/blocklist` - 禁止特定的类选择器 [可选]。
- `@unocss/enforce-class-compile` - 强制编译类 [可选]。

### 可选规则

这些规则默认不启用。要启用它们，请在你的 `.eslintrc` 中添加以下内容：

```json
{
  "extends": [
    "@unocss"
  ],
  "rules": {
    "@unocss/<rule-name>": "warn", // 或 "error",
    "@unocss/<another-rule-name>": ["warn" /* 或 "error" */, { /* 选项 */ }]
  }
}
```

#### `@unocss/blocklist`

在使用列在 `blocklist` 中的工具类时抛出警告或错误。

#### `@unocss/enforce-class-compile` :wrench:

_该规则旨在与 [编译类转换器](https://unocss.dev/transformers/compile-class) 结合使用。_

当 class 属性或指令不以 `:uno:` 开头时抛出警告或错误。

:wrench: 自动为所有类属性和指令添加前缀 `:uno:`。

选项：

- `prefix` (字符串) - 可与 [自定义前缀](https://github.com/unocss/unocss/blob/main/packages/transformer-compile-class/src/index.ts#L34) 结合使用。默认值：`:uno:`
- `enableFix` (布尔值) - 当设为 `false` 时，可用于逐步迁移。默认值：`true`

**注意**：目前仅支持 Vue。如果你需要在 JSX 中使用，_欢迎贡献 PR_。如果你在寻找 Svelte 中的此功能，你可能需要 [`svelte-scoped`](https://unocss.dev/integrations/svelte-scoped) 模式。

## 先例艺术

感谢由 [@devunt](https://github.com/devunt) 创建的 [eslint-plugin-unocss](https://github.com/devunt/eslint-plugin-unocss)。
