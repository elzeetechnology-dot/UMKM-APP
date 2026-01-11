import { defineStore } from 'pinia'
import { useProductStore } from './products'
import type { Supplier } from './supplier'

export interface StockIn {
  id: number
  productId: number
  productName: string
  qty: number
  supplier?: Supplier
  date: string
}

export const useStockStore = defineStore('stock', {
  state: () => ({
    history: [] as StockIn[],
  }),

  actions: {
    addStock(productId: number, qty: number, supplier?: Supplier) {
      const productStore = useProductStore()
      const product = productStore.products.find(p => p.id === productId)

      if (!product) return

      product.stock += qty
      productStore.saveToStorage()

      this.history.push({
        id: Date.now(),
        productId,
        productName: product.name,
        qty,
        supplier,
        date: new Date().toISOString(),
      })
    },
  },
})
