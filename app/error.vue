<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: `${t('notFound.title')} · Orchidea Dessert` })

const handleHome = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="err">
    <div class="err__inner container container--narrow">
      <BrandLogo tone="gold" />
      <p class="err__code">{{ error?.statusCode || 404 }}</p>
      <h1 class="err__title">{{ t('notFound.title') }}</h1>
      <p class="err__intro">{{ t('notFound.intro') }}</p>
      <UiButton variant="primary" size="lg" @click="handleHome">
        <template #icon-left><UiIcon name="arrow" :size="18" /></template>
        {{ t('notFound.cta') }}
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.err {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  background:
    radial-gradient(80% 60% at 50% 0%, rgba($gold-200, 0.5), transparent 70%),
    var(--c-cream);
}

.err__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-3;
  padding-block: $space-12;
}

.err__code {
  font-family: $font-display;
  font-size: fluid(72, 140);
  font-weight: $fw-medium;
  line-height: 1;
  color: var(--c-gold);
  margin-top: $space-4;
}

.err__title { font-size: fluid(28, 40); }
.err__intro { max-width: 44ch; color: var(--c-text-muted); font-size: $fs-lg; margin-bottom: $space-4; }
</style>
