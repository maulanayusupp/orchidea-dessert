<script setup lang="ts">
import { SITE } from '~/config/site'
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'

const { t, tm, rt, locale } = useI18n()
const story = computed(() => (tm('about.story') as unknown as string[]).map(rt))
interface Value { title: string; desc: string }
const values = computed(() => tm('about.values') as unknown as Value[])
const waUrl = computed(() =>
  buildWhatsAppOrderUrl(orderMessage()[locale.value as 'id' | 'en']),
)

useSeoMetaTags({
  title: t('about.title'),
  description: t('about.lead'),
})
</script>

<template>
  <div class="about">
    <header class="page-hero">
      <div class="container container--narrow page-hero__inner">
        <span class="eyebrow">{{ t('about.eyebrow') }}</span>
        <h1 class="page-hero__title">{{ t('about.title') }}</h1>
        <p class="page-hero__intro">{{ t('about.lead') }}</p>
      </div>
    </header>

    <section class="section about__story">
      <div class="container about__story-grid">
        <div class="about__images" v-reveal>
          <img class="about__img about__img--a" src="/images/about/about-chef.jpg" alt="" width="520" height="620" loading="lazy" />
          <img class="about__img about__img--b" src="/images/about/about-craft.jpg" alt="" width="360" height="360" loading="lazy" />
          <span class="about__seal"><BrandLogo tone="light" compact /></span>
        </div>
        <div class="about__copy" v-reveal>
          <p v-for="(para, i) in story" :key="i" class="about__para">{{ para }}</p>
          <UiButton :href="waUrl" external variant="primary" class="about__cta">
            <template #icon-left><UiIcon name="whatsapp" :size="18" /></template>
            {{ t('cta.order') }}
          </UiButton>
        </div>
      </div>
    </section>

    <section class="section about__values">
      <div class="container">
        <SectionHeading :title="t('about.valuesTitle')" center />
        <div class="values-grid">
          <article v-for="(v, i) in values" :key="i" class="value" v-reveal="{ delay: i * 70 }">
            <span class="value__icon"><UiIcon name="leaf" :size="22" /></span>
            <h3 class="value__title">{{ v.title }}</h3>
            <p class="value__desc">{{ v.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section about__band">
      <div class="container container--narrow about__band-inner" v-reveal>
        <h2 class="about__band-title">{{ t('about.ctaTitle') }}</h2>
        <p class="about__band-intro">{{ t('about.ctaIntro') }}</p>
        <div class="about__band-actions">
          <UiButton :href="waUrl" external variant="primary" size="lg">
            <template #icon-left><UiIcon name="whatsapp" :size="19" /></template>
            {{ t('cta.order') }}
          </UiButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-hero {
  padding-top: calc(var(--header-height) + #{fluid(36, 72)});
  padding-bottom: fluid(28, 52);
  text-align: center;
  background:
    radial-gradient(90% 70% at 50% 0%, rgba($gold-200, 0.5), transparent 70%),
    var(--c-cream);

  &__title { margin-top: $space-3; }
  &__intro { margin-top: $space-4; color: var(--c-text-muted); font-size: $fs-lg; }
}

.about__story-grid {
  display: grid;
  gap: fluid(28, 56);
  align-items: center;

  @include up('lg') { grid-template-columns: 0.9fr 1.1fr; }
}

.about__images {
  position: relative;
  padding-bottom: 12%;
}

.about__img {
  border-radius: var(--radius-xl);
  object-fit: cover;
  box-shadow: var(--shadow-md);

  &--a { width: 82%; aspect-ratio: 5 / 6; }
  &--b {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 46%;
    aspect-ratio: 1;
    border: 4px solid var(--c-cream-soft);
  }
}

.about__seal {
  position: absolute;
  top: 6%;
  right: 8%;
  display: inline-flex;
  padding: 0.7em;
  border-radius: var(--radius-pill);
  background: var(--c-green-deep);
  box-shadow: var(--shadow-md);
  font-size: 1.1rem;
}

.about__para {
  font-size: $fs-lg;
  color: var(--c-ink-soft);
  & + & { margin-top: $space-4; }
}

.about__cta { margin-top: $space-6; }

.about__values { background: var(--c-cream-soft); }

.values-grid {
  display: grid;
  gap: fluid(16, 24);
  grid-template-columns: 1fr;

  @include up('sm') { grid-template-columns: repeat(2, 1fr); }
  @include up('lg') { grid-template-columns: repeat(4, 1fr); }
}

.value {
  padding: fluid(22, 30);
  border-radius: var(--radius-lg);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  box-shadow: var(--shadow-sm);

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    border-radius: var(--radius-pill);
    background: rgba($gold-400, 0.16);
    color: var(--c-gold-deep);
  }

  &__title { margin-top: $space-4; font-size: fluid(18, 21); }
  &__desc { margin-top: $space-2; color: var(--c-text-muted); font-size: $fs-sm; }
}

.about__band {
  background:
    radial-gradient(80% 120% at 50% 0%, rgba($gold-500, 0.2), transparent 60%),
    var(--c-green-deep);
  color: $cream-50;
  text-align: center;
}

.about__band-title { color: $cream-50; }
.about__band-intro { margin-top: $space-3; color: rgba($cream-50, 0.8); font-size: $fs-lg; }
.about__band-actions { margin-top: $space-6; display: flex; justify-content: center; }
</style>
