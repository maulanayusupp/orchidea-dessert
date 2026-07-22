<script setup lang="ts">
import { formatIDR } from '~/utils/format'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { items, isOpen, setQty, remove, subtotal, count, close } = useCart()

watch(() => route.fullPath, close)
watch(isOpen, (v) => {
  if (import.meta.client) document.documentElement.classList.toggle('u-no-scroll', v)
})
onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.classList.remove('u-no-scroll')
})
</script>

<template>
  <div>
    <Transition name="scrim">
      <div v-if="isOpen" class="cart-scrim" @click="close" />
    </Transition>
    <Transition name="slide">
      <aside v-if="isOpen" class="cart" role="dialog" :aria-label="t('cart.title')">
        <header class="cart__head">
          <h2 class="cart__title">{{ t('cart.title') }} <span v-if="count">({{ count }})</span></h2>
          <button class="cart__close" :aria-label="t('cart.close')" @click="close">
            <UiIcon name="close" :size="24" />
          </button>
        </header>

        <div v-if="items.length" class="cart__body">
          <article v-for="line in items" :key="line.key" class="line">
            <img :src="line.image" :alt="line.name" class="line__img" width="72" height="72" />
            <div class="line__info">
              <h3 class="line__name">{{ line.name }}</h3>
              <p v-if="line.sizeLabel" class="line__size">{{ line.sizeLabel }}</p>
              <p class="line__price">{{ formatIDR(line.unitPrice) }}</p>
            </div>
            <div class="line__side">
              <div class="qty">
                <button class="qty__btn" :aria-label="t('cart.decrease')" @click="setQty(line.key, line.qty - 1)">−</button>
                <span class="qty__val">{{ line.qty }}</span>
                <button class="qty__btn" :aria-label="t('cart.increase')" @click="setQty(line.key, line.qty + 1)">+</button>
              </div>
              <button class="line__remove" @click="remove(line.key)">{{ t('cart.remove') }}</button>
            </div>
          </article>
        </div>

        <div v-else class="cart__empty">
          <UiIcon name="sparkle" :size="30" />
          <p>{{ t('cart.empty') }}</p>
          <UiButton :to="localePath('/menu')" variant="ghost" size="sm" @click="close">
            {{ t('cta.viewMenu') }}
          </UiButton>
        </div>

        <footer v-if="items.length" class="cart__foot">
          <div class="cart__subtotal">
            <span>{{ t('cart.subtotal') }}</span>
            <strong>{{ formatIDR(subtotal) }}</strong>
          </div>
          <p class="cart__note">{{ t('cart.note') }}</p>
          <UiButton :to="localePath('/checkout')" variant="primary" block size="lg">
            {{ t('cart.checkout') }}
            <template #icon><UiIcon name="arrow" :size="18" /></template>
          </UiButton>
        </footer>
      </aside>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.cart-scrim {
  position: fixed;
  inset: 0;
  z-index: $z-overlay;
  background: rgba($ink-900, 0.45);
  backdrop-filter: blur(2px);
}

.cart {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $z-drawer;
  width: min(420px, 100vw);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--c-cream-soft);
  box-shadow: var(--shadow-lg);

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: fluid(18, 24);
    border-bottom: 1px solid var(--c-border);
  }

  &__title { font-size: fluid(20, 26); }

  &__close {
    @include button-reset;
    display: inline-flex;
    color: var(--c-ink);
    padding: 4px;
    &:hover { color: var(--c-gold-deep); }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $space-4 fluid(18, 24);
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    color: var(--c-text-muted);
    :deep(.icon) { color: var(--c-gold-soft); }
  }

  &__foot {
    padding: fluid(18, 24);
    border-top: 1px solid var(--c-border);
    background: var(--c-surface);
  }

  &__subtotal {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: $fs-lg;
    strong { font-family: $font-display; font-size: 1.4em; color: var(--c-ink); }
  }

  &__note {
    margin: $space-2 0 $space-4;
    font-size: $fs-xs;
    color: var(--c-text-muted);
  }
}

.line {
  display: flex;
  gap: $space-3;

  &__img {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-md);
    object-fit: cover;
    flex: none;
  }

  &__info { flex: 1; min-width: 0; }
  &__name { font-size: $fs-base; font-weight: $fw-medium; @include line-clamp(2); }
  &__size { font-size: $fs-xs; color: var(--c-text-muted); margin-top: 2px; }
  &__price { font-size: $fs-sm; color: var(--c-gold-deep); font-weight: $fw-medium; margin-top: 2px; }

  &__side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__remove {
    @include button-reset;
    font-size: $fs-xs;
    color: var(--c-text-muted);
    text-decoration: underline;
    &:hover { color: $error; }
  }
}

.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-pill);
  overflow: hidden;

  &__btn {
    @include button-reset;
    width: 1.9em;
    height: 1.9em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: $fs-lg;
    color: var(--c-ink);
    &:hover { background: rgba($gold-400, 0.14); color: var(--c-gold-deep); }
  }

  &__val { min-width: 1.6em; text-align: center; font-size: $fs-sm; font-weight: $fw-medium; }
}

.slide-enter-active,
.slide-leave-active { transition: transform $dur-base var(--ease-out); }
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); }
.scrim-enter-active,
.scrim-leave-active { transition: opacity $dur-base var(--ease-out); }
.scrim-enter-from,
.scrim-leave-to { opacity: 0; }
</style>
