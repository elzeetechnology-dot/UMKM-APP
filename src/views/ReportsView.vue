<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import ReportCards from '../components/ReportCards.vue'
import SalesChart from '../components/SalesChart.vue'

const txStore = useTransactionStore()

const totalOmzet = computed(() =>
  txStore.transactions.reduce((sum, t) => sum + t.total, 0)
)

const totalTransaksi = computed(() => txStore.transactions.length)

const totalItem = computed(() =>
  txStore.transactions.reduce(
    (sum, t) =>
      sum + t.items.reduce((i, it) => i + it.qty, 0),
    0
  )
)

// dummy chart harian
const labels = txStore.transactions.map((_, i) => `T${i + 1}`)
const values = txStore.transactions.map(t => t.total)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Laporan</h1>

    <ReportCards
      :omzet="totalOmzet"
      :transaksi="totalTransaksi"
      :item-terjual="totalItem"
    />

    <div class="mt-6">
      <SalesChart :labels="labels" :values="values" />
    </div>
  </div>
</template>
