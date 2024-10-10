---
title: UnoCSS 命令行工具
description: UnoCSS 的命令行界面 (@unocss/cli)。
---

# 命令行界面

UnoCSS 的命令行界面：`@unocss/cli`。

- 🍱 适用于传统后端，如 Laravel 或 Kirby
- 👀 包含[观察模式](#development)
- 🔌 支持通过 [`uno.config.ts`](#configurations) 自定义配置

## 安装

此包与 `unocss` 包一起提供：

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
如果你找不到二进制文件（例如，使用 `pnpm` 并且只安装了 `unocss`），你需要显式安装 `@unocss/cli` 独立包。
:::

## 使用方法

你也可以向 `@unocss/cli` 传递多个 glob 模式：

```bash
unocss "site/snippets/**/*.php" "site/templates/**/*.php"
```

示例包配置：

::: info
确保在 npm 脚本的 glob 模式中添加转义引号。
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

### 开发

添加 `--watch`（或 `-w`）标志以启用文件变更监听：

```bash
unocss "site/{snippets,templates}/**/*.php" --watch
```

### 生产环境

```bash
unocss "site/{snippets,templates}/**/*.php"
```

最终的 `uno.css` 默认将生成到当前目录。

## 内置功能

### 配置

在项目的根级别创建 `uno.config.js` 或 `uno.config.ts` 配置文件，以自定义 UnoCSS。

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
   * 匹配文件的 Glob 模式
   */
  patterns: string[]
  /**
   * 生成的 UnoCSS 文件的输出文件名
   */
  outFile: string
}
```

有关选项列表，请前往 [UnoCSS 配置](/config/) 文档。

## 选项

| 选项                       |               |
| ------------------------ | ------------- |
| `-v, --version`           | 显示 UnoCSS 的当前版本 |
| `-c, --config-file <file>`| 配置文件 |
| `-o, --out-file <file>`    | 生成的 UnoCSS 文件的输出文件名，默认为当前工作目录下的 `uno.css` |
| `--stdout`                | 将生成的 UnoCSS 文件写入 STDOUT。这将使 `--watch` 和 `--out-file` 被忽略 |
| `-w, --watch`             | 表示是否应监视由 glob 模式找到的文件 |
| `--preflights`            | 启用预飞行样式 |
| `--write-transformed`     | 使用转换后的工具更新源文件 |
| `-m, --minify`            | 压缩生成的 CSS |
| `-h, --help`              | 显示可用的 CLI 选项 |
