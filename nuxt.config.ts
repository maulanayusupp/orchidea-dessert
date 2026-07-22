// https://nuxt.com/docs/api/configuration/nuxt-config
import { SITE } from './app/config/site'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@vueuse/nuxt'],

  // Centralized global stylesheet (no inline CSS anywhere in the app).
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-inject design tokens (variables, functions, mixins) into every
          // SCSS block so components never re-import them manually.
          additionalData: '@use "~/assets/scss/abstracts" as *;\n',
        },
      },
    },
  },

  // Sensible SEO-friendly defaults; per-page meta is set with useSeoMeta().
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#a67c2e' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'orchidea_lang',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    locales: [
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    // v9 resolves langDir relative to <rootDir>/i18n
    langDir: 'locales',
    bundle: { optimizeTranslationDirective: false },
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE.url,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en'],
    },
  },
})
