<script setup lang="ts">
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const waUrl = computed(() =>
  buildWhatsAppOrderUrl(orderMessage()[locale.value as 'id' | 'en']),
)
</script>

<template>
  <section class="hero">
    <div class="hero__glow" aria-hidden="true" />
    <div class="hero__inner container">
      <div class="hero__content">
        <span class="hero__eyebrow eyebrow">{{ t('home.hero.eyebrow') }}</span>
        <h1 class="hero__title">
          {{ t('home.hero.titleTop') }}<br />
          <span class="hero__accent accent-italic">{{ t('home.hero.titleAccent') }}</span>
        </h1>
        <p class="hero__subtitle">{{ t('home.hero.subtitle') }}</p>

        <div class="hero__rating">
          <span class="hero__stars" aria-hidden="true">
            <UiIcon v-for="n in 5" :key="n" name="star" :size="18" />
          </span>
          <span class="hero__rating-text">{{ t('home.hero.ratingText') }}</span>
        </div>

        <div class="hero__actions">
          <UiButton :href="waUrl" external variant="primary" size="lg">
            <template #icon-left><UiIcon name="whatsapp" :size="19" /></template>
            {{ t('cta.order') }}
          </UiButton>
          <UiButton :to="localePath('/menu')" variant="ghost" size="lg" class="hero__ghost">
            {{ t('cta.viewMenu') }}
            <template #icon><UiIcon name="arrow" :size="18" /></template>
          </UiButton>
        </div>
      </div>

      <div class="hero__gallery" aria-hidden="true">
        <div class="hero__frame hero__frame--main">
          <img src="/images/hero/hero-1.jpg" alt="" width="620" height="760" fetchpriority="high" />
        </div>
        <div class="hero__frame hero__frame--float">
          <img src="/images/hero/hero-2.jpg" alt="" width="320" height="320" loading="lazy" />
        </div>
        <div class="hero__chip">
          <span class="hero__chip-k">{{ $t('product.preorder') }}</span>
          <span class="hero__chip-v">{{ $t('home.hero.scroll') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-top: calc(var(--header-height) + #{fluid(28, 56)});
  padding-bottom: fluid(40, 88);
  color: $cream-50;
  background:
    radial-gradient(120% 80% at 80% -10%, rgba($gold-500, 0.24), transparent 55%),
    linear-gradient(160deg, $green-900 0%, #1b2716 60%, #16200f 100%);

  &__glow {
    position: absolute;
    inset: auto -10% -30% auto;
    width: 55%;
    aspect-ratio: 1;
    background: radial-gradient(circle, rgba($gold-400, 0.22), transparent 70%);
    filter: blur(20px);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    display: grid;
    gap: fluid(32, 48);
    align-items: center;
    min-height: min(84vh, 760px);

    @include up('lg') {
      grid-template-columns: 1.05fr 0.95fr;
    }
  }

  &__content {
    max-width: 34rem;
  }

  &__eyebrow {
    color: $gold-300;
  }

  &__title {
    margin-top: $space-4;
    color: $cream-50;
  }

  &__accent {
    color: $gold-300;
  }

  &__subtitle {
    margin-top: $space-5;
    font-size: fluid(16, 19);
    color: rgba($cream-50, 0.82);
    max-width: 40ch;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-top: $space-5;
  }

  &__stars {
    display: inline-flex;
    color: $gold-300;
  }

  &__rating-text {
    font-size: $fs-sm;
    color: rgba($cream-50, 0.78);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
    margin-top: $space-6;
  }

  &__ghost {
    color: $cream-50;
    border-color: rgba($cream-50, 0.4);
    &:hover { background: rgba($cream-50, 0.1); border-color: $cream-50; }
  }

  // Gallery
  &__gallery {
    position: relative;
    display: none;

    @include up('lg') {
      display: block;
      min-height: 560px;
    }
  }

  &__frame {
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    border: 3px solid rgba($gold-300, 0.5);

    img { width: 100%; height: 100%; object-fit: cover; display: block; }

    &--main {
      width: 74%;
      margin-left: auto;
      aspect-ratio: 3 / 4;
      border-radius: 50% 50% var(--radius-lg) var(--radius-lg) / 34% 34% var(--radius-lg) var(--radius-lg);
      animation: float 7s var(--ease-soft) infinite;
    }

    &--float {
      position: absolute;
      left: 0;
      bottom: 8%;
      width: 42%;
      aspect-ratio: 1;
      border-radius: var(--radius-xl);
      animation: float 8s var(--ease-soft) infinite reverse;
    }
  }

  &__chip {
    position: absolute;
    top: 8%;
    left: 4%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: $space-3 $space-4;
    border-radius: var(--radius-md);
    @include glass(rgba($cream-50, 0.92));
    color: var(--c-ink);
    box-shadow: var(--shadow-md);
  }

  &__chip-k {
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    color: var(--c-gold-deep);
  }

  &__chip-v {
    font-size: $fs-xs;
    color: var(--c-text-muted);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__frame { animation: none; }
}
</style>
