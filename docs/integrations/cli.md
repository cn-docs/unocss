---
title: UnoCSS CLI
description: UnoCSS 的命令行工具（@unocss/cli）。
---

# CLI

UnoCSS 的命令行工具：`@unocss/cli`。

- 🍱 适用于传统后端（如 Laravel 或 Kirby）
- 👀 内置[监视模式](#development)
- 🔌 支持通过 [`uno.config.ts`](#configurations) 进行自定义配置

## 安装

该包默认随 `unocss` 一起发布：

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

:::

你也可以安装独立包：

::: code-group

```bash [pnpm]
pnpm add -D @unocss/cli
```

```bash [yarn]
yarn add -D @unocss/cli
```

```bash [npm]
npm install -D @unocss/cli
```

:::

::: info
如果找不到可执行文件（例如，使用 pnpm 只安装了 `unocss`），请显式安装 `@unocss/cli` 独立包。
:::

## 用法

你可以为 `@unocss/cli` 传入多个 glob 模式：

```bash
unocss "site/snippets/**/\*.php" "site/templates/**/\*.php"
```

例如，在 package.json 中的配置：

::: info
请确保在 npm 脚本中的 glob 模式引号使用转义字符。
:::

```json [package.json]
{
  "scripts": {
    "dev": "unocss \"site/{snippets,templates}/**/*.php\" --watch",
    "build": "unocss \"site/{snippets,templates}/**/*.php\""
  },
  "devDependencies": {
    "@unocss/cli": "latest"
  }
}
```

### 开发模式

添加 `--watch`（或 `-w`）参数以开启文件变更监视：

```bash
unocss "site/{snippets,templates}/\*_/_.php" --watch
```

### 生产模式

```bash
unocss "site/{snippets,templates}/\*_/_.php"
```

默认情况下，最终生成的 `uno.css` 文件输出到当前目录。

## 内置特性

### 配置

在项目根目录下创建 `uno.config.js` 或 `uno.config.ts` 文件来自定义 UnoCSS：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  cli: {
    entry: {}, // CliEntryItem | CliEntryItem[]
  },
// ...
})

interface CliEntryItem {
  /**
   * Glob patterns to match files
   */
  patterns: string[]
  /**
   * The output filename for the generated UnoCSS file
   */
  outFile: string
}
```

有关更多配置选项，请参阅 [UnoCSS 配置](/config/) 文档。

## 选项

| 选项                       | 描述                                                                    |
| -------------------------- | ----------------------------------------------------------------------- |
| `-v, --version`            | 显示当前 UnoCSS 版本                                                    |
| `-c, --config-file <file>` | 指定配置文件                                                            |
| `-o, --out-file <file>`    | 生成的 UnoCSS 文件输出文件名，默认为当前工作目录中的 `uno.css`          |
| `--stdout`                 | 将生成的 UnoCSS 文件输出到 STDOUT，会导致忽略 `--watch` 和 `--out-file` |
| `-w, --watch`              | 开启文件监视，用于检测 glob 模式匹配到的文件                            |
| `--preflights`             | 启用预设样式                                                            |
| `--write-transformed`      | 将转换后的工具类写回到源文件中                                          |
| `-m, --minify`             | 压缩生成的 CSS                                                          |
| `-h, --help`               | 显示可用 CLI 选项                                                       |
