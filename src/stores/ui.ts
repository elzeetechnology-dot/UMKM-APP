import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // STATE
  const sidebarOpen = ref(false)
  const darkMode = ref(false)

  // ACTIONS
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const loadTheme = () => {
    const saved = localStorage.getItem('theme')
    darkMode.value = saved === 'dark'
    applyTheme()
  }

  const toggleTheme = () => {
    darkMode.value = !darkMode.value
    localStorage.setItem(
      'theme',
      darkMode.value ? 'dark' : 'light'
    )
    applyTheme()
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle(
      'dark',
      darkMode.value
    )
  }

  return {
    // expose state
    sidebarOpen,
    darkMode,

    // expose actions
    toggleSidebar,
    closeSidebar,
    loadTheme,
    toggleTheme,
    applyTheme,
  }
})
