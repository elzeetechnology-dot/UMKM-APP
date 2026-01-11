<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

defineProps<{
  labels: string[]
  values: number[]
}>()

const chartData = (labels: string[], values: number[]) => ({
  labels,
  datasets: [
    {
      label: 'Omzet',
      data: values,
    },
  ],
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
    <h3 class="font-semibold mb-2">Penjualan Harian</h3>
    <Bar :data="chartData(labels, values)" />
  </div>
</template>
