# TODO — Orchidea Dessert

Roadmap of next features and improvements. Keep this updated as work lands
(rule §7 in CLAUDE.md). Checked = done.

## 🚀 Deployment / infra
- [x] Configure git remote & push (`origin` = maulanayusupp/orchidea-dessert).
- [x] Host connected — Vercel **autodeploy on push to `main`**.
- [x] Default site URL centralized in `app/config/site.ts`; production overridable
      via `NUXT_PUBLIC_SITE_URL` env → `runtimeConfig.public.siteUrl`.
- [x] Dynamic `robots.txt` + `sitemap.xml` server routes (use runtime siteUrl).
- [ ] Set `NUXT_PUBLIC_SITE_URL` in Vercel when the custom production domain is live.
- [ ] (Optional) Swap the hand-rolled sitemap for `@nuxtjs/sitemap` if it grows.
- [ ] Add analytics (privacy-friendly, e.g. Plausible) — update Privacy page + cookie note.

## 🖼️ Content & brand
- [ ] Replace free-licence placeholder photos in `public/images/**` with Orchidea's
      real product photography (compliance page already notes this).
- [ ] Get the official logo file from the owner; swap `BrandLogo.vue` / favicon if needed.
- [x] Full menu & prices imported from the official "Catalog Orchidea 2026" (~71 items).
- [ ] Confirm the primary contact number with the owner: catalog WA 0819-9308-8884
      vs Google 0822-1690-2617 (site currently uses the catalog number).
- [ ] Confirm opening hours directly with the owner (Google says opens 10:00).
- [ ] Add real customer testimonials (with permission) — do NOT fabricate.
- [ ] Product detail pages (`/menu/[slug]`) with gallery, allergens, sizes.

## 🛒 E-commerce
- [x] Cart & checkout flow — client-side cart (`useCart` + localStorage), slide-over
      drawer, `/checkout` with pickup/delivery, H-1 date picker, notes → composes a
      full itemized WhatsApp order message (fits the business's real order flow).
- [ ] Payment gateway integration (e.g. Midtrans / Xendit — popular in Indonesia).
- [ ] Area-based delivery fee + address geocoding.
- [ ] Persist orders to a backend/DB + order status; admin dashboard.
- [ ] Product stock / availability flags, promo codes.
- [ ] Backend/API: migrate `app/data/*` to a CMS or DB behind `useCatalog()`
      (the composable is the single seam — swap the data source there only).
- [ ] Admin dashboard for the owner to manage products & orders.

## ✨ UX / polish
- [ ] Product image `srcset`/AVIF via `@nuxt/image` for faster loads.
- [ ] Add a lightweight lightbox/gallery for signatures.
- [ ] Dark mode (tokens already CSS-var based — add a theme toggle).
- [ ] Micro-interactions: cart add animation, toast notifications.
- [ ] Loading skeletons for the menu grid when data becomes async.

## 🌐 i18n
- [ ] Consider adding more languages (e.g. Sundanese/Arabic) — schema already scales.
- [ ] Localized OG images per language.

## 🧪 Quality
- [ ] Unit tests for `utils/format.ts` and `utils/whatsapp.ts` (Vitest).
- [ ] Component tests for `ProductCard`, `LanguageSwitcher`.
- [ ] Lighthouse/a11y audit pass (target 95+).
- [ ] `pnpm typecheck` in CI.
