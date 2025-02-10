---
outline: deep
---

# 提取

UnoCSS 通过搜索代码库中工具类的使用，并按需生成对应的 CSS。我们称这一过程为 **提取**。

## 内容来源

UnoCSS 支持从多个来源提取工具类的使用情况：

- [从构建工具流水线中提取](#extracting-from-build-tools-pipeline) — 直接从构建工具流水线中提取
- [从文件系统中提取](#extracting-from-filesystem) — 通过读取和监控文件提取内容
- [从内联文本中提取](#extracting-from-inline-text) — 从内联文本中提取工具类

来自不同来源的工具类使用将会被合并，最终生成 CSS。

### 从构建工具流水线中提取

在 [Vite](/integrations/vite) 和 [Webpack](/integrations/webpack) 集成中均支持此功能。

UnoCSS 会读取通过构建流水线传入的内容，智能提取实际使用到的工具类，从而避免额外的文件 I/O 操作。

默认情况下，UnoCSS 会提取扩展名为 `.jsx`、`.tsx`、`.vue`、`.md`、`.html`、`.svelte`、`.astro` 的文件中的工具类。默认不包含 `.js` 和 `.ts` 文件。

要配置这些选项，请在 `uno.config.ts` 中进行如下设置：

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
      // 排除某些文件
      // exclude: []
    },
  },
})
```

你也可以在文件中的任意位置添加 `@unocss-include` 魔法注释来强制扫描该文件。若你希望扫描 `*.js` 或 `*.ts` 文件，请在配置中将它们加入扫描目标。

```ts
// ./some-utils.js

// 因为默认不会扫描 `.js` 文件，下面的注释告知 UnoCSS 强制扫描此文件。
// @unocss-include
export const classes = {
  active: 'bg-primary text-white',
  inactive: 'bg-gray-200 text-gray-500',
}
```

同样，你可以在整个文件前加上 `@unocss-ignore` 来忽略该文件的扫描和转换。

如果你希望 UnoCSS 跳过特定的代码段，可以使用成对的 `@unocss-skip-start` 和 `@unocss-skip-end`：

```html
<p class="text-green text-xl">绿色大号文字</p>

<!-- @unocss-skip-start -->
<!-- 此处的 `text-red` 不会被提取 -->
<p class="text-red">红色文字</p>
<!-- @unocss-skip-end -->
```

### 从文件系统中提取

在某些情况下（如使用不经过流水线的 PostCSS 插件或与后端框架联动时），可以手动指定需要提取的文件：

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

匹配的文件会直接被读取，并在开发模式下进行监听。

### 从内联文本中提取

你还可以从内联文本中提取工具类使用情况：

```ts [uno.config.ts]
export default defineConfig({
  content: {
    inline: [
      // 纯文本
      '<div class="p-4 text-red">一些文本</div>',
      // 异步获取内容
      async () => {
        const response = await fetch('https://example.com')
        return response.text()
      },
    ],
  },
})
```

## 限制

由于 UnoCSS 工作于构建时，因此仅生成静态存在的工具类。对运行时动态构造或从外部资源加载的工具类，可能检测不到或不生效。

### 白名单

例如下述动态拼接场景：

```html
<div class="p-${size}"></div>
<!-- 这不会起作用！ -->
```

此时可通过配置 `safelist` 选项来确保这些工具类被始终生成：

```ts [uno.config.ts]
safelist: 'p-1 p-2 p-3 p-4'.split(' ')
```

生成的 CSS 始终包含：

<!-- eslint-skip -->

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
```

或者更灵活：

```ts [uno.config.ts]
safelist: [
  ...Array.from({ length: 4 }, (_, i) => `p-${i + 1}`),
]
```

如果你需要真正的运行时动态生成，可以考虑 [@unocss/runtime](/integrations/runtime) 包。

### 静态列表组合

另一种方法是通过静态对象列举所有可能值，例如：

```ts
// 由于是静态定义，UnoCSS 能在构建时提取
const classes = {
  red: 'text-red border-red',
  green: 'text-green border-green',
  blue: 'text-blue border-blue',
}
```

然后在模板中使用：

```html
<div class="${classes[color]}"></div>
```

### 黑名单

类似白名单，你可以配置 `blocklist` 排除某些工具类：

```ts [uno.config.ts]
blocklist: [
  'p-1',
  /^p-[2-4]$/,
]
```

这将排除 `p-1` 以及 `p-2`、`p-3`、`p-4` 工具类的生成。
