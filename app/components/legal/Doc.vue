<script setup lang="ts">
/** Renders a legal/compliance document from i18n (`legal.<docKey>`), so privacy,
 *  terms and compliance stay fully translatable and share one layout. */
const props = defineProps<{ docKey: 'privacy' | 'terms' | 'compliance' }>()

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

interface Section { heading: string; body: string[] }
const sections = computed(() => tm(`legal.${props.docKey}.sections`) as unknown as Section[])

const tabs = [
  { key: 'privacy', to: '/legal/privacy' },
  { key: 'terms', to: '/legal/terms' },
  { key: 'compliance', to: '/legal/compliance' },
] as const

useSeoMetaTags({
  title: t(`legal.${props.docKey}.title`),
  description: t(`legal.${props.docKey}.intro`),
})
</script>

<template>
  <div class="legal">
    <header class="page-hero">
      <div class="container container--narrow page-hero__inner">
        <span class="eyebrow">{{ t('footer.legal') }}</span>
        <h1 class="page-hero__title">{{ t(`legal.${docKey}.title`) }}</h1>
        <p class="page-hero__intro">{{ t(`legal.${docKey}.intro`) }}</p>
        <p class="legal__updated">{{ t('legal.updated') }}</p>
      </div>
    </header>

    <section class="section legal__body">
      <div class="container container--narrow">
        <nav class="legal__tabs" :aria-label="t('footer.legal')">
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.key"
            :to="localePath(tab.to)"
            class="legal__tab"
          >
            {{ t(`legal.${tab.key}.short`) }}
          </NuxtLink>
        </nav>

        <article class="legal__content">
          <section v-for="(s, i) in sections" :key="i" class="legal__section">
            <h2 class="legal__heading">{{ rt(s.heading) }}</h2>
            <p v-for="(para, j) in s.body" :key="j" class="legal__para">{{ rt(para) }}</p>
          </section>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-hero {
  padding-top: calc(var(--header-height) + #{fluid(36, 72)});
  padding-bottom: fluid(24, 44);
  text-align: center;
  background:
    radial-gradient(90% 70% at 50% 0%, rgba($gold-200, 0.5), transparent 70%),
    var(--c-cream);

  &__title { margin-top: $space-3; }
  &__intro { margin-top: $space-4; color: var(--c-text-muted); font-size: $fs-lg; }
}

.legal__updated {
  margin-top: $space-3;
  font-size: $fs-sm;
  color: var(--c-text-muted);
}

.legal__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  justify-content: center;
  margin-bottom: fluid(28, 44);
}

.legal__tab {
  padding: 0.5em 1.1em;
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-border);
  font-size: $fs-sm;
  font-weight: $fw-medium;
  color: var(--c-ink-soft);
  transition: all $dur-fast var(--ease-out);

  &:hover { border-color: var(--c-gold); color: var(--c-gold-deep); }
  &.router-link-active {
    background: var(--c-green-deep);
    color: $cream-50;
    border-color: transparent;
  }
}

.legal__section + .legal__section { margin-top: fluid(24, 36); }

.legal__heading {
  font-size: fluid(20, 26);
  padding-bottom: $space-2;
  border-bottom: 1px solid var(--c-border);
}

.legal__para {
  margin-top: $space-3;
  color: var(--c-ink-soft);
  font-size: $fs-lg;
}
</style>
