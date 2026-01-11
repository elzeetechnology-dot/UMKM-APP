import { defineStore } from 'pinia'
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

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    cart: [] as CartItem[],
    transactions: [] as Transaction[],
    lastTransaction: null as Transaction | null,
  }),

  getters: {
    cartTotal: (state) =>
      state.cart.reduce((sum, i) => sum + i.price * i.qty, 0),
  },

  actions: {
    addToCart(product: { id: number; name: string; price: number }) {
      const item = this.cart.find(i => i.productId === product.id)
      if (item) {
        item.qty++
      } else {
        this.cart.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        })
      }
    },

    removeFromCart(productId: number) {
      this.cart = this.cart.filter(i => i.productId !== productId)
    },

    clearCart() {
      this.cart = []
    },

    checkout() {
      if (this.cart.length === 0) return

      const productStore = useProductStore()

      // kurangi stok
      this.cart.forEach(item => {
        const product = productStore.products.find(
          p => p.id === item.productId
        )
        if (product) {
          product.stock -= item.qty
        }
      })

      productStore.saveToStorage()

      const tx: Transaction = {
        id: Date.now(),
        items: [...this.cart], // clone aman
        total: this.cartTotal,
        date: new Date().toISOString(),
      }

      this.transactions.push(tx)
      this.lastTransaction = tx

      this.clearCart()
    },
  },
})
