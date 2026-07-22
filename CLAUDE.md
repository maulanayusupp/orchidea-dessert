# CLAUDE.md — Orchidea Dessert Website

Living guide for anyone (human or AI) working on this repo. **Keep it in sync:**
whenever you change a rule, add a feature, or touch content, update this file, the
compliance pages (`i18n/locales/*.json → legal.*`), and **both** locale files.

---

## 1. What this is

The official marketing website for **Orchidea Dessert** — an artisan pastry,
bakery & viennoiserie business by **Chef R. Gilang Wardhana** in Dayeuhkolot,
Kabupaten Bandung, Jawa Barat. Built to attract customers and be ready to grow
into e-commerce.

## 2. Tech stack

- **Nuxt 4** (Vue 3, Vite) — `app/` src directory.
- **@nuxtjs/i18n v9** — bilingual **ID (default)** / **EN**, `prefix_except_default`.
- **@vueuse/nuxt** — scroll/util composables.
- **SCSS** (Dart Sass, modern `@use`) — centralized, **no inline CSS**.
- Package manager: **pnpm**.

## 3. Commands

```bash
pnpm install      # install deps
pnpm dev          # dev server
pnpm build        # production build (SSR/prerender)
pnpm generate     # static site
pnpm preview      # preview built output
pnpm typecheck    # vue-tsc type check
```

## 4. Non-negotiable rules

1. **No inline styles / no inline CSS.** All styling lives in SCSS — global system
   in `app/assets/scss/`, component styling in `<style lang="scss" scoped>`.
   Design tokens (`$gold-500`, mixins, `fluid()`) are auto-injected via
   `nuxt.config.ts → vite.css.preprocessorOptions.scss.additionalData`, so never
   re-`@use` the abstracts inside a component.
2. **Component-based.** Prefer small, reusable components (`app/components/**`).
   Nuxt auto-imports them; nested folders prefix the name (`ui/Button.vue` →
   `<UiButton>`, `home/Hero.vue` → `<HomeHero>`).
3. **Helpers & services, not logic-in-templates.** Pure helpers in `app/utils/`,
   data access in `app/composables/` (e.g. `useCatalog`), config in `app/config/`.
4. **Multilingual by default.** Every user-facing string goes through i18n
   (`i18n/locales/id.json` + `en.json`). **ID is the source of truth**; when you add
   or change a string, update *both* files. Catalog *content* (product names/desc)
   is stored bilingually in `app/data/*` as `{ id, en }`; UI chrome lives in locales.
5. **Evidence over assumptions.** Only publish facts sourced from Orchidea's own
   channels or Google Business Profile (see §6). Prices appear **only** where the
   business publishes them; everything else shows “Pre-order (H-1)”. Never invent
   prices, reviews, addresses, or claims.
6. **SEO on every page.** Call `useSeoMetaTags({ title, description })` in each page.
   Home also calls `useLocalBusinessJsonLd()`.
7. **Commit & push each change** (see §8). Add future work to `TODO.md`.
8. **Keep this file, compliance pages, and locales updated** with every change.

## 5. Architecture map

```
app/
  app.vue                 # root: <NuxtLayout><NuxtPage/>; sets <html lang>
  error.vue               # 404 / error page
  config/site.ts          # SITE / CONTACT / SOCIALS — single source of truth
  types/catalog.ts        # Product / Category / Bilingual types
  data/                   # products.ts, categories.ts (evidence-based catalog)
  utils/                  # format.ts, whatsapp.ts, i18n-helpers.ts (pure)
  composables/            # useCatalog, useSeoMetaTags, useLocalBusinessJsonLd
  plugins/reveal.client.ts# v-reveal scroll-in directive
  layouts/default.vue     # header + main + footer shell
  components/
    BrandLogo, LanguageSwitcher
    ui/        Button, Icon
    layout/    Header, Footer
    section/   Heading
    product/   Card
    home/      Hero, Marquee, Categories, Signatures, Popular, Process, Trust, Visit
    legal/     Doc  (renders any legal page from i18n)
  pages/
    index.vue, menu.vue, about.vue, contact.vue
    legal/privacy.vue, legal/terms.vue, legal/compliance.vue
  assets/scss/
    main.scss             # the only globally-registered stylesheet
    abstracts/            # _variables, _functions, _mixins, _breakpoints, _index
    base/                 # _root (CSS vars), _reset, _typography, _layout, _utilities
    components/           # _button
public/                   # favicon.svg/.ico, apple-touch, icons, manifest, robots, images
i18n/locales/             # id.json (default), en.json
```

## 6. Brand & evidence

- **Palette (from the gold logo + signature photography):** gold `#a67c2e`
  (primary), forest/sage green (`--c-green` / `--c-sage`), cream/ivory surfaces,
  teal accent, espresso ink. Tokens in `abstracts/_variables.scss` + `base/_root.scss`.
- **Fonts:** Cormorant Garamond (display), Jost (body) — loaded via Google Fonts.
- **Verified facts** (sources): IG [@orchideadessert], TikTok [@orchidea_dessert],
  Linktree `linktr.ee/orchidea.dessert`, Shopee catalogue, Google Business Profile
  (“Cake shop”, 5.0★/200 reviews, address & phone in `config/site.ts`, opens 10:00).
- **Published prices (Shopee):** Roll Cake Rp100.000, Mille Crepes Rp350.000,
  Avocado Chocolate Rp250.000, Chocolate Brownie Rp75.000. All other items: PO.
- **Images:** currently free-licence (Unsplash) placeholders that match each item
  type — replace with the owner's real photography when supplied (see TODO.md).

## 7. Adding content

- **New product:** add to `app/data/products.ts` (bilingual `name`/`desc`, `priceIDR`
  or `null`, `category`, `image`, `source`). Drop the image in
  `public/images/products/`. No template changes needed.
- **New category:** add to `app/data/categories.ts`.
- **New page:** create in `app/pages/`, call `useSeoMetaTags`, add nav entry in
  `layout/Header.vue` + `layout/Footer.vue`, and add `nav.*` keys to both locales.
- **New string:** add the key to `id.json` **and** `en.json`.

## 8. URLs, share previews & deploy

- **One source of truth for the site URL:** `SITE.url` in `app/config/site.ts`,
  exposed as `runtimeConfig.public.siteUrl` and overridable in production via the
  `NUXT_PUBLIC_SITE_URL` env var. Nothing else hardcodes the domain — `robots.txt`
  and `sitemap.xml` are dynamic server routes (`server/routes/`) that read it, and
  `useSeoMetaTags` builds canonical/OG URLs from it.
- **Share preview (WhatsApp/IG/Twitter):** `useSeoMetaTags` emits absolute OG +
  Twitter tags incl. image dimensions/type. The card is `public/og-image.jpg`
  (1200×630). To regenerate: edit `scratchpad og.html`-style template, screenshot
  at 1200×630 with headless Chrome, then `magick … -quality 86 og-image.jpg`
  (this box's ImageMagick lacks Freetype, so text must be rendered by Chrome).
- **No horizontal overflow:** decorative bleed (hero glow, marquee) is contained
  by `overflow-x: clip` on `html`, `body` and `.app-shell` — keep those.

## 9. Git workflow & deploy

Small, focused commits; commit **and push** after each change (Conventional-ish:
`feat:`, `fix:`, `content:`, `chore:`). Remote `origin` =
`git@github.com:maulanayusupp/orchidea-dessert.git`, branch `main`, **Vercel
autodeploys on push**.
