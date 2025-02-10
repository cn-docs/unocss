---
title: 包管理
description: "UnoCSS 包：列出 unocss 包中包含的各个包以及内置和启用的功能。"
outline: deep
---

# 包管理

UnoCSS 是一个 monorepo 项目，包含了多个包。下表列出了所有包以及哪些包被包含在 `unocss` 包中：

| 包名称                                                               | 描述                                   | 是否包含在 `unocss` 中 | 是否启用 |
| -------------------------------------------------------------------- | -------------------------------------- | ---------------------- | -------- |
| [@unocss/core](/tools/core)                                          | 核心库，不附带预设                     | ✅                     | -        |
| [@unocss/cli](/integrations/cli)                                     | UnoCSS 的命令行工具                    | ✅                     | -        |
| [@unocss/preset-uno](/presets/uno)                                   | 默认预设                               | ✅                     | ✅       |
| [@unocss/preset-mini](/presets/mini)                                 | 最简但必备的规则和变体                 | ✅                     | ✅       |
| [@unocss/preset-wind](/presets/wind)                                 | Tailwind CSS / Windi CSS 紧凑预设      | ✅                     | ✅       |
| [@unocss/preset-attributify](/presets/attributify)                   | 为其他规则启用 Attributify 模式        | ✅                     | 否       |
| [@unocss/preset-tagify](/presets/tagify)                             | 为其他规则启用 Tagify 模式             | ✅                     | 否       |
| [@unocss/preset-icons](/presets/icons)                               | 基于 Iconify 的纯 CSS 图标解决方案     | ✅                     | 否       |
| [@unocss/preset-web-fonts](/presets/web-fonts)                       | 支持 Web 字体（如 Google Fonts 等）    | ✅                     | 否       |
| [@unocss/preset-typography](/presets/typography)                     | 排版预设                               | ✅                     | 否       |
| [@unocss/preset-rem-to-px](/presets/rem-to-px)                       | 将 rem 单位转换为 px                   | 否                     | 否       |
| [@unocss/preset-legacy-compat](/presets/legacy-compat)               | 旧版兼容实用工具集合                   | 否                     | 否       |
| [@unocss/transformer-variant-group](/transformers/variant-group)     | 支持 Windi CSS 的 variant group 转换器 | ✅                     | 否       |
| [@unocss/transformer-directives](/transformers/directives)           | 支持类似 `@apply` 的 CSS 指令转换器    | ✅                     | 否       |
| [@unocss/transformer-compile-class](/transformers/compile-class)     | 将多个类编译为一个类                   | ✅                     | 否       |
| [@unocss/transformer-attributify-jsx](/transformers/attributify-jsx) | 支持 JSX/TSX 中无值的 attributify      | ✅                     | 否       |
| [@unocss/extractor-pug](/extractors/pug)                             | Pug 模板提取器                         | 否                     | -        |
| [@unocss/extractor-svelte](/extractors/svelte)                       | Svelte 模板提取器                      | 否                     | -        |
| [@unocss/autocomplete](/tools/autocomplete)                          | 自动补全工具                           | 否                     | -        |
| [@unocss/config](/guide/config-file)                                 | 配置文件加载器                         | ✅                     | -        |
| [@unocss/reset](/guide/style-reset)                                  | 常见 CSS Reset 集合                    | ✅                     | 否       |
| [@unocss/vite](/integrations/vite)                                   | Vite 插件                              | ✅                     | -        |
| [@unocss/inspector](/tools/inspector)                                | UnoCSS 检查器 UI                       | ✅                     | -        |
| [@unocss/astro](/integrations/astro)                                 | Astro 集成插件                         | ✅                     | -        |
| [@unocss/webpack](/integrations/webpack)                             | Webpack 插件                           | 否                     | -        |
| [@unocss/nuxt](/integrations/nuxt)                                   | Nuxt 模块                              | 否                     | -        |
| [@unocss/svelte-scoped](/integrations/svelte-scoped)                 | Svelte Scoped Vite 插件 + 预处理器     | 否                     | -        |
| [@unocss/next](/integrations/next)                                   | Next.js 插件                           | 否                     | -        |
| [@unocss/runtime](/integrations/runtime)                             | UnoCSS 的 CSS-in-JS 运行时             | 否                     | -        |
| [@unocss/eslint-plugin](/integrations/eslint)                        | ESLint 插件                            | 否                     | -        |
| [@unocss/eslint-config](/integrations/eslint)                        | ESLint 配置                            | 否                     | -        |
| [@unocss/postcss](/integrations/postcss)                             | PostCSS 插件                           | 否                     | -        |
| [VS Code 扩展](/integrations/vscode)                                 | UnoCSS 的 VS Code 扩展                 | -                      | -        |
