import { computed } from 'vue'
import { products as allProducts, productBySlug } from '~/data/products'
import { categories as allCategories, categoryBySlug } from '~/data/categories'
import { t } from '~/utils/i18n-helpers'
import type { LocaleCode, Product } from '~/types/catalog'

/**
 * Catalog access layer. Wraps the static data with locale-aware getters so
 * components never reach into the raw data or duplicate the bilingual logic.
 * When Orchidea moves to a real backend, only this composable changes.
 */
export function useCatalog() {
  const { locale } = useI18n()
  const loc = computed(() => locale.value as LocaleCode)

  const products = computed(() => allProducts)
  const categories = computed(() => allCategories)

  const popular = computed(() => allProducts.filter((p) => p.popular))
  const signature = computed(() => allProducts.filter((p) => p.signature))

  const byCategory = (slug: string) =>
    computed(() => allProducts.filter((p) => p.category === slug))

  /** Localized display name for a product/category. */
  const name = (item: { name: Product['name'] }) => t(item.name, loc.value)
  const desc = (item: { desc: Product['desc'] }) => t(item.desc, loc.value)

  return {
    locale: loc,
    products,
    categories,
    popular,
    signature,
    byCategory,
    productBySlug,
    categoryBySlug,
    name,
    desc,
    tt: (v: { id: string; en: string }) => t(v, loc.value),
  }
}
