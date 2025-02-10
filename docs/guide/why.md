---
outline: deep
---

# 为什么选择 UnoCSS？

## 动机

我们推荐你阅读 UnoCSS 创建者 [Anthony Fu](https://antfu.me/) 所撰写的博客文章 [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css)，以便更好地理解 UnoCSS 背后的理念。

## UnoCSS 与其他方案有何不同？

### Windi CSS

UnoCSS 的起源可以追溯到 [Windi CSS](https://windicss.org/) 团队的一员，其设计灵感来源于我们在 Windi CSS 中的工作。虽然自 2023 年 3 月起 Windi CSS 已不再积极维护，但你可以把 UnoCSS 看作是 Windi CSS 的“精神继承者”。

UnoCSS 继承了 Windi CSS 的按需生成、[attributify 模式](/presets/attributify)、[快捷方式](/config/shortcuts)、[variant groups](/transformers/variant-group)、[编译模式](/transformers/compile-class) 等特性。同时，UnoCSS 从设计之初便注重扩展性和性能，因此可以轻松引入例如 [纯 CSS 图标](/presets/icons)、[无值 attributify](/presets/attributify#无值-attributify)、[tagify](/presets/tagify)、[Web 字体](/presets/web-fonts) 等新特性。

更重要的是，UnoCSS 被设计为一个原子 CSS 引擎，所有特性都可以按需启用，允许你轻松创建自己的约定、自定义设计系统以及专属预设。

### Tailwind CSS

Windi CSS 和 UnoCSS 都受到了 [Tailwind CSS](https://tailwindcss.com/) 的启发。由于 UnoCSS 从零构建，我们对原子 CSS 体系及其优雅且功能强大的 API 有了全面认识。虽然两者设计目标不同，无法直接对比，但我们依然列出以下几点区别：

- **技术实现**：Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个同构引擎，并通过一流的构建工具集成（包括 [PostCSS 插件](/integrations/postcss)）实现更灵活的使用场景，比如 [CDN 运行时](/integrations/runtime) 能实时生成 CSS，以及深度集成带来的更好 HMR、性能和开发体验（例如 [检查器](/tools/inspector)）。
- **扩展与自定义**：Tailwind CSS 的配置较为固定，而 UnoCSS 允许你根据需要自定义规则、预设及其它功能。例如，我们在 [单一预设](/presets/wind) 中实现了完全兼容 Tailwind CSS 的工具类，而社区中也有许多其它风格的 [预设](/presets/community)。

得益于其出色的扩展性，UnoCSS 能够不断尝试新的功能，例如：

- [纯 CSS 图标](/presets/icons)
- [Attributify 模式](/presets/attributify)
- [Variant Groups](/transformers/variant-group)
- [快捷方式](/config/shortcuts)
- [Tagify](/presets/tagify)
- [Web 字体](/presets/web-fonts)
- [CDN 运行时](/integrations/runtime)
- [检查器](/tools/inspector)
