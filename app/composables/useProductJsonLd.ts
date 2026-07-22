import { SITE } from '~/config/site'
import { t as pick } from '~/utils/i18n-helpers'
import type { LocaleCode, Product } from '~/types/catalog'

/**
 * Emit schema.org Product JSON-LD for a product detail page. `offers` is only
 * included when the business publishes a price (evidence rule); pre-order items
 * are described without a fabricated price.
 */
export function useProductJsonLd(product: Ref<Product | undefined>) {
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string).replace(/\/$/, '')

  useHead(() => {
    const p = product.value
    if (!p) return {}
    const loc = locale.value as LocaleCode

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: pick(p.name, loc),
      description: pick(p.desc, loc),
      image: `${base}${p.image}`,
      brand: { '@type': 'Brand', name: SITE.name },
      category: p.category,
    }

    if (p.priceIDR !== null) {
      data.offers = {
        '@type': 'Offer',
        price: p.priceIDR,
        priceCurrency: 'IDR',
        availability: 'https://schema.org/PreOrder',
        url: `${base}/menu/${p.slug}`,
      }
    }

    return {
      script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }],
    }
  })
}
