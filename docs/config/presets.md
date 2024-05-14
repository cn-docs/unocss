# 预设

预设是将合并到主配置中的部分配置。

当编写预设时，我们通常导出一个构造函数，您可以在其中请求一些特定于预设的选项。例如：

```ts
// my-preset.ts
import { Preset, definePreset } from 'unocss'

export default definePreset((options?: MyPresetOptions) => {
  return {
    name: 'my-preset',
    rules: [
      // ...
    ],
    variants: [
      // ...
    ],
    // 它支持大多数你可以在根配置中拥有的配置
  }
})
```

然后用户可以这样使用它：

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import myPreset from './my-preset'

export default defineConfig({
  presets: [
    myPreset({ /* 预设选项 */ }),
  ],
})
```

您可以查看[官方预设](/presets/)和[社区预设](/presets/community)获取更多示例。
