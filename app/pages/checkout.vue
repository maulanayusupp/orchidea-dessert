<script setup lang="ts">
import { formatIDR } from '~/utils/format'
import { buildWhatsAppOrderUrl, buildCheckoutMessage } from '~/utils/whatsapp'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { items, subtotal, count, setQty, remove, clear } = useCart()

const form = reactive({
  name: '',
  phone: '',
  fulfillment: 'pickup' as 'pickup' | 'delivery',
  address: '',
  date: '',
  notes: '',
})

// H-1: earliest date is tomorrow.
const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
})

const canSubmit = computed(() => count.value > 0 && form.name.trim().length > 0)

function placeOrder() {
  if (!canSubmit.value) return
  const message = buildCheckoutMessage(items.value, {
    name: form.name.trim(),
    phone: form.phone.trim(),
    fulfillment: form.fulfillment,
    address: form.address.trim(),
    date: form.date,
    notes: form.notes.trim(),
    subtotal: subtotal.value,
    locale: locale.value as 'id' | 'en',
  })
  const url = buildWhatsAppOrderUrl(message)
  if (import.meta.client) window.open(url, '_blank')
  clear()
  navigateTo(localePath('/menu'))
}

useSeoMetaTags({ title: t('checkout.title'), description: t('checkout.intro') })
</script>

<template>
  <div class="checkout">
    <header class="page-hero">
      <div class="container container--narrow page-hero__inner">
        <span class="eyebrow">{{ t('checkout.eyebrow') }}</span>
        <h1 class="page-hero__title">{{ t('checkout.title') }}</h1>
        <p class="page-hero__intro">{{ t('checkout.intro') }}</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <!-- Empty -->
        <div v-if="!count" class="checkout__empty">
          <UiIcon name="bag" :size="34" />
          <p>{{ t('cart.empty') }}</p>
          <UiButton :to="localePath('/menu')" variant="primary">{{ t('cta.viewMenu') }}</UiButton>
        </div>

        <div v-else class="checkout__grid">
          <!-- Summary -->
          <div class="summary">
            <h2 class="checkout__h">{{ t('checkout.summary') }}</h2>
            <article v-for="line in items" :key="line.key" class="sline">
              <img :src="line.image" :alt="line.name" class="sline__img" width="64" height="64" />
              <div class="sline__info">
                <h3 class="sline__name">{{ line.name }}</h3>
                <p v-if="line.sizeLabel" class="sline__size">{{ line.sizeLabel }}</p>
                <div class="qty">
                  <button type="button" class="qty__btn" :aria-label="t('cart.decrease')" @click="setQty(line.key, line.qty - 1)">−</button>
                  <span class="qty__val">{{ line.qty }}</span>
                  <button type="button" class="qty__btn" :aria-label="t('cart.increase')" @click="setQty(line.key, line.qty + 1)">+</button>
                </div>
              </div>
              <div class="sline__right">
                <span class="sline__price">{{ formatIDR(line.unitPrice * line.qty) }}</span>
                <button type="button" class="sline__remove" :aria-label="t('cart.remove')" @click="remove(line.key)">
                  <UiIcon name="trash" :size="16" />
                </button>
              </div>
            </article>

            <div class="summary__total">
              <span>{{ t('cart.subtotal') }}</span>
              <strong>{{ formatIDR(subtotal) }}</strong>
            </div>
            <p class="summary__note">{{ t('checkout.totalNote') }}</p>
          </div>

          <!-- Details form -->
          <div class="details">
            <h2 class="checkout__h">{{ t('checkout.details') }}</h2>
            <form class="form" @submit.prevent="placeOrder">
              <label class="form__field">
                <span class="form__label">{{ t('contact.form.name') }} *</span>
                <input v-model="form.name" type="text" class="form__input" :placeholder="t('contact.form.namePlaceholder')" required />
              </label>

              <label class="form__field">
                <span class="form__label">{{ t('checkout.phone') }}</span>
                <input v-model="form.phone" type="tel" class="form__input" placeholder="08…" />
              </label>

              <div class="form__field">
                <span class="form__label">{{ t('checkout.fulfillment') }}</span>
                <div class="seg">
                  <button type="button" class="seg__opt" :class="{ 'is-active': form.fulfillment === 'pickup' }" @click="form.fulfillment = 'pickup'">
                    {{ t('checkout.pickup') }}
                  </button>
                  <button type="button" class="seg__opt" :class="{ 'is-active': form.fulfillment === 'delivery' }" @click="form.fulfillment = 'delivery'">
                    {{ t('checkout.delivery') }}
                  </button>
                </div>
              </div>

              <label v-if="form.fulfillment === 'delivery'" class="form__field">
                <span class="form__label">{{ t('contact.addressLabel') }}</span>
                <input v-model="form.address" type="text" class="form__input" :placeholder="t('checkout.addressPlaceholder')" />
              </label>

              <label class="form__field">
                <span class="form__label">{{ t('checkout.date') }}</span>
                <input v-model="form.date" type="date" class="form__input" :min="minDate" />
                <span class="form__hint">{{ t('checkout.dateHint') }}</span>
              </label>

              <label class="form__field">
                <span class="form__label">{{ t('contact.form.message') }}</span>
                <textarea v-model="form.notes" rows="3" class="form__input" :placeholder="t('checkout.notesPlaceholder')" />
              </label>

              <UiButton type="submit" variant="primary" block size="lg" :class="{ 'is-disabled': !canSubmit }">
                <template #icon-left><UiIcon name="whatsapp" :size="19" /></template>
                {{ t('checkout.place') }}
              </UiButton>
              <p class="form__hint form__hint--center">{{ t('checkout.waNote') }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-hero {
  padding-top: calc(var(--header-height) + #{fluid(36, 72)});
  padding-bottom: fluid(24, 44);
  text-align: center;
  background: radial-gradient(90% 70% at 50% 0%, rgba($gold-200, 0.5), transparent 70%), var(--c-cream);
  &__title { margin-top: $space-3; }
  &__intro { margin-top: $space-4; color: var(--c-text-muted); font-size: $fs-lg; }
}

.checkout__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  padding: fluid(40, 80) 0;
  color: var(--c-text-muted);
  :deep(.icon) { color: var(--c-gold-soft); }
}

.checkout__grid {
  display: grid;
  gap: fluid(28, 48);
  align-items: start;
  @include up('lg') { grid-template-columns: 1.1fr 0.9fr; }
}

.checkout__h { font-size: fluid(22, 28); margin-bottom: $space-5; }

.summary {
  padding: fluid(20, 28);
  border-radius: var(--radius-xl);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  box-shadow: var(--shadow-sm);
}

.sline {
  display: flex;
  gap: $space-3;
  padding: $space-3 0;
  border-bottom: 1px solid var(--c-border);

  &__img { width: 64px; height: 64px; border-radius: var(--radius-md); object-fit: cover; flex: none; }
  &__info { flex: 1; min-width: 0; }
  &__name { font-size: $fs-base; font-weight: $fw-medium; }
  &__size { font-size: $fs-xs; color: var(--c-text-muted); margin: 2px 0 $space-2; }
  &__right { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; }
  &__price { font-weight: $fw-semibold; font-family: $font-display; }
  &__remove { @include button-reset; color: var(--c-text-muted); &:hover { color: $error; } }
}

.summary__total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: $space-4;
  font-size: $fs-lg;
  strong { font-family: $font-display; font-size: 1.4em; color: var(--c-ink); }
}
.summary__note { margin-top: $space-2; font-size: $fs-xs; color: var(--c-text-muted); }

