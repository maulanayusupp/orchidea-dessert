import type { Category } from '~/types/catalog'

/**
 * Product categories. Derived from Orchidea Dessert's own Instagram highlights
 * (Custom, Cookies, Birthday Cake, Croissant, Set Menu, Cromboloni) and the IG
 * bio (Pastry · Bakery · Viennoiserie · Frozen Food). No invented categories.
 */
export const categories: Category[] = [
  {
    slug: 'cakes',
    name: { id: 'Kue & Custom', en: 'Cakes & Custom' },
    tagline: {
      id: 'Kue ulang tahun & custom, mille crepes, tiramisu, red velvet.',
      en: 'Birthday & custom cakes, mille crepes, tiramisu, red velvet.',
    },
    icon: 'cake',
  },
  {
    slug: 'pastry',
    name: { id: 'Pastry & Viennoiserie', en: 'Pastry & Viennoiserie' },
    tagline: {
      id: 'Croissant, cromboloni, dan pastry berlapis ala Prancis.',
      en: 'Croissants, cromboloni and laminated French-style pastries.',
    },
    icon: 'croissant',
  },
  {
    slug: 'bakery',
    name: { id: 'Bakery & Roti', en: 'Bakery & Bread' },
    tagline: {
      id: 'Roti artisan, termasuk Roti Maung yang viral.',
      en: 'Artisan breads, including the viral Roti Maung.',
    },
    icon: 'bread',
  },
  {
    slug: 'cookies',
    name: { id: 'Cookies Premium', en: 'Premium Cookies' },
    tagline: {
      id: 'Kaastengels, nastar, putri salju, sagu keju, lidah kucing.',
      en: 'Kaastengels, nastar, snow-white cookies, cheese sagu, lidah kucing.',
    },
    icon: 'cookie',
  },
  {
    slug: 'hampers',
    name: { id: 'Hampers & Gift', en: 'Hampers & Gifts' },
    tagline: {
      id: 'Paket hantaran elegan untuk Lebaran & momen spesial.',
      en: 'Elegant gift boxes for Eid and special moments.',
    },
    icon: 'gift',
  },
]

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug)
