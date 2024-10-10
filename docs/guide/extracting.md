---
outline: deep
---

# 提取

UnoCSS 通过搜索您的代码库中的工具类用法并根据需要生成相应的 CSS 来工作。我们称这个过程为**提取**。

## 内容来源

UnoCSS 支持从多个来源提取实用程序用法：

- [Pipeline](#从构建工具管道中提取) - 从您的构建工具管道中提取
- [文件系统](#从文件系统中提取) - 通过读取和监视文件从文件系统中提取
- [内联](#从内联文本中提取) - 从内联纯文本中提取

来自不同来源的实用程序用法将合并在一起，并生成最终的 CSS。

### 从构建工具管道中提取

这在 [Vite](/integrations/vite) 和 [Webpack](/integrations/webpack) 集成中受支持。

UnoCSS 将读取通过您的构建工具管道的内容，并从中提取实用程序用法。这是最有效和准确的提取方式，因为我们只提取实际在您的应用程序中使用的用法，而无需在提取过程中进行额外的文件 I/O。

默认情况下，UnoCSS 将从您的构建管道中的文件中提取实用程序用法，后缀为 `.jsx`, `.tsx`, `.vue`, `.md`, `.html`, `.svelte`, `.astro` 的文件，然后根据需要生成适当的 CSS。默认情况下**不包含**`.js`和`.ts`文件。

要配置它们，您可以更新您的 `uno.config.ts`：

```ts [uno.config.ts]
export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包括 js/ts 文件
        'src/**/*.{js,ts}',
      ],
      // 排除文件
      // exclude: []
    },
  },
})
```

您还可以添加 `@unocss-include` 魔术注释，基于文件的基础，放置在您想要 UnoCSS 扫描的文件的任何位置。如果需要扫描 `*.js` 或 `*.ts` 文件，请在配置中将它们包含为扫描目标。

```ts
// ./some-utils.js

// 由于 `.js` 文件默认不包括在内，
// 下面的注释告诉 UnoCSS 强制扫描此文件。
// @unocss-include
export const classes = {
  active: 'bg-primary text-white',
  inactive: 'bg-gray-200 text-gray-500',
}
```

类似地，您还可以添加 `@unocss-ignore` 来绕过扫描和转换整个文件。

如果您希望 UnoCSS 在提取文件时跳过一段代码块，而不是在任何提取文件中提取它，请使用成对的 `@unocss-skip-start` `@unocss-skip-end`。请注意，它必须**成对**使用才能生效。

```html
<p class="text-green text-xl">
  绿色大
</p>

<!-- @unocss-skip-start -->
<!-- `text-red` 将不会被提取 -->
<p class="text-red">
  红色
</p>
<!-- @unocss-skip-end -->
```

### 从文件系统中提取

在您使用无法访问构建工具管道的集成（例如 [PostCSS](/integrations/postcss) 插件）的情况下，或者您正在与后端框架集成以使代码不通过管道，您可以手动指定要提取的文件。

```ts [uno.config.ts]
export default defineConfig({
  content: {
    filesystem: [
      'src/**/*.php',
      'public/*.html',
    ],
  },
})
```

匹配的文件将直接从文件系统中读取，并在开发模式下监视更改。

### 从内联文本中提取

此外，您还可以从内联文本中提取实用程序用法，这些文本可能来自其他地方。

您还可以传递一个异步函数来返回内容。但是请注意，此函数仅在构建时调用一次。

```ts [uno.config.ts]
export default defineConfig({
  content: {
    inline: [
      // 纯文本
      '<div class="p-4 text-red">一些文本</div>',
      // 异步获取器
      async () => {
        const response = await fetch('https://example.com')
        return response.text()
      },
    ],
  },
})
```

## 限制

由于 UnoCSS 是在**构建时**工作的，这意味着只有静态呈现的实用程序将被生成并发送到您的应用程序。动态使用或在运行时从外部资源获取的实用程序可能 **无法** 被检测或应用。

### 白名单

有时您可能希望使用动态连接，例如：

```html
<div class="p-${size}"></div> <!-- 这不起作用！ -->
```

由于 UnoCSS 在构建时使用静态提取工作，因此在编译时它无法知道所有实用程序的组合。为此，您可以配置 `safelist` 选项。

```ts [uno.config.ts]
safelist: 'p-1 p-2 p-3 p-4'.split(' ')
```

将始终生成相应的 CSS：

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.

75rem; }
.p-4 { padding: 1rem; }
```

或者更灵活：

```ts [uno.config.ts]
safelist: [
  ...Array.from({ length: 4 }, (_, i) => `p-${i + 1}`),
]
```

如果您正在寻找真正的运行时动态生成，您可能希望查看 [@unocss/runtime](/integrations/runtime) 包。

### 静态列表组合

解决动态构建实用程序的限制的另一种方法是使用对象，以静态方式列出所有组合。例如，如果您希望有这个：

```html
<div class="text-${color} border-${color}"></div> <!-- 这不起作用！ -->
```

您可以创建一个对象，列出所有组合（假设您知道要使用的 `color` 的所有可能值）

```ts
// 由于它们是静态的，UnoCSS 将能够在构建时提取它们
const classes = {
  red: 'text-red border-red',
  green: 'text-green border-green',
  blue: 'text-blue border-blue',
}
```

然后在您的模板中使用它：

```html
<div class="${classes[color]}"></div>
```

### 屏蔽列表

与 `safelist` 类似，您还可以配置 `blocklist` 来排除一些实用程序不生成。这对于排除一些提取误报非常有用。与 `safelist` 不同，`blocklist` 同时接受字符串进行精确匹配和正则表达式进行模式匹配。

```ts [uno.config.ts]
blocklist: [
  'p-1',
  /^p-[2-4]$/,
]
```

这将排除 `p-1` 和 `p-2`、`p-3`、`p-4` 的生成。
