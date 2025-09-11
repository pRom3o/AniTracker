<script setup>
import { RouterView } from 'vue-router'
import { toastMessage, toastType } from '@/services/watchlistServices'
// import { onMounted, watchEffect, inject } from 'vue'

import Toast from './components/Toast.vue'
import UserProvider from './components/providers/UserProvider.vue'

// const router = useRouter()
// const auth = inject('auth')

// onMounted(() => {
//   watchEffect(() => {
//     if (auth && !auth.loading && !auth.user) {
//       console.log('user not found')
//       router.push('/auth')
//     }
//     console.log('user found')
//     router.push('/')
//   })
// })
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
  <UserProvider>
    <RouterView class="font-kanit" />
  </UserProvider>
</template>
