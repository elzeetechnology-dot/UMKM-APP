<script setup lang="ts">
import StatCard from '../components/StatCard.vue'
import { useProductStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'
import StockChart from '../components/StockChart.vue'

const productStore = useProductStore()
const authStore = useAuthStore()
</script>

<template>
  <div>
   <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
  Dashboard
</h1>


    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        title="Total Produk"
        :value="productStore.totalProducts"
      />

      <StatCard
        title="Total Stok"
        :value="productStore.totalStock"
        subtitle="Jumlah seluruh stok"
      />

      <StatCard
        title="Nilai Stok"
        :value="`Rp ${productStore.totalStockValue.toLocaleString()}`"
        subtitle="Estimasi nilai barang"
      />

      <StatCard
        title="Role"
        :value="authStore.user?.role ?? '-'"
        subtitle="Hak akses"
      />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  <StockChart />
</div>
  </div>
</template>
