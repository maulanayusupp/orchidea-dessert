<script setup lang="ts">
/**
 * Brand wordmark — orchid mark + "ORCHIDEA / dessert", rendered as scalable SVG.
 * Inspired by Orchidea Dessert's own gold logo. `tone` adapts it to light or
 * dark surfaces; `compact` shows the mark only (used in the mobile header).
 */
withDefaults(
  defineProps<{ tone?: 'gold' | 'light' | 'ink'; compact?: boolean }>(),
  { tone: 'gold', compact: false },
)
</script>

<template>
  <span class="logo" :class="[`logo--${tone}`, { 'logo--compact': compact }]" aria-label="Orchidea Dessert">
    <svg class="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 13c-3.4 0-6 2.4-6 5.7 0 3.7 3.4 7.1 6 8.9 2.6-1.8 6-5.2 6-8.9 0-3.3-2.6-5.7-6-5.7Z" />
        <path d="M18 18.6c-2.9-1-5.6.3-6.6 2.9M30 18.6c2.9-1 5.6.3 6.6 2.9" />
        <circle cx="24" cy="18.8" r="1.7" fill="currentColor" stroke="none" />
        <path d="M24 27.6c0 4-2.4 6.8-7.2 8.4M24 27.6c0 3.2 1.8 5.6 5.2 7" />
      </g>
    </svg>
    <span v-if="!compact" class="logo__type">
      <span class="logo__name">ORCHIDEA</span>
      <span class="logo__sub">dessert</span>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  line-height: 1;

  &__mark {
    width: 2.4em;
    height: 2.4em;
  }

  &__type {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-family: $font-display;
    font-weight: $fw-semibold;
    font-size: 1.32em;
    letter-spacing: 0.12em;
  }

  &__sub {
    font-family: $font-body;
    font-weight: $fw-regular;
    font-size: 0.62em;
    letter-spacing: 0.42em;
    text-transform: lowercase;
    opacity: 0.85;
    margin-top: 0.1em;
    align-self: flex-end;
  }

  &--gold { color: $gold-600; }
  &--light { color: $cream-50; }
  &--ink { color: $ink-900; }
}
</style>
