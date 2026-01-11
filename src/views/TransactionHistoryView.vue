<script setup lang="ts">
import { useTransactionStore } from '../stores/transaction'
import { exportToPDF, exportToExcel } from '../utils/exportTransaction'

const txStore = useTransactionStore()

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('id-ID')
}
</script>

<template>
    <div class="flex gap-2 mb-4">
  <button
    class="bg-red-600 text-white px-3 py-2 rounded"
    @click="exportToPDF(txStore.transactions)"
  >
    Export PDF
  </button>

  <button
    class="bg-green-600 text-white px-3 py-2 rounded"
    @click="exportToExcel(txStore.transactions)"
  >
    Export Excel
  </button>
</div>

  <div>
    <h1 class="text-2xl font-bold mb-4">Riwayat Transaksi</h1>

    <div
      v-if="txStore.transactions.length === 0"
      class="text-gray-500"
    >
      Belum ada transaksi
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded shadow">
      <table class="w-full">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="text-left p-3">Tanggal</th>
            <th class="text-left p-3">Item</th>
            <th class="text-left p-3">Total</th>
            <th class="text-left p-3">Detail</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="tx in txStore.transactions"
            :key="tx.id"
            class="border-t dark:border-gray-700"
          >
            <td class="p-3">{{ formatDate(tx.date) }}</td>
            <td class="p-3">{{ tx.items.length }}</td>
            <td class="p-3 font-semibold">
              Rp {{ tx.total.toLocaleString() }}
            </td>
            <td class="p-3">
              <details>
                <summary class="cursor-pointer text-blue-600">
                  Lihat
                </summary>
                <ul class="mt-2 text-sm">
                  <li
                    v-for="item in tx.items"
                    :key="item.productId"
                  >
                    {{ item.name }} x {{ item.qty }} —
                    Rp {{ item.price * item.qty }}
                  </li>
                </ul>
              </details>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
