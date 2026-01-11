<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const login = () => {
  const success = auth.login(username.value, password.value)

  if (!success) {
    error.value = 'Username atau password salah'
    return
  }

  router.push('/')
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4"
  >
    <div
      class="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
    >
      <!-- HEADER -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          UMKM App
        </h1>
        <p class="text-sm text-gray-500">
          Sistem Kasir & Manajemen UMKM
        </p>
      </div>

      <!-- ERROR -->
      <div
        v-if="error"
        class="mb-4 bg-red-100 text-red-700 p-3 rounded text-sm"
      >
        {{ error }}
      </div>

      <!-- FORM -->
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="owner / kasir"
            class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="password"
            class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>
      </form>

      <!-- FOOTER -->
      <div class="mt-6 text-center text-xs text-gray-500">
        Login sebagai:
        <div class="mt-1">
          <span class="font-semibold">Owner</span> atau
          <span class="font-semibold">Kasir</span>
        </div>
      </div>
    </div>
  </div>
</template>
