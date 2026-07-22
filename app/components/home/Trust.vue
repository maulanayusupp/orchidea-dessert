<script setup lang="ts">
const { t, tm, rt } = useI18n()
interface Stat { value: string; label: string }
const stats = computed(() => tm('home.trust.stats') as unknown as Stat[])
</script>

<template>
  <section class="section trust">
    <div class="container container--narrow trust__inner" v-reveal>
      <span class="eyebrow">{{ t('home.trust.eyebrow') }}</span>
      <span class="trust__stars" aria-hidden="true">
        <UiIcon v-for="n in 5" :key="n" name="star" :size="26" />
      </span>
      <h2 class="trust__title">{{ t('home.trust.title') }}</h2>
      <p class="trust__intro">{{ t('home.trust.intro') }}</p>

      <blockquote class="trust__quote">
        “{{ t('home.trust.quote') }}”
        <cite>— {{ t('home.trust.quoteBy') }}</cite>
      </blockquote>

      <dl class="trust__stats">
        <div v-for="(s, i) in stats" :key="i" class="trust__stat">
          <dt>{{ rt(s.value) }}</dt>
          <dd>{{ rt(s.label) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.trust {
  background:
    radial-gradient(80% 60% at 50% 0%, rgba($gold-200, 0.4), transparent 70%),
    var(--c-cream);
  text-align: center;
}

.trust__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trust__stars {
  display: inline-flex;
  gap: 4px;
  color: $gold-500;
  margin-top: $space-3;
}

.trust__title {
  margin-top: $space-4;
}

.trust__intro {
  margin-top: $space-3;
  max-width: 52ch;
  color: var(--c-text-muted);
  font-size: $fs-lg;
}

.trust__quote {
  margin: fluid(28, 44) 0 0;
  font-family: $font-display;
  font-style: italic;
  font-size: fluid(24, 38);
  color: var(--c-green-deep);
  line-height: 1.3;
  max-width: 22ch;

  cite {
    display: block;
    margin-top: $space-3;
    font-family: $font-body;
    font-style: normal;
    font-size: $fs-sm;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--c-gold-deep);
  }
}

.trust__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: fluid(28, 64);
  margin: fluid(32, 52) 0 0;

  dt {
    font-family: $font-display;
    font-weight: $fw-semibold;
    font-size: fluid(34, 52);
    color: var(--c-gold-deep);
    line-height: 1;
  }

  dd {
    margin-top: $space-2;
    font-size: $fs-sm;
    color: var(--c-text-muted);
  }
}
</style>
