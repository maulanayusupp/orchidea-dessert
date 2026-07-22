<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { products, categories, tt } = useCatalog()

// Active category comes from the URL query so filters are shareable/bookmarkable.
const active = ref<string>((route.query.category as string) || 'all')
watch(
  () => route.query.category,
  (v) => (active.value = (v as string) || 'all'),
)

function setCategory(slug: string) {
  active.value = slug
  const query = slug === 'all' ? {} : { category: slug }
  router.replace({ query })
}

const filtered = computed(() =>
  active.value === 'all'
    ? products.value
    : products.value.filter((p) => p.category === active.value),
)

useSeoMetaTags({
  title: t('menu.title'),
  description: t('menu.intro'),
})
</script>

<template>
  <div class="menu-page">
    <header class="page-hero">
      <div class="container container--narrow page-hero__inner">
        <span class="eyebrow">{{ t('menu.eyebrow') }}</span>
        <h1 class="page-hero__title">{{ t('menu.title') }}</h1>
        <p class="page-hero__intro">{{ t('menu.intro') }}</p>
      </div>
    </header>

    <section class="section menu-page__body">
      <div class="container">
        <div class="filters" role="tablist" :aria-label="t('menu.eyebrow')">
          <button
            class="filters__btn"
            :class="{ 'is-active': active === 'all' }"
            role="tab"
            :aria-selected="active === 'all'"
            @click="setCategory('all')"
          >
            {{ t('menu.all') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat.slug"
            class="filters__btn"
            :class="{ 'is-active': active === cat.slug }"
            role="tab"
            :aria-selected="active === cat.slug"
            @click="setCategory(cat.slug)"
          >
            {{ tt(cat.name) }}
          </button>
        </div>

        <TransitionGroup tag="div" name="grid" class="menu-grid">
          <ProductCard v-for="p in filtered" :key="p.slug" :product="p" />
        </TransitionGroup>

        <p v-if="!filtered.length" class="menu-empty">{{ t('menu.empty') }}</p>

        <p class="menu-disclaimer">
          <UiIcon name="check" :size="16" /> {{ t('menu.priceDisclaimer') }}
        </p>
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
  &__intro {
    margin-top: $space-4;
    color: var(--c-text-muted);
    font-size: $fs-lg;
  }
}

.menu-page__body { padding-top: fluid(28, 44); }

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  justify-content: center;
  margin-bottom: fluid(28, 44);

  &__btn {
    @include button-reset;
    padding: 0.55em 1.15em;
    border-radius: var(--radius-pill);
    border: 1px solid var(--c-border);
    background: var(--c-surface);
    font-size: $fs-sm;
    font-weight: $fw-medium;
    color: var(--c-ink-soft);
    transition: all $dur-fast var(--ease-out);

    &:hover { border-color: var(--c-gold); color: var(--c-gold-deep); }

    &.is-active {
      background: linear-gradient(135deg, $gold-400, $gold-600);
      color: $cream-50;
      border-color: transparent;
    }
  }
}

.menu-grid {
  display: grid;
  gap: fluid(16, 24);
  grid-template-columns: 1fr;

  @include up('sm') { grid-template-columns: repeat(2, 1fr); }
  @include up('lg') { grid-template-columns: repeat(3, 1fr); }
}

.grid-move { transition: transform $dur-base var(--ease-out); }
.grid-enter-active { transition: opacity $dur-base var(--ease-out), transform $dur-base var(--ease-out); }
.grid-enter-from { opacity: 0; transform: translateY(14px); }
.grid-leave-active { position: absolute; }

.menu-empty {
  text-align: center;
  padding: $space-8 0;
  color: var(--c-text-muted);
}

.menu-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: $space-2;
  margin-top: fluid(32, 48);
  padding: $space-4 $space-5;
  border-radius: var(--radius-md);
  background: var(--c-cream);
  border: 1px dashed var(--c-border);
  color: var(--c-text-muted);
  font-size: $fs-sm;

  :deep(.icon) { color: var(--c-teal); margin-top: 3px; }
}
</style>
