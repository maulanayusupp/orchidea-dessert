import { computed } from 'vue'

/** A single line in the cart. `key` distinguishes the same product in different sizes. */
export interface CartLine {
  key: string
  slug: string
  name: string
  image: string
  sizeLabel: string | null
  unitPrice: number
  qty: number
}

/**
 * Cart store. Backed by `useState` (SSR-safe, shared app-wide) and persisted to
 * localStorage by plugins/cart.client.ts. This is the single seam for the order
 * flow — a real backend/payment gateway would plug in here later.
 */
export function useCart() {
  const items = useState<CartLine[]>('cart', () => [])
  const isOpen = useState<boolean>('cart-open', () => false)

  const add = (line: Omit<CartLine, 'qty'>, qty = 1) => {
    const existing = items.value.find((i) => i.key === line.key)
    if (existing) existing.qty += qty
    else items.value.push({ ...line, qty })
    isOpen.value = true
  }

  const setQty = (key: string, qty: number) => {
    const line = items.value.find((i) => i.key === key)
    if (!line) return
    if (qty <= 0) remove(key)
    else line.qty = qty
  }

  const remove = (key: string) => {
    items.value = items.value.filter((i) => i.key !== key)
  }

  const clear = () => {
    items.value = []
  }

  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
  )

  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)

  return { items, isOpen, add, setQty, remove, clear, count, subtotal, open, close }
}
