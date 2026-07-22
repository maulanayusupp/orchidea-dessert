<script setup lang="ts">
/**
 * Inline SVG icon set. Single source of truth for iconography — keeps markup
 * clean and avoids shipping an icon font. Add new glyphs to `paths`.
 */
const props = withDefaults(defineProps<{ name: string; size?: number | string }>(), {
  size: 24,
})

// Each entry is the inner markup of a 24x24 viewBox icon.
const paths: Record<string, string> = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  close: '<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  chevron: '<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  chevronDown: '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  phone: '<path d="M6.6 3.5c.5 0 .9.3 1 .8l.9 3c.1.5-.1 1-.5 1.2l-1.6 1a12 12 0 005.1 5.1l1-1.6c.3-.4.8-.6 1.2-.5l3 .9c.5.1.8.5.8 1V19c0 1.1-.9 2-2 2A16 16 0 013.5 5.6c0-1.1.9-2 2-2Z" fill="currentColor"/>',
  location: '<path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7Zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5Z" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" fill="currentColor"/>',
  whatsapp: '<path d="M12 2a9.9 9.9 0 00-8.5 15l-1.4 5 5.1-1.3A10 10 0 1012 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7s-3.7-3.2-3.8-3.4c-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.9c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.1.2-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4 0 .5-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.6 0 1.1Z" fill="currentColor"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/>',
  tiktok: '<path d="M14 3c.3 2.2 1.6 3.7 3.8 4v2.6c-1.4 0-2.7-.4-3.8-1.1v5.9a5.4 5.4 0 11-5.4-5.4c.3 0 .6 0 .9.1v2.7a2.7 2.7 0 102 2.6V3H14Z" fill="currentColor"/>',
  globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  leaf: '<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M5 19C9 15 13 12 17 9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="currentColor"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  heart: '<path d="M12 20S3.5 14.5 3.5 8.9A4.4 4.4 0 0112 6a4.4 4.4 0 018.5 2.9C20.5 14.5 12 20 12 20Z" fill="currentColor"/>',
}

const inner = computed(() => paths[props.name] ?? '')
const dim = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    class="icon"
    :width="dim"
    :height="dim"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    v-html="inner"
  />
</template>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>
