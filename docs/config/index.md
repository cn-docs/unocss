---
title: 配置 UnoCSS
description: 配置使 UnoCSS 强大。
outline: deep
---

# 配置 UnoCSS

## 配置
配置使 UnoCSS 强大。

- [规则](/config/rules) - 定义原子 CSS 工具类
- [快捷方式](/config/shortcuts) - 将多个规则组合成一个简写。
- [主题](/config/theme) - 定义主题变量。
- [变体](/config/variants) - 对规则应用自定义约定。
- [提取器](/config/extractors) - 定义从何处以及如何提取工具类的使用。
- [预设样式](/config/preflights) - 定义全局的原始 CSS。
- [层级](/config/layers) - 定义每个工具类层的顺序。
- [预设](/config/presets) - 常见用例的预定义配置。
- [变换器](/config/transformers) - 对用户源代码进行代码变换以支持约定。
- [自动补全](/config/autocomplete) - 定义自定义的自动补全建议。

## 选项

### 规则
- **类型:** `Rule<Theme>[]`

用于生成 CSS 工具类的规则。后面的条目优先级更高。

### 快捷方式

- **类型:** `UserShortcuts<Theme>`

类似于 Windi CSS 的快捷方式，允许通过组合现有工具类创建新工具类。后面的条目优先级更高。

### 主题
- **类型:** `Theme`

规则之间共享配置的主题对象。

### extendTheme

- **类型:** `Arrayable<ThemeExtender<Theme>>`
  自定义函数修改主题对象。

也可以返回一个新的主题对象以完全替换原来的。

### 变体

- **类型:** `Variant<Theme>[]`

预处理选择器的变体，能够重写 CSS 对象。

### 提取器

- **类型:** `Extractor[]`

处理源文件并输出可能的类/选择器的提取器。可以语言敏感。

### 预设样式
- **类型:** `Preflight<Theme>[]`

原始 CSS 注入。

### 层级
- **类型:** `Record<string, number>`

层级顺序。默认是 0。

### outputToCssLayers
- **类型:** `boolean | UseCssLayersOptions`
- **默认值:** `false`

将层输出到 CSS 层叠层。

#### cssLayerName
- **类型:** `(internalLayer: string) => string | undefined | null`

指定内部层应输出到的 CSS 层的名称（可以是子层，例如 "mylayer.mysublayer"）。

如果返回 `undefined`，将使用内部层名称作为 CSS 层名称。
如果返回 `null`，内部层不会输出到 CSS 层。

### sortLayers
- **类型:** `(layers: string[]) => string[]`

自定义函数来排序层。

### 预设

- **类型:** `(PresetOrFactory<Theme> | PresetOrFactory<Theme>[])[]`

常见用例的预定义配置。

### 变换器
- **类型:** `SourceCodeTransformer[]`

对源代码进行自定义变换。

### blocklist

- **类型:** `BlocklistRule[]`

用于排除设计系统中的选择器的规则（以缩小可能性）。结合 `warnExcluded` 选项还可以帮助您识别错误的用法。

### safelist

- **类型:** `string[]`

始终包含的工具类。

### 预处理

- **类型:** `Arrayable<Preprocessor>`

预处理传入的工具类，返回假值以排除。

### 后处理

- **类型:** `Arrayable<Postprocessor>`

后处理生成的工具类对象。

### 分隔符

- **类型:** `Arrayable<string>`
- **默认值:** `[':', '-']`

变体分隔符。

### 默认提取器
- **类型:** `Extractor | null | false`
- **默认值:** `import('@unocss/core').defaultExtractor`

始终应用的默认提取器。默认情况下，它通过空格和引号拆分源代码。

它可能会被预设或用户配置替换，只能存在一个默认提取器，后面的将覆盖前面的。

传递 `null` 或 `false` 以禁用默认提取器。

### 自动补全

自动补全的其他选项。

#### 模板

- **类型:** `Arrayable<AutoCompleteFunction | AutoCompleteTemplate>`

提供自动补全建议的自定义函数/模板。

#### 提取器

- **类型:** `Arrayable<AutoCompleteExtractor>`

自定义提取器以提取可能的类并将类名样式建议转换为正确的格式。

#### 简写

- **类型:** `Record<string, string | string[]>`

提供自动补全建议的自定义简写。如果值是一个数组，它将用 `|` 连接并用 `()` 包裹。

### 内容

用于提取工具类用法的来源选项。

支持的来源：
- `filesystem` - 从文件系统提取
- `plain` - 从纯内联文本提取
- `pipeline` - 从构建工具的转换管道中提取，例如 Vite 和 Webpack

从每个来源提取的用法将 **合并** 在一起。

#### 文件系统

- **类型:** `string[]`
- **默认值:** `[]`

从文件系统提取的全局模式，除了其他内容来源外。

在开发模式下，这些文件将被监视并触发 HMR。

#### 内联

- **类型:** `string | { code: string; id?: string } | (() => Awaitable<string | { code: string; id?: string }>)) []`

要提取的内联文本。

#### 管道

过滤器以确定是否从构建工具的转换管道中提取某些模块。

目前仅适用于 Vite 和 Webpack 集成。

设置 `false` 以禁用。

##### 包含

- **类型:** `FilterPattern`
- **默认值:** `[/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]`

过滤被提取文件的模式。支持正则表达式和 `picomatch` 全局模式。

默认情况下，不提取 `.ts` 和 `.js` 文件。

##### 排除

- **类型:** `FilterPattern`
- **默认值:** `[/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/]`

过滤不被提取文件的模式。支持正则表达式和 `picomatch` 全局模式。

默认情况下，还提取 `node_modules` 和 `dist`。

### configResolved

- **类型:** `(config: ResolvedConfig) => void`

修改解析后的配置的钩子。

首先运行预设，然后是用户配置。

### 配置文件

- **类型:** `string | false`

从配置文件加载。

设置 `false` 以禁用。

### 配置依赖

- **类型:** `string[]`

触发配置重新加载的文件列表。

### CLI
UnoCSS CLI 选项。

#### 入口
- **类型:** `Arrayable<CliEntryItem>`

UnoCSS CLI 入口点。

##### 模式
- **类型:** `string[]`

从文件系统提取的全局模式。

##### 输出文件
- **类型:** `string`

输出文件路径。

### shortcutsLayer

- **类型:** `string`
- **默认值:** `'shortcuts'`

快捷方式的布局名称。

### 环境模式

- **类型:** `'dev' | 'build'`
- **默认值:** `'build'`

环境模式。

### 细节

- **类型:** `boolean`

暴露内部细节以进行调试/检查。

### 警告

- **类型:** `boolean`
- **默认值:** `true`

在 blocklist 中存在匹配选择器时发出警告。
