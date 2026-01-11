<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '../stores/products'
import { useStockStore } from '../stores/stock'
import { useSupplierStore } from '../stores/supplier'

const productStore = useProductStore()
const stockStore = useStockStore()
const supplierStore = useSupplierStore()

const productId = ref<number>()
const qty = ref(0)
const supplierId = ref<number>()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Stok Masuk</h1>

    <div class="bg-white p-4 rounded shadow mb-6 space-y-3">
      <select v-model="productId" class="border p-2 w-full">
        <option disabled value="">Pilih Produk</option>
        <option
          v-for="p in productStore.products"
          :key="p.id"
          :value="p.id"
        >
          {{ p.name }}
        </option>
      </select>

      <input
        type="number"
        v-model="qty"
        placeholder="Jumlah"
        class="border p-2 w-full"
      />

      <select v-model="supplierId" class="border p-2 w-full">
        <option disabled value="">Supplier (opsional)</option>
        <option
          v-for="s in supplierStore.suppliers"
          :key="s.id"
          :value="s.id"
        >
          {{ s.name }}
        </option>
      </select>

      <button
        class="bg-green-600 text-white py-2 w-full rounded"
        @click="stockStore.addStock(
          productId!,
          qty,
          supplierStore.suppliers.find(s => s.id === supplierId)
        )"
      >
        Simpan Stok Masuk
      </button>
    </div>

    <h2 class="font-semibold mb-2">Riwayat Stok Masuk</h2>

    <ul class="space-y-1">
      <li
        v-for="h in stockStore.history"
        :key="h.id"
        class="text-sm"
      >
        {{ h.productName }} +{{ h.qty }}
        ({{ new Date(h.date).toLocaleDateString() }})
      </li>
    </ul>
  </div>
</template>
