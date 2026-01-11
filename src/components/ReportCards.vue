<script setup lang="ts">
defineProps<{
  omzet: number
  transaksi: number
  itemTerjual: number
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div class="text-gray-500">Omzet</div>
      <div class="text-2xl font-bold">
        Rp {{ omzet.toLocaleString() }}
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div class="text-gray-500">Transaksi</div>
      <div class="text-2xl font-bold">
        {{ transaksi }}
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div class="text-gray-500">Item Terjual</div>
      <div class="text-2xl font-bold">
        {{ itemTerjual }}
      </div>
    </div>
  </div>
</template>
    