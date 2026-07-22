import { CONTACT } from '~/config/site'

/**
 * Build a WhatsApp "click to chat" URL with a pre-filled order message.
 * Evidence: the number/deep-link come from Orchidea's own Linktree order button.
 */
export function buildWhatsAppOrderUrl(message: string): string {
  const text = encodeURIComponent(message)
  const number = CONTACT.phoneE164.replace('+', '')
  return `https://wa.me/${number}?text=${text}`
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
