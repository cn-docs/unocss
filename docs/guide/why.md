---
outline: deep
---

# 为什么选择 UnoCSS？

## 动机

我们建议你阅读由 UnoCSS 创建者 [Anthony Fu](https://antfu.me/) 撰写的博客文章 [重新想象原子 CSS](https://antfu.me/posts/reimagine-atomic-css)，以更好地理解 UnoCSS 背后的动机。

## UnoCSS 与其他工具的不同之处是什么？

### Windi CSS

UnoCSS 是由 [Windi CSS](https://windicss.org/) 团队的一员发起的，从我们在 Windi CSS 中的工作获得了很多灵感。虽然 Windi CSS 自 2023 年 3 月起不再积极维护，但你可以将 UnoCSS 视为 Windi CSS 的 *"精神继承者"*。

UnoCSS 继承了 Windi CSS 的按需特性、[属性化模式](/presets/attributify)、[快捷方式](/config/shortcuts)、[变体组](/transformers/variant-group)、[编译模式](/transformers/compile-class)等多种特性。此外，UnoCSS 从一开始就以最大的可扩展性和性能为目标构建，使我们能够引入如 [纯 CSS 图标](/presets/icons)、[无值属性化](/presets/attributify#valueless-attributify)、[标签化](/presets/tagify)、[网络字体](/presets/web-fonts) 等新功能。

最重要的是，UnoCSS 被提取为一个原子 CSS 引擎，所有功能都是可选的，这使得创建自己的规范、自己的设计系统和自己的预设变得容易——通过你想要的功能组合实现。

### Tailwind CSS

Windi CSS 和 UnoCSS 都从 [Tailwind CSS](https://tailwindcss.com/) 获得了很多灵感。由于 UnoCSS 是从零开始构建的，我们能够很好地概览原子 CSS 的设计，并将其抽象成一个优雅而强大的 API。虽然与 Tailwind CSS 的设计目标不同，这并不是一种简单的比较。但我们将尝试列出一些差异。

Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个同构引擎，配有与构建工具的一流集成（包括一个 [PostCSS 插件](/integrations/postcss)）。这意味着 UnoCSS 可以更灵活地用于不同的场景（例如，[CDN 运行时](/integrations/runtime)，可以即时生成 CSS），并且与构建工具有深度集成，以提供更好的 HMR、性能和开发者体验（例如，[检查器](/tools/inspector)）。

技术折衷考虑外，UnoCSS 也被设计为完全可扩展和可定制的，而 Tailwind CSS 则更具有固定意见。在 Tailwind CSS 上构建自定义设计系统（或设计令牌）可能很困难，你不能真正摆脱 Tailwind CSS 的约定。而使用 UnoCSS，你几乎可以完全控制构建你想要的任何东西。例如，我们在[一个单独的预设](/presets/wind)中实现了完全兼容 Tailwind CSS 的实用程序，并且有很多[出色的社区预设](/presets/community)实现了其他有趣的理念。

由于 UnoCSS 提供的灵活性，我们能够在其基础上试验许多创新功能，例如：

- [纯 CSS 图标](/presets/icons)
- [属性化模式](/presets/attributify)
- [变体组](/transformers/variant-group)
- [快捷方式](/config/shortcuts)
- [标签化](/presets/tagify)
- [网络字体](/presets/web-fonts)
- [CDN 运行时](/integrations/runtime)
- [检查器](/tools/inspector)

由于与 Tailwind CSS 的设计目标不同，UnoCSS 不支持 Tailwind CSS 的插件系统或配置，这可能使从高度定制的 Tailwind CSS 项目迁移变得更加困难。这是为了使 UnoCSS 高性能和可扩展而做出的有意决策，我们认为这种折衷是值得的。
