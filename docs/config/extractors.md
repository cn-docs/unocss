# 提取器

提取器用于从源代码中提取工具类的使用。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    // 你的提取器
  ],
})
```

默认情况下，[extractorSplit](https://github.com/unocss/unocss/blob/main/packages/core/src/extractors/split.ts) 将始终应用，它将源代码拆分成标记并直接传递给引擎。

要覆盖默认的提取器，你可以使用 `extractorDefault` 选项。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    // 你的提取器
  ],
  // 禁用默认提取器
  extractorDefault: false,
  // 使用你自己的提取器覆盖默认提取器
  extractorDefault: myExtractor,
})
```

例如，请查看 [pug 提取器](https://github.com/unocss/unocss/tree/main/packages/extractor-pug) 或 [attributify 提取器](https://github.com/unocss/unocss/blob/main/packages/preset-attributify/src/extractor.ts) 的实现。
