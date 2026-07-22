<script setup lang="ts">
/**
 * Polymorphic button. Renders <NuxtLink> for internal `to`, <a> for external
 * `href`, otherwise a native <button>. Styling comes from the global `.btn`
 * classes (see scss/components/_button.scss) — no inline styles.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost' | 'dark'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    block?: boolean
    type?: 'button' | 'submit'
    external?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', external: false },
)

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  { 'btn--block': props.block, 'btn--lg': props.size === 'lg', 'btn--sm': props.size === 'sm' },
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot name="icon-left" />
    <span class="btn__label"><slot /></span>
    <slot name="icon" />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot name="icon-left" />
    <span class="btn__label"><slot /></span>
    <slot name="icon" />
  </a>

  <button v-else :type="type" :class="classes">
    <slot name="icon-left" />
    <span class="btn__label"><slot /></span>
    <slot name="icon" />
  </button>
</template>
