# 提取器

提取器用于从您的源代码中提取工具类的使用情况。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    // 您的提取器
  ],
})
```

默认情况下，会始终应用 [extractorSplit](https://github.com/unocss/unocss/blob/main/packages-engine/core/src/extractors/split.ts)，它将源代码拆分为标记并直接传递给引擎。

要覆盖默认提取器，您可以使用 `extractorDefault` 选项：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    // 您的提取器
  ],
  // 禁用默认提取器
  extractorDefault: false,
  // 使用您自己的提取器覆盖默认提取器
  extractorDefault: myExtractor,
})
```

例如，请查看 [pug 提取器](https://github.com/unocss/unocss/tree/main/packages-integrations/extractor-pug) 或 [attributify 提取器](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/extractor.ts) 的实现。
