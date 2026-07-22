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

/** A cake size option. Shape word is localized in the UI; `dim` is universal. */
export interface ProductSize {
  shape: 'square' | 'round' | 'foilSquare' | 'foilRound'
  dim: string // e.g. "20×10 cm"
  priceIDR: number | null // null = not available in this size
}

export interface Product {
  slug: string
  category: string // Category.slug
  name: Bilingual
  desc: Bilingual
  /** Single price in IDR for items sold one way. `null` = quote on order (PO). */
  priceIDR: number | null
  /** For cakes sold in multiple sizes; the card shows the lowest available price. */
  sizes?: ProductSize[]
  image: string
  /** Optional short list of variants shown as chips. */
  variants?: string[]
  /** Curation flags. */
  popular?: boolean
  signature?: boolean
  /** Evidence provenance so we never present assumptions as facts. */
  source: 'catalog' | 'shopee' | 'instagram' | 'google'
}

export type { LocaleCode }
