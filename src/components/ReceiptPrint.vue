<script setup lang="ts">
import type { Transaction } from '../stores/transaction'

defineProps<{
  transaction: Transaction
}>()

const formatDate = (date: string) =>
  new Date(date).toLocaleString('id-ID')
</script>

<template>
  <div id="receipt">
    <h2 class="title">TOKO UMKM</h2>
    <p class="center">Jl. Contoh No. 123</p>
    <p class="center">----------------------</p>

    <p>Tanggal: {{ formatDate(transaction.date) }}</p>
    <p>ID: {{ transaction.id }}</p>

    <p class="center">----------------------</p>

    <div
      v-for="item in transaction.items"
      :key="item.productId"
    >
      <div class="row">
        <span>{{ item.name }}</span>
      </div>
      <div class="row">
        <span>{{ item.qty }} x {{ item.price }}</span>
        <span>{{ item.qty * item.price }}</span>
      </div>
    </div>

    <p class="center">----------------------</p>

    <div class="row total">
      <span>TOTAL</span>
      <span>{{ transaction.total }}</span>
    </div>

    <p class="center">----------------------</p>
    <p class="center">Terima Kasih 🙏</p>
  </div>
</template>

<style>
/* ============================= */
/* STRUK NORMAL (LAYAR) */
/* ============================= */
#receipt {
  width: 58mm;
  font-family: monospace;
  font-size: 12px;
  color: black;
  background: white;
  padding: 4mm;
}

.title {
  text-align: center;
  font-weight: bold;
}

.center {
  text-align: center;
}

.row {
  display: flex;
  justify-content: space-between;
}

.total {
  font-weight: bold;
}

/* ============================= */
/* MODE PRINT (THERMAL) */
/* ============================= */
@media print {
  /* SEMBUNYIKAN SEMUA, TAPI TETAP ADA DI LAYOUT */
  body * {
    visibility: hidden;
  }

  /* TAMPILKAN STRUK */
  #receipt,
  #receipt * {
    visibility: visible;
  }

  #receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 58mm;
  }

  @page {
    size: 58mm auto;
    margin: 0;
  }
}

</style>
