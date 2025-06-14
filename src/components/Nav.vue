<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Search from './Search.vue'
import { searchbar, anisearch } from '../state/watchlistStates'
</script>

<template>
  <div
    class="max-w-full rounded-full backdrop-blur-md overlay p-2 md:m-2 flex items-center justify-between fixed left-1 right-1 top-2 z-2 text-gray-300"
  >
    <p class="text-center p-4 rounded-full hover:backdrop-blur-lg hidden md:flex">
      <RouterLink to="/" class="logo">AniTracker</RouterLink>
    </p>
    <div class="space-x-2 p-2 overlay rounded-full flex items-center justify-evenly">
      <li class="md:px-4 md:py-1 hover:backdrop-blur-lg rounded-2xl text-sm md:text-base pl-2">
        <RouterLink to="/">Home</RouterLink>
      </li>
      <button
        type="text"
        class="px-4 py-2 rounded-3xl text-center flex items-center cursor-pointer border border-[#333333]"
        @click="anisearch"
      >
        Search
        <p class="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24 ">
            <path
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17.5 17.5L22 22m-2-11a9 9 0 0 1-17.064 4M2 11a9 9 0 0 1 17.065-4m0 0V2m0 5H14.5M2.936 15v5m0-5H7.5"
              color="#fff"
            />
          </svg>
        </p>
      </button>
      <li class="md:px-4 py-1 hover:backdrop-blur-lg rounded-2xl text-sm md:text-base pr-2">
        <RouterLink to="/watchlist">Watchlist</RouterLink>
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
  <Transition name="search">
    <Search v-if="searchbar" class="z-50" />
  </Transition>
</template>

<style scoped>
li {
  list-style: none;
}

.overlay {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #2d1b4e 100%);
}
/* .overlay2 {
  background-color: rgba(0, 0, 0, 0.4);
} */

::placeholder {
  text-align: center;
  font-size: 14px;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: scale(0.5);
  transform: translateY(-30px);
}

.search-enter-active,
.search-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
