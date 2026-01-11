<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore, type Product } from '../stores/products'

const store = useProductStore()

const form = ref<Omit<Product, 'id'> & { id?: number }>({
  name: '',
  price: 0,
  stock: 0,
})

const isEdit = ref(false)

const resetForm = () => {
  form.value = { name: '', price: 0, stock: 0 }
  isEdit.value = false
}

const submit = () => {
  if (isEdit.value && form.value.id) {
    store.updateProduct(form.value as Product)
  } else {
    store.addProduct(form.value)
  }
  resetForm()
}

const editProduct = (product: Product) => {
  form.value = { ...product }
  isEdit.value = true
}

const deleteProduct = (id: number) => {
  if (confirm('Hapus produk ini?')) {
    store.deleteProduct(id)
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Manajemen Produk</h1>

    <!-- FORM -->
    <form
      @submit.prevent="submit"
      class="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-4"
    >
      <input
        v-model="form.name"
        placeholder="Nama Produk"
        class="border p-2 rounded"
        required
      />
      <input
        v-model.number="form.price"
        type="number"
        placeholder="Harga"
        class="border p-2 rounded"
        required
      />
      <input
        v-model.number="form.stock"
        type="number"
        placeholder="Stok"
        class="border p-2 rounded"
        required
      />

      <button class="bg-blue-600 text-white rounded px-4">
        {{ isEdit ? 'Update' : 'Tambah' }}
      </button>
    </form>

    <!-- TABLE -->
    <div class="bg-white rounded shadow">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left p-3">Nama</th>
            <th class="text-left p-3">Harga</th>
            <th class="text-left p-3">Stok</th>
            <th class="text-left p-3">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in store.products"
            :key="p.id"
            class="border-t"
          >
            <td class="p-3">{{ p.name }}</td>
            <td class="p-3">Rp {{ p.price }}</td>
            <td class="p-3">{{ p.stock }}</td>
            <td class="p-3 space-x-2">
              <button
                @click="editProduct(p)"
                class="px-2 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(p.id)"
                class="px-2 py-1 bg-red-500 text-white rounded"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
