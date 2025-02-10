import type { AutoCompleteFunction, SuggestResult } from '@unocss/core'
import type { LRUCache } from 'lru-cache'

export type AutoCompleteMatchType = 'prefix' | 'fuzzy'

export interface AutocompleteOptions {
  matchType?: AutoCompleteMatchType
}

export type AutocompleteTemplatePart = AutocompleteTemplateStatic | AutocompleteTemplateGroup | AutocompleteTemplateTheme

export interface AutocompleteTemplateStatic {
  type: 'static'
  value: string
}

export interface AutocompleteTemplateGroup {
  type: 'group'
  values: string[]
}

export interface AutocompleteTemplateTheme {
  type: 'theme'
  objects: Record<string, unknown>[]
}

export interface ParsedAutocompleteTemplate {
  parts: AutocompleteTemplatePart[]
  suggest: (input: string, matchType?: AutoCompleteMatchType) => string[] | undefined
}

export interface UnocssAutocomplete {
  suggest: (input: string, allowsEmptyInput?: boolean) => Promise<string[]>
  suggestInFile: (content: string, cursor: number) => Promise<SuggestResult | undefined>
  templates: (string | AutoCompleteFunction)[]
  cache: LRUCache<string, string[]>
  reset: () => Promise<void>
  enumerate: () => Promise<Set<string>>
}
