import type { Plugin } from 'vite'
import type { SvelteScopedContext } from '../preprocess'
import { cssIdRE, type PluginOptions, type UnocssPluginContext } from '@unocss/core'
import { applyTransformers } from '../../../shared-integration/src/transformers'

const svelteIdRE = /[&?]svelte/

export function createCssTransformerPlugins(context: SvelteScopedContext, cssTransformers: PluginOptions['transformers']): Plugin[] {
  const enforces = ['default', 'pre', 'post'] as const
  return enforces.map((enforce): Plugin => ({
    name: `unocss:svelte-scoped-transformers:${enforce}`,
    enforce: enforce === 'default' ? undefined : enforce,

    async transform(code, id) {
      if (!cssIdRE.test(id) || svelteIdRE.test(id))
        return
      context.uno.config.transformers = cssTransformers ?? []
      return applyTransformers({
        ...context,
        affectedModules: new Set<string>(),
      } as UnocssPluginContext, code, id, enforce)
    },
  }))
}
