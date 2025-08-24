import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { supabase } from './services/supabaseClient'
import { initAuth } from './services/authServices'

initAuth()
// supabase.auth.getSession().then(({ data: { session } }) => {
//   userSession.value = session
// })

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const userId = session.user.id

    // Check if profile exists
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profile) {
      console.log('Profile exists:', userId)
    } else if (error?.code === 'PGRST116') {
      // Insert a new profile row for the user
      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: userId }]) // name/bio can be updated later
      if (insertError) {
        console.error('Profile insert failed:', insertError.message)
      } else {
        console.log('insert successful', insertedProfile)
      }
    } else if (error && error.code !== 'PGRST116') {
      console.error('Unexoected error', error.message)
    }
  }
})

const app = createApp(App)
app.use(router)

app.mount('#app')
