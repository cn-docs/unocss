# 自动补全

您可以为 UnoCSS 的智能提示在 <a href="/play" target="_blank" rel="noreferrer">playground</a> 和 [VS Code 插件](/integrations/vscode) 中自定义自动补全建议。

<!--eslint-skip-->

```ts
autocomplete: {
  templates: [
    // 主题推断
    'bg-$color/<opacity>',
    // 快捷写法
    'text-<font-size>',
    // 逻辑或组
    '(b|border)-(solid|dashed|dotted|double|hidden|none)',
    // 常量
    'w-half',
  ],
  shorthands: {
    // 等价于 `opacity: "(0|10|20|30|40|50|60|70|90|100)"`
    'opacity': Array.from({ length: 11 }, (_, i) => i * 10),
    'font-size': '(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)',
    // 覆盖内置快捷写法
    'num': '(0|1|2|3|4|5|6|7|8|9)',
  },
  extractors: [
      // ...提取器
  ],
}
```

- `templates` 使用了一种简单的 DSL 来指定自动补全建议。
- `shorthands` 是快捷名称与其模板之间的映射。如果值是一个数组，则视为逻辑或组。
- `extractors` 用于提取可能的类名，并将类名风格的建议转换为正确的格式。例如，您可以查看我们如何实现 [attributify 自动补全提取器](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/autocomplete.ts)。
- 更多帮助，请参阅 [这里](/tools/autocomplete)。