.details {
  padding: fluid(20, 28);
  border-radius: var(--radius-xl);
  background: var(--c-cream-soft);
  border: 1px solid var(--c-border);
}

.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-pill);
  overflow: hidden;
  &__btn {
    @include button-reset;
    width: 1.9em; height: 1.9em;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: $fs-base; color: var(--c-ink);
    &:hover { background: rgba($gold-400, 0.14); color: var(--c-gold-deep); }
  }
  &__val { min-width: 1.8em; text-align: center; font-size: $fs-sm; font-weight: $fw-medium; }
}

.form { display: flex; flex-direction: column; gap: $space-4; }
.form__field { display: flex; flex-direction: column; gap: $space-2; }
.form__label { font-size: $fs-sm; font-weight: $fw-medium; color: var(--c-ink-soft); }
.form__hint { font-size: $fs-xs; color: var(--c-text-muted); }
.form__hint--center { text-align: center; }

.form__input {
  padding: 0.8em 1em;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-ink);
  font-size: $fs-base;
  transition: border-color $dur-fast var(--ease-out), box-shadow $dur-fast var(--ease-out);
  resize: vertical;
  &::placeholder { color: rgba($ink-700, 0.5); }
  &:focus { outline: none; border-color: var(--c-gold); box-shadow: 0 0 0 3px rgba($gold-400, 0.2); }
}

.seg {
  display: flex;
  gap: $space-2;
}
.seg__opt {
  @include button-reset;
  flex: 1;
  padding: 0.7em 1em;
  text-align: center;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  font-weight: $fw-medium;
  color: var(--c-ink-soft);
  transition: all $dur-fast var(--ease-out);
  &:hover { border-color: var(--c-gold); }
  &.is-active { border-color: var(--c-gold); background: rgba($gold-400, 0.12); color: var(--c-gold-deep); }
}

.is-disabled { opacity: 0.5; pointer-events: none; }
</style>
