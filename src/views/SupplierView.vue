<script setup lang="ts">
import { ref } from 'vue'
import { useSupplierStore } from '../stores/supplier'

const supplierStore = useSupplierStore()

const name = ref('')
const phone = ref('')
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Supplier</h1>

    <div class="bg-white p-4 rounded shadow mb-6">
      <input
        v-model="name"
        placeholder="Nama supplier"
        class="border p-2 mr-2"
      />
      <input
        v-model="phone"
        placeholder="No. Telp"
        class="border p-2 mr-2"
      />
      <button
        class="bg-blue-600 text-white px-3 py-2 rounded"
        @click="supplierStore.addSupplier(name, phone)"
      >
        Tambah
      </button>
    </div>

    <ul>
      <li
        v-for="s in supplierStore.suppliers"
        :key="s.id"
      >
        {{ s.name }} — {{ s.phone }}
      </li>
    </ul>
  </div>
</template>
