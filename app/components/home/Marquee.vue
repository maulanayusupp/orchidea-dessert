<script setup lang="ts">
/** Decorative infinite marquee of signature words. Purely visual. */
const items = [
  'Roti Maung',
  'Mille Crepes',
  'Cromboloni',
  'Kaastengels',
  'Custom Cake',
  'Croissant',
  'Tiramisu',
  'Hampers',
]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <template v-for="pass in 2" :key="pass">
        <span v-for="(word, i) in items" :key="`${pass}-${i}`" class="marquee__item">
          {{ word }}
          <UiIcon name="sparkle" :size="14" class="marquee__sep" />
        </span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  overflow: hidden;
  background: var(--c-green-deep);
  color: $cream-50;
  padding-block: $space-4;
  border-block: 1px solid rgba($gold-300, 0.25);

  &__track {
    display: flex;
    width: max-content;
    gap: fluid(24, 48);
    animation: scroll 28s linear infinite;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: fluid(24, 48);
    font-family: $font-display;
    font-style: italic;
    font-size: fluid(20, 30);
    white-space: nowrap;
  }

  &__sep {
    color: $gold-300;
  }
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
