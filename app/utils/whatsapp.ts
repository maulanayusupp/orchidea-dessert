import { CONTACT } from '~/config/site'
import { formatIDR } from '~/utils/format'
import type { CartLine } from '~/composables/useCart'

/**
 * Build a WhatsApp "click to chat" URL with a pre-filled order message.
 * Evidence: the number/deep-link come from Orchidea's own Linktree order button.
 */
export function buildWhatsAppOrderUrl(message: string): string {
  const text = encodeURIComponent(message)
  const number = CONTACT.phoneE164.replace('+', '')
  return `https://wa.me/${number}?text=${text}`
}

export interface CheckoutInfo {
  name: string
  phone: string
  fulfillment: 'pickup' | 'delivery'
  date: string
  address?: string
  notes?: string
  subtotal: number
  locale: 'id' | 'en'
}

/** Build a full, itemized order message from the cart for WhatsApp checkout. */
export function buildCheckoutMessage(items: CartLine[], info: CheckoutInfo): string {
  const en = info.locale === 'en'
  const lines: string[] = []
  lines.push(en ? '*New order — Orchidea Dessert*' : '*Pesanan baru — Orchidea Dessert*')
  lines.push('')
  items.forEach((i) => {
    const size = i.sizeLabel ? ` (${i.sizeLabel})` : ''
    lines.push(`• ${i.qty}× ${i.name}${size} — ${formatIDR(i.unitPrice * i.qty)}`)
  })
  lines.push('')
  lines.push(`${en ? 'Subtotal' : 'Subtotal'}: ${formatIDR(info.subtotal)}`)
  lines.push('')
  lines.push(`${en ? 'Name' : 'Nama'}: ${info.name}`)
  if (info.phone) lines.push(`${en ? 'Phone' : 'Telepon'}: ${info.phone}`)
  const ful = info.fulfillment === 'delivery'
    ? (en ? 'Delivery' : 'Kirim')
    : (en ? 'Pickup' : 'Ambil sendiri')
  lines.push(`${en ? 'Fulfillment' : 'Pengambilan'}: ${ful}`)
  if (info.fulfillment === 'delivery' && info.address) {
    lines.push(`${en ? 'Address' : 'Alamat'}: ${info.address}`)
  }
  if (info.date) lines.push(`${en ? 'Date needed' : 'Tanggal dibutuhkan'}: ${info.date}`)
  if (info.notes) lines.push(`${en ? 'Notes' : 'Catatan'}: ${info.notes}`)
  lines.push('')
  lines.push(en
    ? 'Please confirm availability & total. Thank you! (H-1 pre-order)'
    : 'Mohon konfirmasi ketersediaan & total. Terima kasih! (Order H-1)')
  return lines.join('\n')
}

/** Default order enquiry, localized by the caller. */
export function orderMessage(productName?: string): { id: string; en: string } {
  return {
    id: productName
      ? `Halo Orchidea Dessert, saya ingin memesan "${productName}". Apakah tersedia? (Order H-1)`
      : 'Halo Orchidea Dessert, saya ingin bertanya tentang pemesanan. Terima kasih!',
    en: productName
      ? `Hi Orchidea Dessert, I'd like to order "${productName}". Is it available? (H-1 pre-order)`
      : "Hi Orchidea Dessert, I'd like to ask about placing an order. Thank you!",
  }
}
