<script setup lang="ts">
import { formatIDR, priceFrom } from '~/utils/format'
import { buildWhatsAppOrderUrl, orderMessage } from '~/utils/whatsapp'
import type { ProductSize } from '~/types/catalog'

const route = useRoute()
const { t, locale } = useI18n()

const sizeLabel = (s: ProductSize) => `${t(`product.size.${s.shape}`)} ${s.dim}`
const localePath = useLocalePath()
const { products, productBySlug, categoryBySlug, name, desc, tt } = useCatalog()

const product = computed(() => productBySlug(route.params.slug as string))

// Unknown slug → proper 404 (renders app/error.vue with the notFound copy).
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

const category = computed(() =>
  product.value ? categoryBySlug(product.value.category) : undefined,
)

const related = computed(() => {
  const cur = product.value
  if (!cur) return []
  const same = products.value.filter((p) => p.category === cur.category && p.slug !== cur.slug)
  const others = products.value.filter((p) => p.category !== cur.category && p.slug !== cur.slug)
  return [...same, ...others].slice(0, 3)
})

const waUrl = computed(() => {
  const p = product.value
  if (!p) return '#'
  return buildWhatsAppOrderUrl(orderMessage(name(p))[locale.value as 'id' | 'en'])
})

const highlights = computed(() => [
  { icon: 'clock', title: t('product.detail.leadTitle'), desc: t('product.detail.leadDesc') },
  { icon: 'sparkle', title: t('product.detail.madeTitle'), desc: t('product.detail.madeDesc') },
  { icon: 'leaf', title: t('product.detail.allergenTitle'), desc: t('product.detail.allergen') },
])

// Safe to read directly: the createError guard above returns on an unknown slug.
// Switching locale navigates to a prefixed route (full remount), so a one-time
// call reflects the active locale correctly.
const current = product.value!
useSeoMetaTags({
  title: name(current),
  description: desc(current),
  image: current.image,
  type: 'product',
})
useProductJsonLd(product)
</script>

