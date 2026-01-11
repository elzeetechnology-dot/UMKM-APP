<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '../stores/products' // ✅ FIX
import { useTransactionStore } from '../stores/transaction'
import ReceiptPrint from '../components/ReceiptPrint.vue'

const productStore = useProductStore()
const txStore = useTransactionStore()

const showReceipt = ref(false)

const checkoutAndShowReceipt = () => {
  txStore.checkout()
  showReceipt.value = true
}

const printReceipt = () => {
  window.print()
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Transaksi Kasir</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- ===================== -->
      <!-- DAFTAR PRODUK -->
      <!-- ===================== -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="font-semibold mb-3">Daftar Produk</h2>

        <ul class="space-y-2">
          <li
            v-for="p in productStore.products"
            :key="p.id"
            class="flex justify-between items-center border-b pb-2"
          >
            <div>
              <div class="font-medium">{{ p.name }}</div>
              <div class="text-sm text-gray-500">
                Rp {{ p.price.toLocaleString() }} | stok {{ p.stock }}
              </div>
            </div>

            <button
              class="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              :disabled="p.stock <= 0"
              @click="txStore.addToCart(p)"
            >
              + Tambah
            </button>
          </li>
        </ul>
      </div>

      <!-- ===================== -->
      <!-- KERANJANG -->
      <!-- ===================== -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="font-semibold mb-3">Keranjang</h2>

        <div v-if="txStore.cart.length === 0" class="text-gray-500">
          Belum ada item
        </div>

        <ul v-else class="space-y-2">
          <li
            v-for="item in txStore.cart"
            :key="item.productId"
            class="flex justify-between items-center"
          >
            <div>
              {{ item.name }} x {{ item.qty }}
            </div>
            <div>
              Rp {{ (item.price * item.qty).toLocaleString() }}
            </div>
          </li>
        </ul>

        <hr class="my-3" />

        <div class="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rp {{ txStore.cartTotal.toLocaleString() }}</span>
        </div>

        <!-- CHECKOUT -->
        <button
          class="mt-4 w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          :disabled="txStore.cart.length === 0"
          @click="checkoutAndShowReceipt"
        >
          Simpan Transaksi
        </button>
      </div>
    </div>

    <!-- ===================== -->
    <!-- STRUK + PRINT -->
    <!-- ===================== -->
    <div id="print-area" v-if="showReceipt && txStore.lastTransaction">
  <ReceiptPrint :transaction="txStore.lastTransaction" />

  <button
    class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
    @click="printReceipt"
  >
    Print
  </button>
</div>

  </div>
</template>
