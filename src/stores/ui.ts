import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: false,
    darkMode: false,
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },

    loadTheme() {
      const saved = localStorage.getItem('theme')
      this.darkMode = saved === 'dark'
      this.applyTheme()
    },

    toggleTheme() {
      this.darkMode = !this.darkMode
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light')
      this.applyTheme()
    },

    applyTheme() {
      const html = document.documentElement
      if (this.darkMode) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    },
  },
})

