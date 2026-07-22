<script setup lang="ts">
const { t } = useI18n()

useSeoMetaTags({
  title: 'Orchidea Dessert',
  description: t('home.hero.subtitle'),
})
useLocalBusinessJsonLd()
</script>

<template>
  <div class="home">
    <HomeHero />
    <HomeMarquee />
    <HomeCategories />
    <HomeSignatures />
    <HomePopular />
    <HomeProcess />
    <HomeTrust />
    <HomeVisit />
  </div>
</template>
