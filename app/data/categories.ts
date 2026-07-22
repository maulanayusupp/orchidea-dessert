import type { Category } from '~/types/catalog'

/**
 * Product categories — mirror the sections of Orchidea Dessert's official
 * "Catalog Orchidea 2026" (the authoritative source for the full menu & prices).
 */
export const categories: Category[] = [
  {
    slug: 'cakes',
    name: { id: 'Kue Signature', en: 'Signature Cakes' },
    tagline: {
      id: 'Kue premium dalam ukuran persegi & bulat — avocado, blackforest, tiramisu, cheesecake, dan lainnya.',
      en: 'Premium cakes in square & round sizes — avocado, blackforest, tiramisu, cheesecake and more.',
    },
    icon: 'cake',
  },
  {
    slug: 'crepes',
    name: { id: 'Mille Crepes', en: 'Mille Crepes' },
    tagline: {
      id: 'Puluhan lapis crepe tipis — durian, thai tea, tiramisu, vanilla, nutella.',
      en: 'Dozens of thin crepe layers — durian, thai tea, tiramisu, vanilla, nutella.',
    },
    icon: 'cake',
  },
  {
    slug: 'rollcake',
    name: { id: 'Roll Cake', en: 'Roll Cake' },
    tagline: {
      id: 'Korean roll cake yang lembut — strawberry, coklat, keju, klepon.',
      en: 'Soft Korean roll cakes — strawberry, chocolate, cheese, klepon.',
    },
    icon: 'cake',
  },
  {
    slug: 'viennoiserie',
    name: { id: 'Viennoiserie', en: 'Viennoiserie' },
    tagline: {
      id: 'Croissant berlapis & Roti Maung dengan aneka isian.',
      en: 'Laminated croissants & Roti Maung with a variety of fillings.',
    },
    icon: 'croissant',
  },
  {
    slug: 'sweets',
    name: { id: 'Sweet', en: 'Sweet Treats' },
    tagline: {
      id: 'Brownies, emental cheese, strawberry crumble, dan camilan manis.',
      en: 'Brownies, emental cheese, strawberry crumble and sweet snacks.',
    },
    icon: 'cookie',
  },
  {
    slug: 'savory',
    name: { id: 'Savory & Donut', en: 'Savory & Donuts' },
    tagline: {
      id: 'Picnic roll gurih dan donut yang mengenyangkan.',
      en: 'Savoury picnic rolls and satisfying donuts.',
    },
    icon: 'bread',
  },
  {
    slug: 'cookies',
    name: { id: 'Cookies', en: 'Cookies' },
    tagline: {
      id: 'Kaastengels, nastar, putri salju, dan cookies premium lainnya.',
      en: 'Kaastengels, nastar, snow-white and other premium cookies.',
    },
    icon: 'cookie',
  },
  {
    slug: 'bundling',
    name: { id: 'Paket & Kopi', en: 'Bundles & Coffee' },
    tagline: {
      id: 'Paket hemat croissant, donut, dan iced coffee.',
      en: 'Value bundles of croissants, donuts and iced coffee.',
    },
    icon: 'gift',
  },
]

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug)
