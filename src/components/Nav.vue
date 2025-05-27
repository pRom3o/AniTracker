<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const pages = ref([
  { name: 'Home', path: '/' },
  { name: 'Watchlist', path: '/watchlist' },
  { name: 'Search', path: '/search' },
])
</script>

<template>
  <div
    class="max-w-full rounded-full backdrop-blur-md overlay p-2 m-2 flex items-center justify-between fixed left-0 right-0 top-2"
  >
    <div class="rounded-full w-[5%] hidden md:flex justify-center">
      <RouterLink to="/">AW</RouterLink>
    </div>
    <div
      class="md:max-w-[30%] w-[90%] space-x-2 p-2 overlay2 rounded-full flex items-center justify-evenly"
    >
      <li
        v-for="(items, index) in pages"
        :key="index"
        class="list-none px-4 py-1 hover:backdrop-blur-lg rounded-2xl"
      >
        <RouterLink :to="items.path">{{ items.name }}</RouterLink>
      </li>
    </div>
    <div class="md:w-[5%] flex justify-center p-2 hover:backdrop-blur-lg rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0-7l2.39 3.42C13.65 5.15 12.84 5 12 5s-1.65.15-2.39.42zM3.34 7l4.16-.35A7.2 7.2 0 0 0 5.94 8.5c-.44.74-.69 1.5-.83 2.29zm.02 10l1.76-3.77a7.13 7.13 0 0 0 2.38 4.14zM20.65 7l-1.77 3.79a7.02 7.02 0 0 0-2.38-4.15zm-.01 10l-4.14.36c.59-.51 1.12-1.14 1.54-1.86c.42-.73.69-1.5.83-2.29zM12 22l-2.41-3.44c.74.27 1.55.44 2.41.44c.82 0 1.63-.17 2.37-.44z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.2);
}
.overlay2 {
  background-color: rgba(0, 0, 0, 0.4);
}
::placeholder {
  color: white;
  opacity: 0.7;
}
</style>
