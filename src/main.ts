import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './stores/auth'
import { useProductStore } from './stores/products'
import './assets/main.css'
import { useUiStore } from './stores/ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const ui = useUiStore()
ui.loadTheme()

const productStore = useProductStore()
productStore.loadFromStorage()

const auth = useAuthStore()
auth.loadFromStorage()

app.mount('#app')
