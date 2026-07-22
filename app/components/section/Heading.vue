<script setup lang="ts">
/** Reusable section header: eyebrow + title + optional intro, left or centered. */
withDefaults(
  defineProps<{ eyebrow?: string; title: string; intro?: string; center?: boolean }>(),
  { center: false },
)
</script>

<template>
  <div class="section__head" :class="{ 'section__head--center': center }" v-reveal>
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2 class="section__title">{{ title }}</h2>
    <p v-if="intro" class="section__intro">{{ intro }}</p>
  </div>
</template>
