<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import { ref } from 'vue'
import Nav from '../components/Nav.vue'

// shadow-xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102

import { watchlist, removeFromWatchlist } from '../state/watchlistStates'
</script>

<template>
  <div class="min-h-screen w-full bg-[#2e2e2e] text-center text-gray-200 flex flex-col body">
    <Nav />
    <div class="p-6 flex-1">
      <div v-if="watchlist.length == 0" class="flex items-center justify-center h-[100vh]">
        <h1 class="md:text-4xl"><i>Nothing in your watchlist...</i></h1>
      </div>
      <div v-else>
        <h2 class="text-center md:text-3xl text-xl md:mt-20 mt-14">My watchlist</h2>
        <div class="flex flex-col justify-evenly md:p-6">
          <div
            v-for="(animes, category) in watchlist"
            :key="category"
            class="flex flex-col w-full text-xs md:text-base"
          >
            <h2 class="text-2xl font-bold mb-2 text-center">{{ category }}</h2>
            <div
              class="md:p-3 grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-3 md:gap-2 md:mt-10 mt-5 md:w-[80%]"
            >
              <div v-for="(anime, index) in animes" :key="index" class="">
                <div class="flex flex-col">
                  <img alt="" class="max-h-full aspect-[2/3] w-full object-cover rounded-lg" />
                  <p class="w-full">
                    {{
                      anime.title_english && anime.title_english.length > 30
                        ? anime.title_english.slice(0, 30) + '...'
                        : anime.title_english || 'No title available'
                    }}
                  </p>
                  <button
                    class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer hover:bg-[#282828] rounded-3xl"
                    @click="removeFromWatchlist(anime)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fff"
                        d="m12 12.708l3.246 3.246q.14.14.344.15t.364-.15t.16-.354t-.16-.354L12.708 12l3.246-3.246q.14-.14.15-.344t-.15-.364t-.354-.16t-.354.16L12 11.292L8.754 8.046q-.14-.14-.344-.15t-.364.15t-.16.354t.16.354L11.292 12l-3.246 3.246q-.14.14-.15.345q-.01.203.15.363t.354.16t.354-.16zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                      />
                    </svg>
                    Remove from watchlist
                  </button>
                  <button
                    class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden bg-[#212121] rounded-3xl m-1"
                    @click="removeFromWatchlist(anime)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fff"
                        d="m12 12.708l3.246 3.246q.14.14.344.15t.364-.15t.16-.354t-.16-.354L12.708 12l3.246-3.246q.14-.14.15-.344t-.15-.364t-.354-.16t-.354.16L12 11.292L8.754 8.046q-.14-.14-.344-.15t-.364.15t-.16.354t.16.354L11.292 12l-3.246 3.246q-.14.14-.15.345q-.01.203.15.363t.354.16t.354-.16zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #2d1b4e 100%);
}
.scroll-hidden::-webkit-scrollbar {
  display: none;
}
</style>
