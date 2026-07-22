<script setup lang="ts">
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const nav = [
  { key: 'home', to: '/' },
  { key: 'menu', to: '/menu' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]

const waUrl = computed(() =>
  buildWhatsAppOrderUrl(orderMessage()[locale.value as 'id' | 'en']),
)

// The transparent (white-text) header only reads well over the dark home hero.
// Everywhere else the page starts on a light background, so the header must be
// solid (dark text) from the top. It also turns solid once the hero is scrolled.
const isHome = computed(() => route.path === localePath('/'))
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 24)
const solid = computed(() => scrolled.value || open.value || !isHome.value)

// Mobile drawer
const open = ref(false)
const close = () => (open.value = false)
watch(() => route.fullPath, close)
watch(open, (v) => {
  if (import.meta.client) document.documentElement.classList.toggle('u-no-scroll', v)
})
onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.classList.remove('u-no-scroll')
})
</script>

<template>
  <header class="header" :class="{ 'is-solid': solid }">
    <div class="header__bar container">
      <NuxtLink :to="localePath('/')" class="header__brand" aria-label="Orchidea Dessert — home">
        <BrandLogo :tone="solid ? 'gold' : 'light'" />
      </NuxtLink>

      <nav class="header__nav" :aria-label="t('nav.primary')">
        <NuxtLink
          v-for="item in nav"
          :key="item.key"
          :to="localePath(item.to)"
          class="header__link"
        >
          {{ t(`nav.${item.key}`) }}
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <LanguageSwitcher class="header__lang" />
        <UiButton :href="waUrl" external size="sm" variant="primary" class="header__cta">
          <template #icon-left><UiIcon name="whatsapp" :size="16" /></template>
          {{ t('cta.order') }}
        </UiButton>
        <button
          class="header__burger"
          :aria-expanded="open"
          :aria-label="t('nav.toggle')"
          @click="open = !open"
        >
          <UiIcon :name="open ? 'close' : 'menu'" :size="26" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="open" class="drawer">
        <nav class="drawer__nav" :aria-label="t('nav.primary')">
          <NuxtLink
            v-for="item in nav"
            :key="item.key"
            :to="localePath(item.to)"
            class="drawer__link"
            @click="close"
          >
            {{ t(`nav.${item.key}`) }}
          </NuxtLink>
        </nav>
        <div class="drawer__foot">
          <LanguageSwitcher />
          <UiButton :href="waUrl" external variant="primary" block>
            <template #icon-left><UiIcon name="whatsapp" :size="18" /></template>
            {{ t('cta.order') }}
          </UiButton>
        </div>
      </div>
    </Transition>
    <div v-if="open" class="header__scrim" @click="close" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: $z-header;
  transition: background-color $dur-base var(--ease-out), box-shadow $dur-base var(--ease-out);

  &.is-solid {
    @include glass(rgba($cream-50, 0.86));
    box-shadow: 0 1px 0 var(--c-border), var(--shadow-sm);
  }

  &__bar {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
  }

  &__brand {
    font-size: 1rem;
    z-index: 1;
  }

  &__nav {
    display: none;
    gap: fluid(18, 34);

    @include up('lg') {
      display: flex;
    }
  }

  &__link {
    position: relative;
    font-weight: $fw-medium;
    font-size: $fs-sm;
    letter-spacing: 0.04em;
    color: var(--c-text);
    padding-block: 0.4em;
    transition: color $dur-fast var(--ease-out);

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1.5px;
      background: var(--c-gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform $dur-base var(--ease-out);
    }

    &:hover::after,
    &.router-link-active::after {
      transform: scaleX(1);
    }
  }

  // On the transparent (top-of-hero) state, links sit on the dark hero.
  &:not(.is-solid) &__link {
    color: $cream-50;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__lang {
    display: none;
    @include up('md') {
      display: inline-flex;
    }
  }

  &__cta {
    display: none;
    @include up('md') {
      display: inline-flex;
    }
  }

  &__burger {
    @include button-reset;
    display: inline-flex;
    color: var(--c-ink);
    padding: 4px;
    @include up('lg') {
      display: none;
    }
  }

  &:not(.is-solid) &__burger {
    color: $cream-50;
  }

  &__scrim {
    position: fixed;
    inset: var(--header-height) 0 0 0;
    background: rgba($ink-900, 0.4);
    z-index: -1;
    @include up('lg') {
      display: none;
    }
  }
}

.drawer {
  @include glass(rgba($cream-50, 0.98));
  padding: $space-5 var(--gutter) $space-8;
  box-shadow: var(--shadow-md);
  border-top: 1px solid var(--c-border);

  &__nav {
    display: flex;
    flex-direction: column;
  }

  &__link {
    padding: $space-3 0;
    font-family: $font-display;
    font-size: fluid(22, 28);
    color: var(--c-ink);
    border-bottom: 1px solid var(--c-border);
  }

  &__foot {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-top: $space-5;
    align-items: flex-start;
  }

  @include up('lg') {
    display: none;
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity $dur-base var(--ease-out), transform $dur-base var(--ease-out);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
