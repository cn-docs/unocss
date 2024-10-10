# 配置文件

我们**强烈建议使用一个专门的 `uno.config.ts` 文件**来配置您的 UnoCSS，以便在 IDE 和其他集成中获得最佳体验。

一个完整的配置文件看起来像这样：

```ts twoslash [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
```

与内联配置在 `vite.config.ts` 或其他工具配置内相比，专用配置文件将与 [IDE](/integrations/vscode) 和集成以及其他工具（如 [ESLint 插件](/integrations/eslint)）更好地配合使用，同时提供更好的 HMR 支持。

默认情况下，UnoCSS 将自动查找项目根目录中的 `uno.config.{js,ts,mjs,mts}` 或 `unocss.config.{js,ts,mjs,mts}`。您也可以手动指定配置文件，例如在 Vite 中：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      configFile: '../my-uno.config.ts',
    }),
  ],
})
```

有关支持的配置选项的完整列表，请参阅[配置参考](/config/)。
