<script setup lang="ts">
// Global <head> defaults for every page. i18n's useLocaleHead injects the
// <html lang>, hreflang alternate links and og:locale tags for SEO; per-page
// title/description/OG come from useSeoMetaTags().
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
