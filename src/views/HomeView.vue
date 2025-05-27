<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const pages = ref([
  { name: 'Home', path: '/' },
  { name: 'Watchlist', path: '/watchlist' },
  { name: 'Details', path: '/details' },
])
</script>

<template>
  <div class="h-screen w-full bg-[#1e1e1e] text-center text-gray-50 p-4">
    <nav class="h-20 w-full text-2xl flex items-center justify-center">
      <h1>Welcome to <span>Aiwatch....</span> Your personalised anime watchlist.</h1>
    </nav>
    <main class="h-[90%] w-full flex items-center justify-center">
      <div
        class="h-[50%] w-[50%] border border-white p-3 flex flex-col items-center justify-center space-y-10 text-2xl"
      >
        <li v-for="(items, index) in pages" :key="index" class="list-none">
          <RouterLink :to="items.path">{{ items.name }}</RouterLink>
        </li>
      </div>
    </main>
  </div>
</template>
