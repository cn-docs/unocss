import type { DefaultTheme } from 'vitepress'

export interface Contributor {
  name: string
  avatar: string
}

export interface CoreTeam extends Partial<DefaultTheme.TeamMember> {
  avatar: string
  name: string
  // required to download avatars from GitHub
  github: string
  twitter?: string
  webtools?: string
  discord?: string
  youtube?: string
  sponsor?: string
  title?: string
  org?: string
  desc?: string
}

function createLinks(tm: CoreTeam): CoreTeam {
  tm.links = [{ icon: 'github', link: `https://github.com/${tm.github}` }]
  if (tm.webtools)
    tm.links.push({ icon: 'mastodon', link: `https://elk.zone/m.webtoo.ls/@${tm.webtools}` })
  if (tm.discord)
    tm.links.push({ icon: 'discord', link: tm.discord })
  if (tm.youtube)
    tm.links.push({ icon: 'youtube', link: `https://www.youtube.com/@${tm.youtube}` })
  tm.links.push({ icon: 'twitter', link: `https://twitter.com/${tm.twitter}` })
  return tm
}

const plainTeamMembers: CoreTeam[] = [
  {
    avatar: 'https://github.com/antfu.png',
    name: 'Anthony Fu',
    github: 'antfu',
    webtools: 'antfu',
    youtube: 'antfu',
    discord: 'https://chat.antfu.me',
    twitter: 'antfu7',
    sponsor: 'https://github.com/sponsors/antfu',
    title: 'A fanatical open sourceror, working',
    org: 'NuxtLabs',
    orgLink: 'https://nuxtlabs.com/',
    desc: 'Core team member of Vite & Vue',
  },
  {
    avatar: 'https://github.com/chu121su12.png',
    name: 'Saya',
    github: 'chu121su12',
    title: 'Programmer',
  },
  {
    avatar: 'https://github.com/zyyv.png',
    name: 'Chris',
    github: 'zyyv',
    twitter: 'chris_zyyv',
    title: 'Regardless of the past, do not ask the future.',
  },
  {
    avatar: 'https://github.com/sibbng.png',
    name: 'sibbng',
    github: 'sibbng',
    twitter: 'sibbng',
    title: 'Designer / Developer',
  },
  {
    avatar: 'https://github.com/userquin.png',
    name: 'Joaquín Sánchez',
    github: 'userquin',
    webtools: 'userquin',
    twitter: 'userquin',
    title: 'A fullstack and android developer',
    desc: 'Vite\'s fanatical follower',
  },
  {
    avatar: 'https://github.com/QiroNT.png',
    name: 'Chino Moca',
    github: 'QiroNT',
    twitter: 'QiroNT',
    title: 'Balance & Tradeoff',
  },
  {
    avatar: 'https://github.com/johannschopplich.png',
    name: 'Johann Schopplich',
    github: 'johannschopplich',
    title: 'Full Stack Developer',
    desc: 'Pharmacist prior to that',
  },
  {
    avatar: 'https://github.com/ydcjeff.png',
    name: 'Jeff Yang',
    github: 'ydcjeff',
    twitter: 'ydcjeff',
  },
  {
    avatar: 'https://github.com/sudongyuer.png',
    name: 'Tsuki Su',
    github: 'sudongyuer',
    twitter: 'sudongyuer',
    title: 'A zealous open sourceror & Full Stack Developer & Junior designer',
    desc: 'Previously worked at Tencent, now starting a business',
  },
  {
    avatar: 'https://github.com/jacob-8.png',
    name: 'Jacob Bowdoin',
    github: 'jacob-8',
    twitter: 'jacobbowdoin',
    title: 'Svelte, i18n',
    org: 'Polylingual Development',
    orgLink: 'https://polylingual.dev/',
  },
  {
    avatar: 'https://github.com/Dunqing.png',
    name: 'Dunqing',
    github: 'Dunqing',
    twitter: 'dunqingg',
    title: 'Passionate about open source',
  },
  {
    avatar: 'https://github.com/Simon-He95.png',
    name: 'Simon He',
    github: 'Simon-He95',
    twitter: 'simon_he1995',
    title: 'Passionate about open source & FE Developer',
    desc: '@webview-use author, vscode plugin master, open source magician, antfu’s number one fan',
  },
  {
    avatar: 'https://github.com/henrikvilhelmberglund.png',
    name: 'Henrik Berglund',
    github: 'henrikvilhelmberglund',
    twitter: 'henrikvberglund',
    title: 'Frontend Developer',
    desc: 'Loves Svelte, Vite and open source, author of the UnoCSS tutorial',
  },
]

const teamMembers = plainTeamMembers.map(tm => createLinks(tm))

export { teamMembers }
