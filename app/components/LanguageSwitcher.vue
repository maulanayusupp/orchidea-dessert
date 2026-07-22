<script setup lang="ts">
/** Compact ID / EN toggle. Uses i18n's switchLocalePath to keep the current route. */
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const available = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map((l) => ({
    code: l.code,
    label: l.code.toUpperCase(),
    name: l.name,
  })),
)
</script>

<template>
  <div class="lang" role="group" aria-label="Language">
    <NuxtLink
      v-for="l in available"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="lang__opt"
      :class="{ 'is-active': l.code === locale }"
      :aria-current="l.code === locale ? 'true' : undefined"
      :title="l.name"
    >
      {{ l.label }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.lang {
  display: inline-flex;
  align-items: center;
  padding: 3px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-border);
  background: rgba($cream-50, 0.6);

  &__opt {
    min-width: 2.4em;
    padding: 0.32em 0.7em;
    border-radius: var(--radius-pill);
    font-size: $fs-sm;
    font-weight: $fw-medium;
    letter-spacing: 0.08em;
    color: var(--c-text-muted);
    text-align: center;
    transition: color $dur-fast var(--ease-out), background-color $dur-fast var(--ease-out);

    &.is-active {
      color: $cream-50;
      background: linear-gradient(135deg, $gold-400, $gold-600);
    }

    &:hover:not(.is-active) {
      color: var(--c-gold-deep);
    }
  }
}
</style>
