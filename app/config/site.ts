/**
 * Single source of truth for business & site metadata.
 *
 * EVIDENCE NOTE — every value here is sourced from Orchidea Dessert's own public
 * channels (Instagram @orchideadessert, Linktree, Shopee) and their verified
 * Google Business Profile. Do not add unverified/assumed data. When a fact
 * changes, update it here and in the i18n locale files + compliance pages.
 *
 * Sources:
 *  - Instagram bio: "Orchidea Dessert By @chefgilangwardhana ● Pastry ● Bakery
 *    ● Viennosseries ● Frozen Food · Order H-1"
 *  - Google Business Profile: category "Cake shop", 5.0★ (200 reviews),
 *    address & phone below, opens 10:00.
 *  - Linktree: linktr.ee/orchidea.dessert (catalog + WhatsApp order).
 */

export const SITE = {
  name: 'Orchidea Dessert',
  legalName: 'Orchidea Dessert by Chef R. Gilang Wardhana',
  founder: 'Chef R. Gilang Wardhana Wantika',
  // Deployment URL — update when the production domain is live.
  url: 'https://orchideadessert.id',
  // Order lead time — the business takes orders one day in advance ("Order H-1").
  orderLeadTime: 'H-1',
  rating: { value: 5.0, count: 200, source: 'Google' },
  openingTime: '10:00',
} as const

export const CONTACT = {
  phoneDisplay: '0822-1690-2617',
  phoneE164: '+6282216902617',
  // wa.me deep link from their Linktree "Order by WhatsApp".
  whatsapp: 'https://wa.me/6282216902617',
  address: {
    line: 'Akinata 21C, Ciparay Hilir, Cangkuang Kulon',
    district: 'Kec. Dayeuhkolot',
    city: 'Kabupaten Bandung',
    province: 'Jawa Barat',
    postalCode: '40239',
    country: 'Indonesia',
    // Google Maps place query (name + area) — no fabricated coordinates.
    mapsQuery: 'Orchidea+Dessert+by+Chef+R+Gilang+Wardhana+Dayeuhkolot',
  },
} as const

export const SOCIALS = {
  instagram: 'https://www.instagram.com/orchideadessert/',
  tiktok: 'https://www.tiktok.com/@orchidea_dessert',
  linktree: 'https://linktr.ee/orchidea.dessert',
  chef: 'https://www.instagram.com/chefgilangwardhana/',
} as const

export type SiteConfig = typeof SITE
