import type { Provider, WebFontsProviders } from '../types'

export const FontshareProvider: Provider = createFontshareProvider('fontshare', 'https://api.fontshare.com')

export function createFontshareProvider(name: WebFontsProviders, host: string): Provider {
  return {
    name,
    getImportUrl(fonts) {
      const strings = fonts.map((f) => {
        let name = f.name.replace(/\s+/g, '-').toLocaleLowerCase()
        if (f.weights?.length)
          name += `@${f.weights.flatMap(w => f.italic ? Number(w) + 1 : w).sort().join()}`
        else name += `@${f.italic ? 2 : 1}`
        return `f[]=${name}`
      }).join('&')
      return `${host}/v2/css?${strings}&display=swap`
    },
  }
}
