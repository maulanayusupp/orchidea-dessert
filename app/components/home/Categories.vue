<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { categories, products, tt } = useCatalog()

// A representative cover image per category (first product in it).
const cover = (slug: string) =>
  products.value.find((p) => p.category === slug)?.image ?? '/images/hero/hero-3.jpg'
const count = (slug: string) => products.value.filter((p) => p.category === slug).length
</script>

<template>
  <section class="section categories">
    <div class="container">
      <SectionHeading
        :eyebrow="t('home.categories.eyebrow')"
        :title="t('home.categories.title')"
        :intro="t('home.categories.intro')"
        center
      />

      <div class="categories__grid">
        <NuxtLink
          v-for="(cat, i) in categories"
          :key="cat.slug"
          :to="localePath({ path: '/menu', query: { category: cat.slug } })"
          class="cat"
          :class="{ 'cat--wide': i === 0 }"
          v-reveal="{ delay: i * 70 }"
        >
          <img class="cat__img" :src="cover(cat.slug)" :alt="tt(cat.name)" loading="lazy" />
          <div class="cat__overlay" />
          <div class="cat__body">
            <span class="cat__count">{{ count(cat.slug) }} item</span>
            <h3 class="cat__name">{{ tt(cat.name) }}</h3>
            <p class="cat__tag">{{ tt(cat.tagline) }}</p>
            <span class="cat__go">
              {{ t('cta.explore') }} <UiIcon name="arrow" :size="16" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.categories__grid {
  display: grid;
  gap: fluid(14, 22);
  grid-template-columns: 1fr;

  @include up('sm') {
    grid-template-columns: repeat(2, 1fr);
  }
  @include up('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cat {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius-lg);
  min-height: 260px;
  color: $cream-50;
  box-shadow: var(--shadow-sm);
  transition: transform $dur-base var(--ease-out), box-shadow $dur-base var(--ease-out);

  @include up('lg') {
    &--wide {
      grid-column: span 1;
      grid-row: span 2;
      min-height: 100%;
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    .cat__img { transform: scale(1.07); }
    .cat__go { gap: $space-3; }
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s var(--ease-out);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba($green-900, 0.05) 0%, rgba($green-900, 0.82) 100%);
  }

  &__body {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: fluid(18, 26);
    gap: 4px;
  }

  &__count {
    align-self: flex-start;
    padding: 0.22em 0.7em;
    border-radius: var(--radius-pill);
    background: rgba($gold-400, 0.28);
    border: 1px solid rgba($gold-300, 0.5);
    font-size: $fs-xs;
    font-weight: $fw-medium;
    margin-bottom: $space-2;
  }

  &__name {
    color: $cream-50;
    font-size: fluid(22, 30);
  }

  &__tag {
    color: rgba($cream-50, 0.82);
    font-size: $fs-sm;
    max-width: 32ch;
  }

  &__go {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    margin-top: $space-3;
    color: $gold-300;
    font-weight: $fw-medium;
    font-size: $fs-sm;
    transition: gap $dur-base var(--ease-out);
  }
}
</style>
