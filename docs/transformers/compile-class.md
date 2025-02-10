---
title: 类合并转换器
description: 将多个类合并编译为一个类 (@unocss/transformer-compile-class)
outline: deep
---

# 类合并转换器

<!-- @unocss-ignore -->

将一组类合并编译为一个单独的类。灵感来源于 Windi CSS 的 [编译模式](https://windicss.org/posts/modes.html#compilation-mode) 以及 [@UltraCakeBakery](https://github.com/UltraCakeBakery) 提出的 [issue #948](https://github.com/unocss/unocss/issues/948)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/transformer-compile-class
```

```bash [yarn]
yarn add -D @unocss/transformer-compile-class
```

```bash [npm]
npm install -D @unocss/transformer-compile-class
```

:::

```ts [uno.config.ts]
import transformerCompileClass from '@unocss/transformer-compile-class'
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerCompileClass(),
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，也可以从中导入：

```ts
import { transformerCompileClass } from 'unocss'
```

:::

## 使用方法

在类名字符串前添加 `:uno:` 来标记它们以进行合并编译。

例如：

```html
<div class=":uno: text-center sm:text-left">
  <div class=":uno: text-sm font-bold hover:text-red" />
</div>
```

将被编译为：

```html
<div class="uno-qlmcrp">
  <div class="uno-0qw2gr" />
</div>
```

```css
.uno-qlmcrp {
  text-align: center;
}
.uno-0qw2gr {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
}
.uno-0qw2gr:hover {
  --un-text-opacity: 1;
  color: rgb(248 113 113 / var(--un-text-opacity));
}
@media (min-width: 640px) {
  .uno-qlmcrp {
    text-align: left;
  }
}
```

## 可选项

你可以通过选项配置触发字符串和前缀来定制类合并的行为。详细信息请参见 [类型定义](https://github.com/unocss/unocss/blob/main/packages-presets/transformer-compile-class/src/index.ts#L4)。

## 工具支持

### ESLint

有一个 ESLint 规则用于在整个项目中强制使用类合并转换器：[[@unocss/enforce-class-compile](https://unocss.dev/integrations/eslint#unocss-enforce-class-compile)]。

**用法：**

```json
{
  "plugins": ["@unocss"],
  "rules": {
    "@unocss/enforce-class-compile": "warn"
  }
}
```

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
