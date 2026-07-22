<script setup lang="ts">
import { SITE, CONTACT } from '~/config/site'

const { t } = useI18n()
const mapsQuery = CONTACT.address.mapsQuery
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
const mapEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`

const info = computed(() => [
  {
    icon: 'location',
    label: t('home.visit.addressLabel'),
    value: `${CONTACT.address.line}, ${CONTACT.address.district}, ${CONTACT.address.city}, ${CONTACT.address.province} ${CONTACT.address.postalCode}`,
  },
  { icon: 'phone', label: t('home.visit.phoneLabel'), value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneE164}` },
  { icon: 'clock', label: t('home.visit.hoursLabel'), value: t('footer.hours', { time: SITE.openingTime }) },
])
</script>

<template>
  <section class="section visit">
    <div class="container visit__grid">
      <div class="visit__info" v-reveal>
        <SectionHeading
          :eyebrow="t('home.visit.eyebrow')"
          :title="t('home.visit.title')"
          :intro="t('home.visit.intro')"
        />
        <ul class="visit__list" role="list">
          <li v-for="row in info" :key="row.label" class="visit__row">
            <span class="visit__icon"><UiIcon :name="row.icon" :size="20" /></span>
            <div>
              <span class="visit__label">{{ row.label }}</span>
              <a v-if="row.href" :href="row.href" class="visit__value visit__value--link">{{ row.value }}</a>
              <span v-else class="visit__value">{{ row.value }}</span>
            </div>
          </li>
        </ul>
        <UiButton :href="mapsUrl" external variant="primary">
          <template #icon-left><UiIcon name="location" :size="18" /></template>
          {{ t('cta.directions') }}
        </UiButton>
      </div>

      <div class="visit__map" v-reveal>
        <iframe
          :src="mapEmbed"
          :title="SITE.name"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.visit__grid {
  display: grid;
  gap: fluid(28, 48);
  align-items: center;

  @include up('lg') {
    grid-template-columns: 1fr 1.1fr;
  }
}

.visit__list {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  margin: 0 0 fluid(24, 32);
  padding: 0;
  list-style: none;
}

.visit__row {
  display: flex;
  gap: $space-3;
}

.visit__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 2.6em;
  height: 2.6em;
  border-radius: var(--radius-pill);
  background: rgba($gold-400, 0.16);
  color: var(--c-gold-deep);
}

.visit__label {
  display: block;
  font-size: $fs-xs;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.visit__value {
  display: block;
  margin-top: 2px;
  color: var(--c-ink);
  font-weight: $fw-medium;

  &--link:hover { color: var(--c-gold-deep); }
}

.visit__map {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--c-border);
  aspect-ratio: 4 / 3;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
}
</style>
