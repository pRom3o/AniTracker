import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initAuth } from './composables/useAuth'

const app = createApp(App)

initAuth()
app.use(router)

app.mount('#app')