<template>
  <div v-if="product" class="pd">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="crumbs" aria-label="Breadcrumb">
        <NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink :to="localePath('/menu')">{{ t('nav.menu') }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink
          v-if="category"
          :to="localePath({ path: '/menu', query: { category: category.slug } })"
        >{{ tt(category.name) }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="crumbs__current">{{ name(product) }}</span>
      </nav>

      <div class="pd__grid">
        <!-- Media -->
        <div class="pd__media" v-reveal>
          <img :src="product.image" :alt="name(product)" width="820" height="900" />
          <span v-if="product.signature" class="pd__badge">
            <UiIcon name="sparkle" :size="14" /> {{ t('product.signature') }}
          </span>
        </div>

        <!-- Info -->
        <div class="pd__info" v-reveal>
          <NuxtLink
            v-if="category"
            :to="localePath({ path: '/menu', query: { category: category.slug } })"
            class="pd__cat"
          >{{ tt(category.name) }}</NuxtLink>
          <h1 class="pd__name">{{ name(product) }}</h1>
          <p class="pd__desc">{{ desc(product) }}</p>

          <div v-if="product.variants?.length" class="pd__variants">
            <span class="pd__variants-label">{{ t('product.detail.variants') }}</span>
            <ul role="list">
              <li v-for="v in product.variants" :key="v">{{ v }}</li>
            </ul>
          </div>

          <div class="pd__price">
            <template v-if="priceFrom(product) !== null">
              <span v-if="product.sizes?.length" class="pd__price-from">{{ t('product.from') }}</span>
              <span class="pd__price-amount">{{ formatIDR(priceFrom(product)!) }}</span>
            </template>
            <span v-else class="pd__price-po">{{ t('product.preorder') }}</span>
          </div>

          <div v-if="product.sizes?.length" class="pd__sizes">
            <span class="pd__sizes-label">{{ t('product.detail.sizes') }}</span>
            <ul role="list">
              <li v-for="(s, i) in product.sizes" :key="i">
                <span class="pd__sizes-name">{{ sizeLabel(s) }}</span>
                <span class="pd__sizes-price">
                  {{ s.priceIDR !== null ? formatIDR(s.priceIDR) : '—' }}
                </span>
              </li>
            </ul>
          </div>

          <div class="pd__actions">
            <UiButton :href="waUrl" external variant="primary" size="lg">
              <template #icon-left><UiIcon name="whatsapp" :size="19" /></template>
              {{ t('product.detail.orderCta') }}
            </UiButton>
            <UiButton :to="localePath('/menu')" variant="ghost" size="lg">
              <template #icon-left><UiIcon name="arrow" :size="18" /></template>
              {{ t('product.detail.back') }}
            </UiButton>
          </div>

          <p class="pd__note">{{ t('product.priceNote') }}</p>
        </div>
      </div>

      <!-- Highlights -->
      <ul class="pd__highlights" role="list">
        <li v-for="h in highlights" :key="h.title" class="pd__hl" v-reveal>
          <span class="pd__hl-icon"><UiIcon :name="h.icon" :size="20" /></span>
          <div>
            <h3 class="pd__hl-title">{{ h.title }}</h3>
            <p class="pd__hl-desc">{{ h.desc }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Related -->
    <section v-if="related.length" class="section pd__related">
      <div class="container">
        <SectionHeading :title="t('product.detail.related')" center />
        <div class="pd__related-grid">
          <div v-for="(p, i) in related" :key="p.slug" v-reveal="{ delay: i * 60 }">
            <ProductCard :product="p" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.pd {
  padding-top: calc(var(--header-height) + #{fluid(24, 44)});
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-2;
  font-size: $fs-sm;
  color: var(--c-text-muted);
  margin-bottom: fluid(20, 32);

  a:hover { color: var(--c-gold-deep); }
  &__current { color: var(--c-ink); font-weight: $fw-medium; }
}

.pd__grid {
  display: grid;
  gap: fluid(24, 56);
  align-items: start;

  @include up('lg') { grid-template-columns: 1fr 1fr; }
}

.pd__media {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  aspect-ratio: 4 / 5;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.pd__badge {
  position: absolute;
  top: $space-4;
  left: $space-4;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0.4em 0.8em;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, $gold-400, $gold-600);
  color: $cream-50;
  font-size: $fs-xs;
  font-weight: $fw-semibold;
  box-shadow: var(--shadow-sm);
}

.pd__info { @include up('lg') { padding-top: $space-4; } }

.pd__cat {
  display: inline-block;
  padding: 0.3em 0.8em;
  border-radius: var(--radius-pill);
  background: rgba($gold-400, 0.16);
  color: var(--c-gold-deep);
  font-size: $fs-sm;
  font-weight: $fw-medium;

  &:hover { background: rgba($gold-400, 0.28); }
}

.pd__name { margin-top: $space-4; }

.pd__desc {
  margin-top: $space-4;
  font-size: fluid(17, 20);
  color: var(--c-ink-soft);
}

.pd__variants {
  margin-top: $space-5;

  &-label {
    display: block;
    font-size: $fs-xs;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-text-muted);
    margin-bottom: $space-2;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0.34em 0.85em;
    border-radius: var(--radius-pill);
    border: 1px solid var(--c-border);
    font-size: $fs-sm;
    color: var(--c-ink-soft);
  }
}

.pd__price {
  display: flex;
  align-items: baseline;
  gap: $space-2;
  margin-top: fluid(20, 28);

  &-from { font-size: $fs-sm; color: var(--c-text-muted); }
  &-amount {
    font-family: $font-display;
    font-weight: $fw-semibold;
    font-size: fluid(30, 42);
    color: var(--c-ink);
  }
  &-po {
    font-size: fluid(20, 26);
    font-weight: $fw-medium;
    color: var(--c-teal);
  }
}

.pd__sizes {
  margin-top: fluid(16, 22);

  &-label {
    display: block;
    font-size: $fs-xs;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-text-muted);
    margin-bottom: $space-2;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0;
    margin: 0;
    list-style: none;
    max-width: 340px;
  }

  li {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: $space-4;
    padding: 0.5em 0;
    border-bottom: 1px dashed var(--c-border);
  }

  &-name { color: var(--c-ink-soft); }
  &-price { font-weight: $fw-semibold; color: var(--c-ink); font-family: $font-display; font-size: 1.1em; }
}

.pd__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
  margin-top: fluid(20, 28);
}

.pd__note {
  margin-top: $space-4;
  font-size: $fs-sm;
  color: var(--c-text-muted);
}

.pd__highlights {
  display: grid;
  gap: fluid(14, 22);
  margin: fluid(40, 72) 0 0;
  padding: 0;
  list-style: none;
  grid-template-columns: 1fr;

  @include up('md') { grid-template-columns: repeat(3, 1fr); }
}

.pd__hl {
  display: flex;
  gap: $space-3;
  padding: fluid(18, 24);
  border-radius: var(--radius-lg);
  background: var(--c-cream-soft);
  border: 1px solid var(--c-border);

  &-icon {
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

  &-title { font-size: fluid(16, 18); }
  &-desc { margin-top: 4px; font-size: $fs-sm; color: var(--c-text-muted); }
}

.pd__related { margin-top: fluid(16, 32); background: var(--c-cream-soft); }

.pd__related-grid {
  display: grid;
  gap: fluid(16, 24);
  grid-template-columns: 1fr;

  @include up('sm') { grid-template-columns: repeat(2, 1fr); }
  @include up('lg') { grid-template-columns: repeat(3, 1fr); }
}
</style>
