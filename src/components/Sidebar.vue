<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'
import { menuItems } from '../config/menu'

const auth = useAuthStore()
const ui = useUiStore()

const filteredMenu = computed(() =>
  menuItems.filter(item =>
    item.roles.includes(auth.user?.role as any)
  )
)
</script>

<template>
  <!-- Overlay (mobile) -->
  <div
    v-if="ui.sidebarOpen"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    @click="ui.closeSidebar"
  ></div>

  <aside
    class="
      fixed md:static z-50
      w-64 h-screen p-6
      bg-gray-900 text-white
      dark:bg-gray-950
      transform transition-transform
      md:translate-x-0
    "
    :class="ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <h2 class="text-xl font-bold mb-6">UMKM App</h2>

    <nav class="space-y-2">
      <RouterLink
        v-for="item in filteredMenu"
        :key="item.to"
        :to="item.to"
        class="block px-3 py-2 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
        @click="ui.closeSidebar"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
