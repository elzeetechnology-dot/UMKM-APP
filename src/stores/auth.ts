import { defineStore } from 'pinia'

interface User {
  name: string
  role: 'owner' | 'kasir'
}

const STORAGE_KEY = 'umkm_auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
  }),

  actions: {
    loadFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        this.user = data.user
        this.isLoggedIn = true
      }
    },

    login(username: string, password: string) {
  if (username && password) {
    this.user = {
      name: username === 'kasir' ? 'Kasir UMKM' : 'Owner UMKM',
      role: username === 'kasir' ? 'kasir' : 'owner',
    }
    this.isLoggedIn = true

    localStorage.setItem(
      'umkm_auth',
      JSON.stringify({ user: this.user })
    )
    return true
  }
  return false
},

    logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
