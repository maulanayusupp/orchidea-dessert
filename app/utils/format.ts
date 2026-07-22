/**
 * Formatting helpers. Kept framework-agnostic and pure so they are trivial to
 * unit test and reuse across components/composables.
 */
import type { Product } from '~/types/catalog'

/** Format a number as Indonesian Rupiah, e.g. 100000 -> "Rp100.000". */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Slug -> Title Case (fallback display helper). */
export function titleize(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Lowest available price for a product (across sizes, or its single price). */
export function priceFrom(product: Product): number | null {
  const sizePrices = (product.sizes ?? [])
    .map((s) => s.priceIDR)
    .filter((p): p is number => p !== null)
  if (sizePrices.length) return Math.min(...sizePrices)
  return product.priceIDR
}

/** True when the product is sold in more than one priced size. */
export function hasSizes(product: Product): boolean {
  return !!product.sizes && product.sizes.some((s) => s.priceIDR !== null)
}
