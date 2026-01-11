import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from './products'

export interface CartItem {
  productId: number
  name: string
  price: number
  qty: number
}

export interface Transaction {
  id: number
  items: CartItem[]
  total: number
  date: string
}

export const useTransactionStore = defineStore('transaction', () => {
  // =====================
  // STATE
  // =====================
  const cart = ref<CartItem[]>([])
  const transactions = ref<Transaction[]>([])
  const lastTransaction = ref<Transaction | null>(null)

  // =====================
  // GETTERS
  // =====================
  const cartTotal = computed(() =>
    cart.value.reduce(
      (sum: number, i: CartItem) => sum + i.price * i.qty,
      0
    )
  )

  // =====================
  // ACTIONS
  // =====================
  const addToCart = (product: {
    id: number
    name: string
    price: number
  }) => {
    const item = cart.value.find(
      (i: CartItem) => i.productId === product.id
    )

    if (item) {
      item.qty++
    } else {
      cart.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
      })
    }
  }

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(
      (i: CartItem) => i.productId !== productId
    )
  }

  const clearCart = () => {
    cart.value = []
  }

  const checkout = () => {
    if (cart.value.length === 0) return

    const productStore = useProductStore()

    cart.value.forEach((item: CartItem) => {
      const product = productStore.products.find(
        (p: { id: number }) => p.id === item.productId
      )
      if (product) {
        product.stock -= item.qty
      }
    })

    productStore.saveToStorage()

    const tx: Transaction = {
      id: Date.now(),
      items: [...cart.value],
      total: cartTotal.value,
      date: new Date().toISOString(),
    }

    transactions.value.push(tx)
    lastTransaction.value = tx

    clearCart()
  }

  return {
    // expose state
    cart,
    transactions,
    lastTransaction,

    // expose getters
    cartTotal,

    // expose actions
    addToCart,
    removeFromCart,
    clearCart,
    checkout,
  }
})
