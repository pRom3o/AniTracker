<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'
import { toastMessage, toastType } from '@/services/watchlistServices'
import { supabase } from '../src/services/supabaseClient'
import { onMounted } from 'vue'
import Toast from './components/Toast.vue'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Session error:', error.message)
    console.log('Session after reload', data.session)
    return
  }
  console.log('data', data)

  // Auth state listener
  supabase.auth.onAuthStateChange((_event, session) => {
    if (!session && route.path === '/watchlist') {
      router.push('/auth')
    }
  })
})
</script>

<template>
  <div
    v-if="toastMessage"
    :class="[
      'fixed top-10 left-1/2 transform -translate-x-1/2 md:px-6 md:py-3 p-3 w-60 rounded-lg text-gray-200 shadow-lg transition duration-500 ease-in-out md:text-base text-sm text-center',
      toastType === 'success'
        ? 'bg-green-600 border border-green-800'
        : 'bg-red-700 border border-red-800',
    ]"
    style="z-index: 9999"
  >
    {{ toastMessage }}
  </div>
  <Toast />
  <RouterView />
</template>

<style scoped>
body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}
</style>
