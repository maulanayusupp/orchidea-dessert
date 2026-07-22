import type { LocaleCode } from '~/utils/i18n-helpers'

/** A short bilingual string. Catalog *content* is stored bilingually here;
 *  UI chrome strings live in i18n/locales/*.json instead. */
export interface Bilingual {
  id: string
  en: string
}

export interface Category {
  slug: string
  name: Bilingual
  tagline: Bilingual
  /** Emoji/icon key used by the UI to decorate the category. */
  icon: string
}

export interface Product {
  slug: string
  category: string // Category.slug
  name: Bilingual
  desc: Bilingual
  /** Price in IDR. `null` when the business only quotes on order (PO / H-1). */
  priceIDR: number | null
  image: string
  /** Optional short list of variants shown as chips. */
  variants?: string[]
  /** Curation flags. */
  popular?: boolean
  signature?: boolean
  /** Evidence provenance so we never present assumptions as facts. */
  source: 'shopee' | 'instagram' | 'google'
}

export type { LocaleCode }
