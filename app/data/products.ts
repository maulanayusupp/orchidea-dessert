import type { Product } from '~/types/catalog'

/**
 * Product catalog — EVIDENCE-BASED.
 *
 * Prices (priceIDR) are only filled where Orchidea Dessert publishes them on
 * Shopee (verified in search results): Roll Cake Premium Rp100.000, Mille Crepes
 * Rp350.000, Avocado Chocolate Rp250.000, Chocolate Brownie Rp75.000.
 *
 * All other items exist on their Instagram feed/highlights but have no published
 * price, so priceIDR = null and the UI shows a "pre-order (H-1)" call to action
 * instead of inventing a number.
 *
 * `image` points to a free-licence (Unsplash/Pexels) photo that matches the item
 * type — a stand-in until the owner supplies their own product photography.
 */
export const products: Product[] = [
  {
    slug: 'roll-cake-premium',
    category: 'cakes',
    name: { id: 'Roll Cake Premium', en: 'Premium Roll Cake' },
    desc: {
      id: 'Bolu gulung lembut dengan aneka isian premium.',
      en: 'Soft, tender roll cake with premium fillings.',
    },
    priceIDR: 100000,
    image: '/images/products/roll-cake.jpg',
    variants: ['Strawberry Korean', 'Klepon', 'Cheese', 'Chocolate', 'Picnic Beef/Chicken'],
    popular: true,
    source: 'shopee',
  },
  {
    slug: 'mille-crepes',
    category: 'cakes',
    name: { id: 'Mille Crepes', en: 'Mille Crepes' },
    desc: {
      id: 'Puluhan lapis crepe tipis dengan krim lembut — favorit pandan.',
      en: 'Dozens of thin crepe layers with delicate cream — pandan favourite.',
    },
    priceIDR: 350000,
    image: '/images/products/mille-crepes.jpg',
    signature: true,
    popular: true,
    source: 'shopee',
  },
  {
    slug: 'avocado-chocolate',
    category: 'cakes',
    name: { id: "Mansion de l'Avocad", en: 'Avocado Chocolate' },
    desc: {
      id: 'Perpaduan alpukat lembut dan cokelat premium.',
      en: 'Silky avocado paired with premium chocolate.',
    },
    priceIDR: 250000,
    image: '/images/products/avocado-chocolate.jpg',
    source: 'shopee',
  },
  {
    slug: 'chocolate-brownie',
    category: 'bakery',
    name: { id: 'Chocolate Brownie', en: 'Chocolate Brownie' },
    desc: {
      id: 'Brownie cokelat pekat, fudgy, dan kaya rasa.',
      en: 'Dense, fudgy, deeply chocolatey brownie.',
    },
    priceIDR: 75000,
    image: '/images/products/brownie.jpg',
    popular: true,
    source: 'shopee',
  },
  {
    slug: 'custom-birthday-cake',
    category: 'cakes',
    name: { id: 'Custom Birthday Cake', en: 'Custom Birthday Cake' },
    desc: {
      id: 'Kue ulang tahun dirancang sesuai tema dan pesan Anda.',
      en: 'Birthday cakes designed around your theme and message.',
    },
    priceIDR: null,
    image: '/images/products/birthday-cake.jpg',
    signature: true,
    source: 'instagram',
  },
  {
    slug: 'fruit-cheesecake',
    category: 'cakes',
    name: { id: 'Fruit Cheesecake', en: 'Fruit Cheesecake' },
    desc: {
      id: 'Cheesecake lembut dengan topping buah segar.',
      en: 'Creamy cheesecake crowned with fresh fruit.',
    },
    priceIDR: null,
    image: '/images/products/cheesecake.jpg',
    source: 'instagram',
  },
  {
    slug: 'tiramisu',
    category: 'cakes',
    name: { id: 'Tiramisu', en: 'Tiramisu' },
    desc: {
      id: 'Tiramisu klasik dengan kopi dan mascarpone.',
      en: 'Classic tiramisu with coffee and mascarpone.',
    },
    priceIDR: null,
    image: '/images/products/tiramisu.jpg',
    source: 'instagram',
  },
  {
    slug: 'croissant',
    category: 'pastry',
    name: { id: 'Butter Croissant', en: 'Butter Croissant' },
    desc: {
      id: 'Croissant berlapis renyah dengan mentega berkualitas.',
      en: 'Flaky laminated croissant made with quality butter.',
    },
    priceIDR: null,
    image: '/images/products/croissant.jpg',
    popular: true,
    source: 'instagram',
  },
  {
    slug: 'cromboloni',
    category: 'pastry',
    name: { id: 'Cromboloni', en: 'Cromboloni' },
    desc: {
      id: 'Pastry bundar berlapis dengan isian melimpah.',
      en: 'Round laminated pastry with a generous filling.',
    },
    priceIDR: null,
    image: '/images/products/cromboloni.jpg',
    signature: true,
    source: 'instagram',
  },
  {
    slug: 'roti-maung',
    category: 'bakery',
    name: { id: 'Roti Maung', en: 'Roti Maung (Tiger Bread)' },
    desc: {
      id: 'Roti sourdough dengan kerak "macan" — viral & cocok untuk sarapan.',
      en: 'Sourdough bread with a "tiger" crust — viral and great for breakfast.',
    },
    priceIDR: null,
    image: '/images/products/roti-maung.jpg',
    popular: true,
    source: 'instagram',
  },
  {
    slug: 'kaastengels',
    category: 'cookies',
    name: { id: 'Kaastengels Premium', en: 'Kaastengels Premium' },
    desc: {
      id: 'Kue keju renyah dengan bahan pilihan.',
      en: 'Crisp cheese sticks made with selected ingredients.',
    },
    priceIDR: null,
    image: '/images/products/kaastengels.jpg',
    signature: true,
    source: 'instagram',
  },
  {
    slug: 'nastar',
    category: 'cookies',
    name: { id: 'Nastar', en: 'Nastar (Pineapple Tarts)' },
    desc: {
      id: 'Kue nanas lumer dengan selai homemade.',
      en: 'Melt-in-the-mouth pineapple tarts with homemade jam.',
    },
    priceIDR: null,
    image: '/images/products/nastar.jpg',
    source: 'instagram',
  },
  {
    slug: 'putri-salju',
    category: 'cookies',
    name: { id: 'Putri Salju', en: 'Putri Salju (Snow-White)' },
    desc: {
      id: 'Kue bulan sabit bertabur gula halus.',
      en: 'Crescent cookies dusted in fine snow sugar.',
    },
    priceIDR: null,
    image: '/images/products/putri-salju.jpg',
    source: 'instagram',
  },
  {
    slug: 'lebaran-hampers',
    category: 'hampers',
    name: { id: 'Hampers Lebaran', en: 'Eid Hampers' },
    desc: {
      id: 'Paket hantaran elegan berisi pilihan cookies & kue.',
      en: 'Elegant gift boxes with a selection of cookies & cakes.',
    },
    priceIDR: null,
    image: '/images/products/hampers.jpg',
    signature: true,
    source: 'instagram',
  },
]

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug)
