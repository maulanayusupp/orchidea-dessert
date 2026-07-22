# TODO — Orchidea Dessert

Roadmap of next features and improvements. Keep this updated as work lands
(rule §7 in CLAUDE.md). Checked = done.

## 🚀 Deployment / infra
- [ ] Configure git remote & push (`git remote add origin <url>`), then `git push -u origin main`.
- [ ] Choose host (Vercel / Netlify / Cloudflare Pages) and connect the repo.
- [ ] Set production domain and update `SITE.url` in `app/config/site.ts`.
- [ ] Add `@nuxtjs/sitemap` + `@nuxtjs/robots` for auto sitemap.xml / robots (currently a static robots.txt).
- [ ] Add analytics (privacy-friendly, e.g. Plausible) — update Privacy page + cookie note.

## 🖼️ Content & brand
- [ ] Replace free-licence placeholder photos in `public/images/**` with Orchidea's
      real product photography (compliance page already notes this).
- [ ] Get the official logo file from the owner; swap `BrandLogo.vue` / favicon if needed.
- [ ] Confirm full, current price list and opening hours directly with the owner
      (only Shopee-published prices are shown today; the rest are pre-order).
- [ ] Add real customer testimonials (with permission) — do NOT fabricate.
- [ ] Product detail pages (`/menu/[slug]`) with gallery, allergens, sizes.

## 🛒 E-commerce (phase 2)
- [ ] Cart & checkout flow (start client-side; keep WhatsApp order as fallback).
- [ ] Payment gateway integration (e.g. Midtrans / Xendit — popular in Indonesia).
- [ ] Order form with date picker enforcing the H-1 lead time.
- [ ] Delivery/pickup selection + area-based delivery fee.
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
