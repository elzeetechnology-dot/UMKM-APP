<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import HeaderBar from '../components/HeaderBar.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />

    <div class="flex flex-col flex-1">
      <HeaderBar />

      <main class="p-4 md:p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
