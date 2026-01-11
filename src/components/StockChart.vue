<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useProductStore } from '../stores/products'

Chart.register(...registerables)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const productStore = useProductStore()

let chart: Chart | null = null

const renderChart = () => {
  if (!canvasRef.value) return

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: productStore.products.map(p => p.name),
      datasets: [
        {
          label: 'Stok Produk',
          data: productStore.products.map(p => p.stock),
          backgroundColor: '#3b82f6', // blue-500
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })
}

onMounted(renderChart)

// update otomatis kalau produk berubah
watch(
  () => productStore.products,
  renderChart,
  { deep: true }
)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 class="font-semibold mb-3 text-gray-800 dark:text-gray-100">
      Stok Produk
    </h2>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
