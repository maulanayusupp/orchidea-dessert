<script setup lang="ts">
import { formatIDR, priceFrom } from '~/utils/format'
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'

const { t, locale } = useI18n()
const { signature, name, desc } = useCatalog()
const items = computed(() => signature.value.slice(0, 3))
const waFor = (n: string) =>
  buildWhatsAppOrderUrl(orderMessage(n)[locale.value as 'id' | 'en'])
</script>

<template>
  <section class="section signatures">
    <div class="container">
      <SectionHeading
        :eyebrow="t('home.signatures.eyebrow')"
        :title="t('home.signatures.title')"
        :intro="t('home.signatures.intro')"
      />

      <div class="signatures__list">
        <article
          v-for="(p, i) in items"
          :key="p.slug"
          class="feat"
          :class="{ 'feat--rev': i % 2 === 1 }"
          v-reveal
        >
          <div class="feat__media">
            <img :src="p.image" :alt="name(p)" loading="lazy" width="720" height="560" />
            <span class="feat__num">0{{ i + 1 }}</span>
          </div>
          <div class="feat__text">
            <span class="eyebrow">{{ t('product.signature') }}</span>
            <h3 class="feat__name">{{ name(p) }}</h3>
            <p class="feat__desc">{{ desc(p) }}</p>
            <ul v-if="p.variants?.length" class="feat__variants" role="list">
              <li v-for="v in p.variants" :key="v">{{ v }}</li>
            </ul>
            <div class="feat__foot">
              <span v-if="priceFrom(p) !== null" class="feat__price">
                {{ t('product.from') }} <strong>{{ formatIDR(priceFrom(p)!) }}</strong>
              </span>
              <span v-else class="feat__po">{{ t('product.preorder') }}</span>
              <UiButton :href="waFor(name(p))" external variant="dark" size="sm">
                <template #icon-left><UiIcon name="whatsapp" :size="16" /></template>
                {{ t('cta.orderShort') }}
              </UiButton>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.signatures {
  background: var(--c-cream-soft);
}

.signatures__list {
  display: flex;
  flex-direction: column;
  gap: fluid(40, 80);
}

.feat {
  display: grid;
  gap: fluid(20, 48);
  align-items: center;

  @include up('md') {
    grid-template-columns: 1.05fr 0.95fr;

    &--rev .feat__media { order: 2; }
  }

  &__media {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    aspect-ratio: 5 / 4;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__num {
    position: absolute;
    top: $space-3;
    right: $space-4;
    font-family: $font-display;
    font-size: fluid(40, 68);
    font-weight: $fw-medium;
    color: rgba($cream-50, 0.9);
    text-shadow: 0 2px 18px rgba($ink-900, 0.4);
  }

  &__name {
    margin-top: $space-2;
  }

  &__desc {
    margin-top: $space-3;
    color: var(--c-text-muted);
    font-size: $fs-lg;
  }

  &__variants {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: $space-4;
    padding: 0;
    list-style: none;

    li {
      padding: 0.3em 0.8em;
      border-radius: var(--radius-pill);
      border: 1px solid var(--c-border);
      font-size: $fs-sm;
      color: var(--c-ink-soft);
    }
  }

  &__foot {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-top: $space-5;
    flex-wrap: wrap;
  }

  &__price {
    font-size: $fs-lg;
    strong { font-family: $font-display; font-size: 1.2em; color: var(--c-ink); }
  }

  &__po {
    color: var(--c-teal);
    font-weight: $fw-medium;
  }
}
</style>
