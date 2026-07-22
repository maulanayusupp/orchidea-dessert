<script setup lang="ts">
const { t, tm, rt } = useI18n()
interface Step { title: string; desc: string }
const steps = computed(() => tm('home.process.steps') as unknown as Step[])
</script>

<template>
  <section class="section process">
    <div class="container">
      <SectionHeading
        :eyebrow="t('home.process.eyebrow')"
        :title="t('home.process.title')"
        :intro="t('home.process.intro')"
        center
      />

      <ol class="process__grid">
        <li v-for="(step, i) in steps" :key="i" class="step" v-reveal="{ delay: i * 80 }">
          <span class="step__num">{{ i + 1 }}</span>
          <h3 class="step__title">{{ rt(step.title) }}</h3>
          <p class="step__desc">{{ rt(step.desc) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.process {
  background: var(--c-green-deep);
  color: rgba($cream-50, 0.85);

  :deep(.section__title) { color: $cream-50; }
  :deep(.section__intro) { color: rgba($cream-50, 0.78); }
  :deep(.eyebrow) { color: $gold-300; }
}

.process__grid {
  display: grid;
  gap: fluid(18, 28);
  padding: 0;
  margin: 0;
  list-style: none;
  counter-reset: step;
  grid-template-columns: 1fr;

  @include up('sm') { grid-template-columns: repeat(2, 1fr); }
  @include up('lg') { grid-template-columns: repeat(4, 1fr); }
}

.step {
  position: relative;
  padding: fluid(22, 30);
  border-radius: var(--radius-lg);
  background: rgba($cream-50, 0.05);
  border: 1px solid rgba($gold-300, 0.2);

  &__num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.6em;
    height: 2.6em;
    border-radius: var(--radius-pill);
    background: linear-gradient(135deg, $gold-400, $gold-600);
    color: $green-900;
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: 1.3em;
    box-shadow: var(--shadow-sm);
  }

  &__title {
    margin-top: $space-4;
    color: $cream-50;
    font-size: fluid(19, 22);
  }

  &__desc {
    margin-top: $space-2;
    color: rgba($cream-50, 0.74);
    font-size: $fs-sm;
  }
}
</style>
