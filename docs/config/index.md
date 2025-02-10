---
title: 配置 UnoCSS
description: 配置使 UnoCSS 功能强大。
outline: deep
---

# 配置 UnoCSS

## 配置

配置使 UnoCSS 功能强大。

- [规则](/config/rules) - 定义原子级 CSS 工具类
- [快捷方式](/config/shortcuts) - 将多个规则组合成一个快捷方式
- [主题](/config/theme) - 定义主题变量
- [变体](/config/variants) - 为规则应用自定义约定
- [提取器](/config/extractors) - 定义从何处以及如何提取工具类的使用情况
- [预设样式](/config/preflights) - 定义全局原始 CSS
- [层级](/config/layers) - 定义各工具层级的顺序
- [预设](/config/presets) - 常见用例的预设配置
- [转换器](/config/transformers) - 对用户源代码进行转换以支持约定
- [自动补全](/config/autocomplete) - 定义自定义自动补全建议

## 选项

### 规则

- **类型：** `Rule<Theme>[]`

用于生成 CSS 工具类的规则。后定义的规则具有更高优先级。

### 快捷方式

- **类型：** `UserShortcuts<Theme>`

类似于 Windi CSS 的快捷方式，允许您通过组合现有规则来创建新的工具类。后定义的规则具有更高优先级。

### 主题

- **类型：** `Theme`

在规则间共享配置的主题对象。

### extendTheme

- **类型：** `Arrayable<ThemeExtender<Theme>>`
  自定义函数可修改主题对象。

也可以返回一个新的主题对象以完全替换原始主题。

### 变体

- **类型：** `Variant<Theme>[]`

预处理选择器的变体，具有重写 CSS 对象的能力。

### 提取器

- **类型：** `Extractor[]`

用于处理源文件并提取可能的类/选择器的提取器，支持语言感知。

### 预设样式

- **类型：** `Preflight<Theme>[]`

原始 CSS 注入。

### 层级

- **类型：** `Record<string, number>`

层级顺序，默认值为 0。

### outputToCssLayers

- **类型：** `boolean | UseCssLayersOptions`
- **默认值：** `false`

将层级输出为 CSS 级联层。

#### cssLayerName

- **类型：** `(internalLayer: string) => string | undefined | null`

指定内部层级应输出到的 CSS 层名称（可为子层，例如 "mylayer.mysublayer"）。

如果返回 `undefined`，则使用内部层级名称作为 CSS 层名称。
如果返回 `null`，则内部层级不会输出到 CSS 层中。

### sortLayers

- **类型：** `(layers: string[]) => string[]`

用于自定义排序层级的函数。

### 预设

- **类型：** `(PresetOrFactory<Theme> | PresetOrFactory<Theme>[])[]`

常见用例的预定义配置。

### 转换器

- **类型：** `SourceCodeTransformer[]`

对源代码进行自定义转换的转换器。

### blocklist

- **类型：** `BlocklistRule[]`

用于排除设计系统中选择器的规则（以缩小匹配范围）。结合 `warnExcluded` 选项还可以帮助识别错误用法。

### safelist

- **类型：** `string[]`

始终包含的工具类。

### preprocess

- **类型：** `Arrayable<Preprocessor>`

预处理传入的工具类，返回假值则排除该工具。

### postprocess

- **类型：** `Arrayable<Postprocessor>`

对生成的工具对象进行后处理。

### separators

- **类型：** `Arrayable<string>`
- **默认值：** `[':', '-']`

变体分隔符。

### extractorDefault

- **类型：** `Extractor | null | false`
- **默认值：** `import('@unocss/core').defaultExtractor`

始终应用的默认提取器。默认情况下，它通过空格和引号拆分源代码。

该值可能会被预设或用户配置覆盖，默认仅存在一个默认提取器，后定义的将覆盖先前的。
传递 `null` 或 `false` 可禁用默认提取器。

### autocomplete 自动补全

自动补全的附加选项。

#### templates

- **类型：** `Arrayable<AutoCompleteFunction | AutoCompleteTemplate>`

提供自动补全建议的自定义函数/模板。

#### extractors

- **类型：** `Arrayable<AutoCompleteExtractor>`

用于提取可能的类，并将类名风格建议转换为正确格式的自定义提取器。

#### shorthands

- **类型：** `Record<string, string | string[]>`

为自动补全提供自定义快捷方式。若值为数组，则会使用 `|` 拼接并用 `()` 包裹。

### content 内容

用于提取为工具类使用的源的选项。

支持的源：

- `filesystem` - 从文件系统中提取
- `plain` - 从普通内联文本中提取
- `pipeline` - 从构建工具（如 Vite 和 Webpack）的转换管道中提取

从每个源提取的用法将被**合并**在一起。

#### 文件系统

- **类型：** `string[]`

除了其他内容源之外，用于从文件系统中提取的 glob 模式。

在开发模式下，这些文件会被监视并触发 HMR。

#### 内联

- **类型：** `string | { code: string; id?: string } | (() => Awaitable<string | { code: string; id?: string }>)[]`

要提取的内联文本。

#### pipeline 管道

用于确定是否从构建工具的转换管道中提取特定模块的过滤器。

目前仅适用于 Vite 和 Webpack 集成。

设置为 `false` 可禁用。

##### include 包含规则

- **类型：** `FilterPattern`
- **默认值：** `[/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]`

用于过滤被提取文件的模式，支持正则表达式和 `picomatch` glob 模式。

##### exclude 排除规则

- **类型：** `FilterPattern`
- **默认值：** `[/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/]`

用于过滤不被提取文件的模式，支持正则表达式和 `picomatch` glob 模式。

默认情况下，`node_modules` 和 `dist` 下的文件也会被提取。

### configResolved

- **类型：** `(config: ResolvedConfig) => void`

用于修改解析后配置的钩子函数。预设最先运行，然后是用户配置。

### configFile

- **类型：** `string | false`

从配置文件加载配置。
设置为 `false` 可禁用。

### configDeps

- **类型：** `string[]`

同时会触发配置重载的文件列表。

### cli

UnoCSS CLI 选项。

#### entry 入口

- **类型：** `Arrayable<CliEntryItem>`

UnoCSS CLI 的入口点。

##### patterns 模式

- **类型：** `string[]`

用于从文件系统中提取的 glob 模式。

##### outFile 输出文件

- **类型：** `string`

输出文件路径。

### shortcutsLayer

- **类型：** `string`
- **默认值：** `'shortcuts'`

快捷方式的层级名称。

### envMode

- **类型：** `'dev' | 'build'`
- **默认值：** `'build'`

运行环境模式。

### details

- **类型：** `boolean`

暴露内部细节以便调试或检查。

### warn 警告

- **类型：** `boolean`
- **默认值：** `true`

当匹配到的选择器出现在屏蔽列表中时会触发警告。
