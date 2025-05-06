import type { DefaultTheme } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'

const ogUrl = 'https://unocss.dev/'
const ogImage = `${ogUrl}og.png#1`
const title = 'UnoCSS'
const description = 'The instant on-demand Atomic CSS engine'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: '快速开始', link: '/guide/' },
  { text: '为什么选择 UnoCSS？', link: '/guide/why' },
  { text: '预设', link: '/guide/presets' },
  { text: '样式重置', link: '/guide/style-reset' },
  { text: '配置文件', link: '/guide/config-file' },
  { text: '提取与白名单', link: '/guide/extracting' },
]

const Configs: DefaultTheme.NavItemWithLink[] = [
  { text: '概览', link: '/config/' },
  { text: '规则', link: '/config/rules' },
  { text: '快捷方式', link: '/config/shortcuts' },
  { text: '主题', link: '/config/theme' },
  { text: '变体', link: '/config/variants' },
  { text: '提取器', link: '/config/extractors' },
  { text: '转换器', link: '/config/transformers' },
  { text: '初始化样式', link: '/config/preflights' },
  { text: '图层', link: '/config/layers' },
  { text: '自动补全', link: '/config/autocomplete' },
  { text: '预设', link: '/config/presets' },
]

const Integrations: DefaultTheme.NavItemWithLink[] = [
  { text: 'Vite', link: '/integrations/vite' },
  { text: 'Nuxt', link: '/integrations/nuxt' },
  { text: 'Astro', link: '/integrations/astro' },
  { text: 'Svelte Scoped', link: '/integrations/svelte-scoped' },
  { text: 'Webpack', link: '/integrations/webpack' },
  { text: '运行时', link: '/integrations/runtime' },
  { text: 'CLI', link: '/integrations/cli' },
  { text: 'PostCSS', link: '/integrations/postcss' },
  { text: 'ESLint', link: '/integrations/eslint' },
  { text: 'VS Code 扩展', link: '/integrations/vscode' },
  { text: 'JetBrains IDE 插件', link: '/integrations/jetbrains' },
]

const Presets: DefaultTheme.NavItemWithLink[] = [
  { text: 'Uno（默认）', link: '/presets/uno' },
  { text: '图标', link: '/presets/icons' },
  { text: 'Attributify', link: '/presets/attributify' },
  { text: '排版', link: '/presets/typography' },
  { text: '网页字体', link: '/presets/web-fonts' },
  { text: 'Wind', link: '/presets/wind' },
  { text: 'Mini', link: '/presets/mini' },
  { text: '旧版兼容', link: '/presets/legacy-compat' },
  { text: 'Tagify', link: '/presets/tagify' },
  { text: 'rem 转换为 px', link: '/presets/rem-to-px' },
]

const Transformers: DefaultTheme.NavItemWithLink[] = [
  { text: '变体组', link: '/transformers/variant-group' },
  { text: '指令', link: '/transformers/directives' },
  { text: '类编译', link: '/transformers/compile-class' },
  { text: 'Attributify JSX', link: '/transformers/attributify-jsx' },
]

const Extractors: DefaultTheme.NavItemWithLink[] = [
  { text: 'Pug 提取器', link: '/extractors/pug' },
  { text: 'MDC 提取器', link: '/extractors/mdc' },
  { text: 'Svelte 提取器', link: '/extractors/svelte' },
  { text: '任意变体提取器', link: '/extractors/arbitrary-variants' },
]

const Tools: DefaultTheme.NavItemWithLink[] = [
  { text: '检查器', link: '/tools/inspector' },
  { text: '核心', link: '/tools/core' },
  { text: '自动补全', link: '/tools/autocomplete' },
]

const Resources: DefaultTheme.NavItemWithLink[] = [
  { text: '交互文档', link: '/interactive/', target: '_blank' },
  { text: '演练场', link: '/play/', target: '_blank' },
  { text: '教程', link: 'https://tutorial.unocss.dev/', target: '_blank' },
]

