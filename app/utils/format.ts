/**
 * Formatting helpers. Kept framework-agnostic and pure so they are trivial to
 * unit test and reuse across components/composables.
 */

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
