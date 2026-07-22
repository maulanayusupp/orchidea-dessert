<script setup lang="ts">
import { SITE, CONTACT, SOCIALS } from '~/config/site'
import { buildWhatsAppOrderUrl } from '~/utils/whatsapp'

const { t, locale } = useI18n()
const { products, name: pname } = useCatalog()

const form = reactive({ name: '', product: '', message: '' })

// Build a friendly, localized WhatsApp message from the form and open it.
const composed = computed(() => {
  const greet = locale.value === 'en' ? 'Hi Orchidea Dessert!' : 'Halo Orchidea Dessert!'
  const lines = [greet]
  if (form.name) lines.push(locale.value === 'en' ? `Name: ${form.name}` : `Nama: ${form.name}`)
  if (form.product) lines.push(locale.value === 'en' ? `Product: ${form.product}` : `Produk: ${form.product}`)
  if (form.message) lines.push(form.message)
  return lines.join('\n')
})
const waUrl = computed(() => buildWhatsAppOrderUrl(composed.value))

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.mapsQuery}`

const socials = [
  { name: 'Instagram', icon: 'instagram', url: SOCIALS.instagram },
  { name: 'TikTok', icon: 'tiktok', url: SOCIALS.tiktok },
  { name: 'WhatsApp', icon: 'whatsapp', url: SOCIALS.linktree },
]

useSeoMetaTags({
  title: t('contact.title'),
  description: t('contact.intro'),
})
</script>

<template>
  <div class="contact">
    <header class="page-hero">
      <div class="container container--narrow page-hero__inner">
        <span class="eyebrow">{{ t('contact.eyebrow') }}</span>
        <h1 class="page-hero__title">{{ t('contact.title') }}</h1>
        <p class="page-hero__intro">{{ t('contact.intro') }}</p>
      </div>
    </header>

    <section class="section">
      <div class="container contact__grid">
        <!-- Info -->
        <div class="contact__info" v-reveal>
          <h2 class="contact__h">{{ t('contact.infoTitle') }}</h2>
          <ul class="contact__list" role="list">
            <li class="contact__row">
              <span class="contact__icon"><UiIcon name="location" :size="20" /></span>
              <div>
                <span class="contact__label">{{ t('contact.addressLabel') }}</span>
                <a :href="mapsUrl" target="_blank" rel="noopener noreferrer" class="contact__value">
                  {{ CONTACT.address.line }}, {{ CONTACT.address.district }},
                  {{ CONTACT.address.city }}, {{ CONTACT.address.province }} {{ CONTACT.address.postalCode }}
                </a>
              </div>
            </li>
            <li class="contact__row">
              <span class="contact__icon"><UiIcon name="phone" :size="20" /></span>
              <div>
                <span class="contact__label">{{ t('contact.phoneLabel') }}</span>
                <a :href="`tel:${CONTACT.phoneE164}`" class="contact__value">{{ CONTACT.phoneDisplay }}</a>
              </div>
            </li>
            <li class="contact__row">
              <span class="contact__icon"><UiIcon name="clock" :size="20" /></span>
              <div>
                <span class="contact__label">{{ t('contact.hoursLabel') }}</span>
                <span class="contact__value">{{ t('footer.hours', { time: SITE.openingTime }) }}</span>
              </div>
            </li>
          </ul>

          <span class="contact__label">{{ t('contact.socialLabel') }}</span>
          <div class="contact__socials">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact__social"
              :aria-label="s.name"
            >
              <UiIcon :name="s.icon" :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick WhatsApp form -->
        <div class="contact__card" v-reveal>
          <h2 class="contact__h">{{ t('contact.formTitle') }}</h2>
          <p class="contact__hint">{{ t('contact.formIntro') }}</p>

          <form class="form" @submit.prevent>
            <label class="form__field">
              <span class="form__label">{{ t('contact.form.name') }}</span>
              <input v-model="form.name" type="text" class="form__input" :placeholder="t('contact.form.namePlaceholder')" />
            </label>

            <label class="form__field">
              <span class="form__label">{{ t('contact.form.product') }}</span>
              <select v-model="form.product" class="form__input">
                <option value="">{{ t('contact.form.productNone') }}</option>
                <option v-for="p in products" :key="p.slug" :value="pname(p)">{{ pname(p) }}</option>
              </select>
            </label>

            <label class="form__field">
              <span class="form__label">{{ t('contact.form.message') }}</span>
              <textarea v-model="form.message" rows="4" class="form__input" :placeholder="t('contact.form.messagePlaceholder')" />
            </label>

            <UiButton :href="waUrl" external variant="primary" block size="lg">
              <template #icon-left><UiIcon name="whatsapp" :size="19" /></template>
              {{ t('contact.form.submit') }}
            </UiButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-hero {
  padding-top: calc(var(--header-height) + #{fluid(36, 72)});
  padding-bottom: fluid(28, 52);
  text-align: center;
  background:
    radial-gradient(90% 70% at 50% 0%, rgba($gold-200, 0.5), transparent 70%),
    var(--c-cream);

  &__title { margin-top: $space-3; }
  &__intro { margin-top: $space-4; color: var(--c-text-muted); font-size: $fs-lg; }
}

.contact__grid {
  display: grid;
  gap: fluid(28, 48);
  align-items: start;

  @include up('lg') { grid-template-columns: 0.9fr 1.1fr; }
}

.contact__h { font-size: fluid(24, 30); }

.contact__list {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  margin: $space-5 0 $space-6;
  padding: 0;
  list-style: none;
}

.contact__row { display: flex; gap: $space-3; }

.contact__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 2.6em;
  height: 2.6em;
  border-radius: var(--radius-pill);
  background: rgba($gold-400, 0.16);
  color: var(--c-gold-deep);
}

.contact__label {
  display: block;
  font-size: $fs-xs;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.contact__value {
  display: block;
  margin-top: 2px;
  color: var(--c-ink);
  font-weight: $fw-medium;
  &:hover { color: var(--c-gold-deep); }
}

.contact__socials { display: flex; gap: $space-3; margin-top: $space-3; }

.contact__social {
  display: inline-flex;
  padding: 0.6em;
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-border);
  color: var(--c-ink);
  transition: all $dur-fast var(--ease-out);
  &:hover { color: var(--c-gold-deep); border-color: var(--c-gold); background: rgba($gold-400, 0.08); }
}

.contact__card {
  padding: fluid(24, 40);
  border-radius: var(--radius-xl);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  box-shadow: var(--shadow-md);
}

.contact__hint { margin-top: $space-2; color: var(--c-text-muted); }

.form {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  margin-top: $space-5;
}

.form__field { display: flex; flex-direction: column; gap: $space-2; }

.form__label {
  font-size: $fs-sm;
  font-weight: $fw-medium;
  color: var(--c-ink-soft);
}

.form__input {
  padding: 0.8em 1em;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--c-border);
  background: var(--c-cream-soft);
  color: var(--c-ink);
  font-size: $fs-base;
  transition: border-color $dur-fast var(--ease-out), box-shadow $dur-fast var(--ease-out);
  resize: vertical;

  &::placeholder { color: rgba($ink-700, 0.5); }

  &:focus {
    outline: none;
    border-color: var(--c-gold);
    box-shadow: 0 0 0 3px rgba($gold-400, 0.2);
  }
}
</style>
