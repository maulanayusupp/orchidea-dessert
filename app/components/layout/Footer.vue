<script setup lang="ts">
import { SITE, CONTACT, SOCIALS } from '~/config/site'
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const year = 2026 // build-time constant; bump on release

const waUrl = computed(() =>
  buildWhatsAppOrderUrl(orderMessage()[locale.value as 'id' | 'en']),
)
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.mapsQuery}`

const explore = [
  { key: 'menu', to: '/menu' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]
const legal = [
  { key: 'privacy', to: '/legal/privacy' },
  { key: 'terms', to: '/legal/terms' },
  { key: 'compliance', to: '/legal/compliance' },
]
const socials = [
  { name: 'Instagram', icon: 'instagram', url: SOCIALS.instagram },
  { name: 'TikTok', icon: 'tiktok', url: SOCIALS.tiktok },
  { name: 'WhatsApp', icon: 'whatsapp', url: SOCIALS.linktree },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__top container">
      <div class="footer__brand">
        <BrandLogo tone="light" />
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
        <div class="footer__socials">
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social"
            :aria-label="s.name"
          >
            <UiIcon :name="s.icon" :size="20" />
          </a>
        </div>
      </div>

      <nav class="footer__col" :aria-label="t('footer.explore')">
        <h4 class="footer__heading">{{ t('footer.explore') }}</h4>
        <NuxtLink v-for="l in explore" :key="l.key" :to="localePath(l.to)" class="footer__link">
          {{ t(`nav.${l.key}`) }}
        </NuxtLink>
      </nav>

      <nav class="footer__col" :aria-label="t('footer.legal')">
        <h4 class="footer__heading">{{ t('footer.legal') }}</h4>
        <NuxtLink v-for="l in legal" :key="l.key" :to="localePath(l.to)" class="footer__link">
          {{ t(`legal.${l.key}.short`) }}
        </NuxtLink>
      </nav>

      <div class="footer__col">
        <h4 class="footer__heading">{{ t('footer.visit') }}</h4>
        <a :href="mapsUrl" target="_blank" rel="noopener noreferrer" class="footer__contact">
          <UiIcon name="location" :size="18" />
          <span>{{ CONTACT.address.line }}, {{ CONTACT.address.district }},
            {{ CONTACT.address.city }} {{ CONTACT.address.postalCode }}</span>
        </a>
        <a :href="`tel:${CONTACT.phoneE164}`" class="footer__contact">
          <UiIcon name="phone" :size="18" />
          <span>{{ CONTACT.phoneDisplay }}</span>
        </a>
        <p class="footer__contact">
          <UiIcon name="clock" :size="18" />
          <span>{{ t('footer.hours', { time: SITE.openingTime }) }}</span>
        </p>
        <UiButton :href="waUrl" external variant="primary" size="sm" class="footer__cta">
          <template #icon-left><UiIcon name="whatsapp" :size="16" /></template>
          {{ t('cta.order') }}
        </UiButton>
      </div>
    </div>

    <div class="footer__bottom container">
      <p>© {{ year }} {{ SITE.legalName }}. {{ t('footer.rights') }}</p>
      <p class="footer__note">{{ t('footer.madeWith') }}</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: var(--c-green-deep);
  color: rgba($cream-50, 0.82);
  padding-top: fluid(48, 88);

  &__top {
    display: grid;
    gap: fluid(28, 40);
    grid-template-columns: 1fr;
    padding-bottom: $space-8;

    @include up('md') {
      grid-template-columns: 1.6fr 1fr 1fr;
    }
    @include up('lg') {
      grid-template-columns: 2fr 1fr 1fr 1.4fr;
    }
  }

  &__brand {
    font-size: 1.05rem;
  }

  &__tagline {
    margin-top: $space-4;
    max-width: 34ch;
    color: rgba($cream-50, 0.72);
  }

  &__socials {
    display: flex;
    gap: $space-3;
    margin-top: $space-5;
  }

  &__social {
    display: inline-flex;
    padding: 0.6em;
    border-radius: var(--radius-pill);
    border: 1px solid rgba($cream-50, 0.2);
    color: $cream-50;
    transition: background-color $dur-fast var(--ease-out), border-color $dur-fast var(--ease-out);

    &:hover {
      background: rgba($gold-400, 0.24);
      border-color: $gold-300;
    }
  }

  &__heading {
    color: $gold-300;
    font-family: $font-body;
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: $space-4;
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    align-items: flex-start;
  }

  &__link {
    color: rgba($cream-50, 0.82);
    transition: color $dur-fast var(--ease-out);
    &:hover { color: $gold-300; }
  }

  &__contact {
    display: flex;
    gap: $space-2;
    align-items: flex-start;
    color: rgba($cream-50, 0.82);
    line-height: 1.5;
    :deep(.icon) { color: $gold-300; margin-top: 2px; }
    &:hover { color: $cream-50; }
  }

  &__cta {
    margin-top: $space-2;
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2 $space-5;
    justify-content: space-between;
    padding-block: $space-5;
    margin-top: $space-4;
    border-top: 1px solid rgba($cream-50, 0.14);
    font-size: $fs-sm;
    color: rgba($cream-50, 0.6);
  }
}
</style>
