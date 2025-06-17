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
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
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
