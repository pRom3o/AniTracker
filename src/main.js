import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { supabase } from './services/supabaseClient'
// import { userSession } from './services/authServices'

const app = createApp(App)

app.use(router)

app.mount('#app')

// supabase.auth.onAuthStateChange((event, session) => {
//   userSession.value = session
// })
