/**
 * `v-reveal` directive — adds `.is-visible` when the element scrolls into view,
 * driving the reveal-on-scroll animation in base/_layout.scss.
 *
 * Registered universally so SSR can resolve the directive (via `getSSRProps`),
 * but every browser API is confined to `mounted`, which only runs on the client.
 * Respects reduced-motion by revealing immediately.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (observer || typeof IntersectionObserver === 'undefined') return observer
    observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    // Keep SSR happy (no reveal styling emitted server-side).
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value?.delay) {
        el.style.transitionDelay = `${binding.value.delay}ms`
      }
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      const obs = getObserver()
      if (reduceMotion || !obs) {
        el.classList.add('is-visible')
        return
      }
      obs.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
