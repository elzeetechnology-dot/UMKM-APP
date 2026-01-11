import { defineStore } from 'pinia'

export interface Supplier {
  id: number
  name: string
  phone?: string
}

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: [] as Supplier[],
  }),

  actions: {
    addSupplier(name: string, phone?: string) {
      this.suppliers.push({
        id: Date.now(),
        name,
        phone,
      })
    },
  },
})
