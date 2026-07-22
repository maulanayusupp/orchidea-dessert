/**
 * robots.txt served dynamically so the site URL stays centralized in
 * config/site.ts → runtimeConfig.public.siteUrl (overridable via
 * NUXT_PUBLIC_SITE_URL). No hardcoded domain anywhere in the app.
 */
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '')
  setHeader(event, 'Content-Type', 'text/plain')
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
})
