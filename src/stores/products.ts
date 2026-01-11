import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  stock: number
}

const STORAGE_KEY = 'umkm_products'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),

getters: {
    totalProducts: (state) => state.products.length,

    totalStock: (state) =>
      state.products.reduce((sum, p) => sum + p.stock, 0),

    totalStockValue: (state) =>
      state.products.reduce((sum, p) => sum + p.stock * p.price, 0),
  },

  actions: {
    loadFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        this.products = JSON.parse(saved)
      } else {
        // data awal
        this.products = [
          { id: 1, name: 'Beras 5 Kg', price: 65000, stock: 20 },
          { id: 2, name: 'Gula 1 Kg', price: 15000, stock: 50 },
        ]
        this.saveToStorage()
      }
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
    },

    addProduct(product: Omit<Product, 'id'>) {
      this.products.push({
        id: Date.now(),
        ...product,
      })
      this.saveToStorage()
    },

    updateProduct(updated: Product) {
      const index = this.products.findIndex(p => p.id === updated.id)
      if (index !== -1) {
        this.products[index] = updated
        this.saveToStorage()
      }
    },

    deleteProduct(id: number) {
      this.products = this.products.filter(p => p.id !== id)
      this.saveToStorage()
    },
  },
})