const Introes: DefaultTheme.NavItemWithLink[] = [
  { text: '团队', link: '/team' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: '指南',
    items: [
      {
        text: '指南',
        items: Guides,
      },
      {
        text: '关于本站',
        link: '/guide/about',
      },
    ],
    activeMatch: '^/guide/',
  },
  {
    text: 'vue源码讲解',
    link: '/vueer',
  },
  {
    text: '集成',
    items: [
      {
        text: '概览',
        link: '/integrations/',
      },
      {
        text: '集成',
        items: Integrations,
      },
      {
        text: '示例',
        link: '/integrations/#examples',
      },
    ],
    activeMatch: '^/integrations/',
  },
  {
    text: '配置',
    items: [
      {
        text: '配置文件',
        link: '/guide/config-file',
      },
      {
        text: '概念',
        items: Configs,
      },
    ],
    activeMatch: '^/config/',
  },
  {
    text: '预设',
    items: [
      {
        text: '概览',
        link: '/presets/',
      },
      {
        text: '社区预设',
        link: '/presets/community',
      },
      {
        text: '预设',
        items: Presets,
      },
      {
        text: '转换器',
        items: Transformers,
      },
      {
        text: '提取器',
        items: Extractors,
      },
    ],
    activeMatch: '^/(presets|transformers|extractors)/',
  },
  {
    text: '资源',
    items: [
      ...Resources,
      {
        items: Introes,
      },
    ],
  },
  {
    text: `v${version}`,
    items: [
      {
        text: '发行说明',
        link: 'https://github.com/unocss/unocss/releases',
      },
      {
        text: '贡献指南',
        link: 'https://github.com/unocss/unocss/blob/main/.github/CONTRIBUTING.md',
      },
      {
        component: 'RainbowAnimationSwitcher',
        props: {
          text: '彩虹动画',
        },
      },
    ],
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: '指南',
    items: Guides,
  },
  {
    text: '集成',
    items: [
      {
        text: '概览',
        link: '/integrations/',
      },
      ...Integrations,
      {
        text: '示例',
        link: '/integrations/#examples',
      },
    ],
  },
  {
    text: '配置',
    link: '/config/',
  },
  {
    text: '预设',
    link: '/presets/',
  },
]

const SidebarPresets: DefaultTheme.SidebarItem[] = [
  {
    text: '概览',
    link: '/presets/',
  },
  {
    text: '预设',
    collapsed: false,
    items: Presets,
  },
  {
    text: '社区预设',
    link: '/presets/community',
  },
  {
    text: '转换器',
    collapsed: false,
    items: Transformers,
  },
  {
    text: '提取器',
    collapsed: false,
    items: Extractors,
  },
  {
    text: '其他软件包',
    collapsed: false,
    items: Tools,
  },
]

const SidebarConfig: DefaultTheme.SidebarItem[] = [
  {
    text: '配置',
    collapsed: false,
    items: Configs,
  },
  {
    text: '配置文件',
    link: '/guide/config-file',
  },
]

export default defineConfig({
  lang: 'en-US',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'UnoCSS' }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    /^\/play/,
    /^\/interactive/,
    /:\/\/localhost/,
  ],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      transformerTwoslash({
        processHoverInfo: info => info.replace(/_unocss_core\./g, ''),
      }),
    ],
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': SidebarGuide,
      '/integrations/': SidebarGuide,

      '/tools/': SidebarPresets,
      '/presets/': SidebarPresets,
      '/transformers/': SidebarPresets,
      '/extractors/': SidebarPresets,

      '/config/': SidebarConfig,
    },
    editLink: {
      pattern: 'https://github.com/unocss/unocss/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'bluesky', link: 'https://bsky.app/profile/unocss.dev' },
      { icon: 'github', link: 'https://github.com/unocss/unocss' },
      { icon: 'discord', link: 'https://chat.antfu.me' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Anthony Fu',
    },
  },
})
