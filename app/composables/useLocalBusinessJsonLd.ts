import { SITE, CONTACT, SOCIALS } from '~/config/site'

/**
 * Emit schema.org Bakery/LocalBusiness JSON-LD for rich results.
 * All fields are evidence-based (Google Business Profile + their own channels);
 * the aggregate rating mirrors the public 5.0 / 200-review figure.
 */
export function useLocalBusinessJsonLd() {
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string) || SITE.url

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: SITE.name,
    description:
      'Artisan pastry, bakery and viennoiserie by Chef R. Gilang Wardhana in Bandung. Cakes, cromboloni, croissants, Roti Maung and premium cookies. Pre-order (H-1).',
    image: `${base}/og-image.jpg`,
    url: base,
    telephone: CONTACT.phoneE164,
    priceRange: 'Rp',
    servesCuisine: ['Pastry', 'Bakery', 'Dessert'],
    founder: { '@type': 'Person', name: SITE.founder },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.line,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.province,
      postalCode: CONTACT.address.postalCode,
      addressCountry: 'ID',
    },
    openingHours: 'Mo-Su 10:00-20:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
    },
    sameAs: [SOCIALS.instagram, SOCIALS.tiktok, SOCIALS.linktree],
  }

  useHead({
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) },
    ],
  })
}
