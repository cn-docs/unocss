# 转换器

提供了一个统一的接口来转换源代码，以支持惯例。

```ts [my-transformer.ts]
import { createFilter } from '@rollup/pluginutils'
import { SourceCodeTransformer } from 'unocss'

export default function myTransformers(options: MyOptions = {}): SourceCodeTransformer {
  return {
    name: 'my-transformer',
    enforce: 'pre', // 在其他转换器之前执行
    idFilter(id) {
      // 只转换 .tsx 和 .jsx 文件
      return id.match(/\.[tj]sx$/)
    },
    async transform(code, id, { uno }) {
      // code 是 MagicString 实例
      code.appendRight(0, '/* 我的转换器 */')
    },
  }
}
```

您可以查看[官方转换器](/presets/#转换器)获取更多示例。
