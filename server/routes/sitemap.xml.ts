/**
 * Dynamic sitemap. Lists every page in both locales (ID default has no prefix,
 * EN is prefixed with /en) using the runtime site URL so it stays correct when
 * the production domain is set via NUXT_PUBLIC_SITE_URL.
 */
import { products } from '~/data/products'

const PATHS = [
  '/',
  '/menu',
  '/about',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/legal/compliance',
  // Product detail pages (evidence-based catalog).
  ...products.map((p) => `/menu/${p.slug}`),
]

export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '')

  const urls = PATHS.flatMap((path) => {
    const id = path === '/' ? '' : path
    return [
      { loc: `${base}${id || '/'}`, priority: path === '/' ? '1.0' : '0.7' },
      { loc: `${base}/en${id}`, priority: path === '/' ? '0.9' : '0.6' },
    ]
  })

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return body
})
