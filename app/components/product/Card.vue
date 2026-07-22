<script setup lang="ts">
import type { Product } from '~/types/catalog'
import { formatIDR } from '~/utils/format'
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'

const props = defineProps<{ product: Product }>()

const { t, locale } = useI18n()
const { name, desc, tt } = useCatalog()
const { categoryBySlug } = useCatalog()

const category = computed(() => categoryBySlug(props.product.category))
const waUrl = computed(() =>
  buildWhatsAppOrderUrl(orderMessage(name(props.product))[locale.value as 'id' | 'en']),
)
</script>

<template>
  <article class="card">
    <div class="card__media">
      <img
        :src="product.image"
        :alt="name(product)"
        loading="lazy"
        decoding="async"
        width="600"
        height="450"
      />
      <span v-if="product.signature" class="card__badge">
        <UiIcon name="sparkle" :size="13" /> {{ t('product.signature') }}
      </span>
      <span v-if="category" class="card__cat">{{ tt(category.name) }}</span>
    </div>

    <div class="card__body">
      <h3 class="card__name">{{ name(product) }}</h3>
      <p class="card__desc">{{ desc(product) }}</p>

      <ul v-if="product.variants?.length" class="card__variants" role="list">
        <li v-for="v in product.variants.slice(0, 3)" :key="v">{{ v }}</li>
        <li v-if="product.variants.length > 3" class="card__variants-more">
          +{{ product.variants.length - 3 }}
        </li>
      </ul>

      <div class="card__foot">
        <div class="card__price">
          <template v-if="product.priceIDR !== null">
            <span class="card__from">{{ t('product.from') }}</span>
            <span class="card__amount">{{ formatIDR(product.priceIDR) }}</span>
          </template>
          <span v-else class="card__po">{{ t('product.preorder') }}</span>
        </div>
        <a
          :href="waUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="card__order"
          :aria-label="`${t('cta.order')} — ${name(product)}`"
        >
          <UiIcon name="whatsapp" :size="16" />
          <span>{{ t('cta.order') }}</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--c-border);
  transition: transform $dur-base var(--ease-out), box-shadow $dur-base var(--ease-out);

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);

    .card__media img {
      transform: scale(1.06);
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--c-cream-deep);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s var(--ease-out);
    }
  }

  &__badge {
    position: absolute;
    top: $space-3;
    left: $space-3;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0.34em 0.7em;
    border-radius: var(--radius-pill);
    background: linear-gradient(135deg, $gold-400, $gold-600);
    color: $cream-50;
    font-size: $fs-xs;
    font-weight: $fw-semibold;
    letter-spacing: 0.04em;
    box-shadow: var(--shadow-sm);
  }

  &__cat {
    position: absolute;
    bottom: $space-3;
    left: $space-3;
    padding: 0.3em 0.75em;
    border-radius: var(--radius-pill);
    @include glass(rgba($cream-50, 0.8));
    color: var(--c-green-deep);
    font-size: $fs-xs;
    font-weight: $fw-medium;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: fluid(16, 22);
  }

  &__name {
    font-size: fluid(19, 23);
  }

  &__desc {
    margin-top: $space-2;
    color: var(--c-text-muted);
    font-size: $fs-sm;
    @include line-clamp(2);
  }

  &__variants {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: $space-3;
    list-style: none;
    padding: 0;

    li {
      padding: 0.24em 0.6em;
      border-radius: var(--radius-sm);
      background: var(--c-cream);
      color: var(--c-ink-soft);
      font-size: $fs-xs;
    }
  }

  &__variants-more {
    color: var(--c-gold-deep) !important;
    font-weight: $fw-semibold;
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    margin-top: auto;
    padding-top: $space-4;
  }

  &__price {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  &__from {
    font-size: $fs-xs;
    color: var(--c-text-muted);
  }

  &__amount {
    font-family: $font-display;
    font-weight: $fw-semibold;
    font-size: fluid(18, 22);
    color: var(--c-ink);
  }

  &__po {
    font-weight: $fw-medium;
    font-size: $fs-sm;
    color: var(--c-teal);
  }

  &__order {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.55em 0.9em;
    border-radius: var(--radius-pill);
    background: var(--c-green-deep);
    color: $cream-50;
    font-size: $fs-sm;
    font-weight: $fw-medium;
    transition: background-color $dur-fast var(--ease-out), transform $dur-fast var(--ease-out);

    &:hover {
      background: $green-700;
      transform: translateY(-2px);
    }
  }
}
</style>
