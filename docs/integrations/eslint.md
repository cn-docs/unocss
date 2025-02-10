---
title: UnoCSS ESLint 配置
description: UnoCSS 的 ESLint 配置（@unocss/eslint-config）。
---

# ESLint 配置

UnoCSS 提供的 ESLint 配置：`@unocss/eslint-config`。

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

在 [Flat Config Style](https://eslint.org/docs/latest/use/configure/configuration-files-new) 中配置如下：

```js [eslint.config.js]
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
// 其他配置
]
```

在传统的 `.eslintrc` 格式中：

```json [.eslintrc]
{
  "extends": [
    "@unocss"
  ]
}
```

## 规则

- `@unocss/order` - 强制工具类选择器的特定排序。
- `@unocss/order-attributify` - 强制 attributify 选择器的排序。
- `@unocss/blocklist` - 禁止使用特定的工具类（可选）。
- `@unocss/enforce-class-compile` - 强制工具类编译（可选）。

### 可选规则

这些规则默认不启用。启用方法如下：

```json [.eslintrc]
{
  "extends": [
    "@unocss"
  ],
  "rules": {
    "@unocss/<rule-name>": "warn", // 或 "error"
    "@unocss/<another-rule-name>": ["warn" /* 或 "error" */, { /* 配置选项 */ }]
  }
}
```

#### `@unocss/blocklist`

当使用被 `blocklist` 匹配的工具类时，会报出警告或错误。你可以通过 meta 对象的 `message` 属性自定义提示信息，例如：

```ts [unocss.config.ts]
export default defineConfig({
  blocklist: [
    ['bg-red-500', { message: '请使用 bg-red-600 替换' }],
    [/-auto$/, { message: s => `请将 ${s.replace(/-auto$/, '-a')} 替换使用` }],
  ],
})
```

#### `@unocss/enforce-class-compile` :wrench:

_该规则配合 [compile class transformer](https://unocss.dev/transformers/compile-class) 使用。_

若工具类的 class 属性或指令不以 `:uno:` 开头，则会报出警告或错误。

该规则会自动为所有工具类前缀添加 `:uno:`。

可选项：

- `prefix` (字符串)：可与 [自定义前缀](https://github.com/unocss/unocss/blob/main/packages-presets/transformer-compile-class/src/index.ts#L34) 配合使用。默认值为 `:uno:`
- `enableFix` (布尔值)：用于渐进式迁移，默认值为 `true`

**注意**：目前该规则仅支持 Vue。如果需要在 JSX 中使用，请提交 PR；若在 Svelte 中需要此功能，请考虑 [svelte-scoped](https://unocss.dev/integrations/svelte-scoped) 模式。
