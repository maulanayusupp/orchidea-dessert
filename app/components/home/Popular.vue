<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { popular } = useCatalog()
const items = computed(() => popular.value.slice(0, 4))
</script>

<template>
  <section class="section popular">
    <div class="container">
      <div class="popular__head">
        <SectionHeading
          :eyebrow="t('home.popular.eyebrow')"
          :title="t('home.popular.title')"
          :intro="t('home.popular.intro')"
        />
        <UiButton :to="localePath('/menu')" variant="ghost" size="sm" class="popular__all">
          {{ t('home.popular.viewAll') }}
          <template #icon><UiIcon name="arrow" :size="16" /></template>
        </UiButton>
      </div>

      <div class="popular__grid">
        <div v-for="(p, i) in items" :key="p.slug" v-reveal="{ delay: i * 60 }">
          <ProductCard :product="p" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.popular__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: $space-4;

  :deep(.section__head) { margin-bottom: 0; }
}

.popular__all {
  margin-bottom: fluid(28, 52);
}

.popular__grid {
  display: grid;
  gap: fluid(16, 24);
  grid-template-columns: 1fr;

  @include up('sm') { grid-template-columns: repeat(2, 1fr); }
  @include up('lg') { grid-template-columns: repeat(4, 1fr); }
}
</style>
