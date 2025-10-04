<script setup>
import { RouterView } from 'vue-router'
import { toastMessage, toastType } from '@/services/watchlistServices'

import Toast from './components/Toast.vue'
import UserProvider from './components/providers/UserProvider.vue'
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
    <RouterView class="font-kanit" :key="$route.fullPath" />
  </UserProvider>
  <div class="fixed bottom-2 right-2 bg-white text-black text-xs px-2 py-1 rounded z-[9999]">
    <span class="block sm:hidden">default (&lt;640px)</span>
    <span class="hidden sm:block md:hidden">sm (≥640px)</span>
    <span class="hidden md:block lg:hidden">md (≥768px)</span>
    <span class="hidden lg:block xl:hidden">lg (≥1024px)</span>
    <span class="hidden xl:block 2xl:hidden">xl (≥1280px)</span>
    <span class="hidden 2xl:block">2xl (≥1536px)</span>
  </div>
</template>
