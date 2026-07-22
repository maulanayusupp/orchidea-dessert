import { SITE } from '~/config/site'

interface SeoInput {
  title: string
  description: string
  /** Absolute or root-relative OG image path. Defaults to the brand card. */
  image?: string
  type?: 'website' | 'article' | 'product'
}

/**
 * Centralized SEO helper — sets title, description, Open Graph and Twitter tags
 * with sensible brand defaults and a canonical URL for the current route.
 * Keeps every page's <head> logic to a single call.
 */
export function useSeoMetaTags(input: SeoInput) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string) || SITE.url

  const image = input.image ?? '/og-image.jpg'
  const absoluteImage = image.startsWith('http') ? image : `${base}${image}`
  const canonical = `${base}${route.path}`
  const fullTitle =
    input.title === SITE.name ? SITE.name : `${input.title} · ${SITE.name}`

  useSeoMeta({
    title: fullTitle,
    description: input.description,
    ogTitle: fullTitle,
    ogDescription: input.description,
    ogType: input.type ?? 'website',
    ogSiteName: SITE.name,
    ogImage: absoluteImage,
    ogImageSecureUrl: absoluteImage,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: SITE.name,
    ogUrl: canonical,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: input.description,
    twitterImage: absoluteImage,
    twitterImageAlt: SITE.name,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
