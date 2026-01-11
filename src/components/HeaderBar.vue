<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useUiStore } from '../stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <header
    class="
      h-16 px-4
      flex items-center justify-between
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-gray-100
      shadow
    "
  >
    <div class="flex items-center gap-3">
      <button class="md:hidden text-2xl" @click="ui.toggleSidebar">☰</button>
      <h1 class="font-semibold text-lg">Dashboard</h1>
    </div>

    <div class="flex items-center gap-3">
      <!-- 🌙 Toggle -->
      <button
        @click="ui.toggleTheme"
        class="text-xl"
        title="Toggle dark mode"
      >
        {{ ui.darkMode ? '☀️' : '🌙' }}
      </button>

      <span class="hidden sm:block">
        {{ auth.user?.name }}
      </span>

      <button
        @click="logout"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </header>
</template>
