<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import { onMounted } from 'vue'
import Nav from '../components/Nav.vue'

// shadow-xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102

import { watchlist, removeFromWatchlist } from '../state/watchlistStates'

// onMounted(localStorage.clear())
</script>

<template>
  <div class="min-h-screen w-full text-white/80 text-center flex flex-col body">
    <Nav />
    <div class="p-6 flex-1 mt-5">
      <div
        v-if="Object.values(watchlist).every((category) => category.length === 0)"
        class="flex items-center justify-center h-[100vh]"
      >
        <h1 class="text-4xl header"><i>Nothing in your watchlist...</i></h1>
      </div>
      <div v-else class="">
        <h2 class="text-center md:text-3xl font-bold text-3xl md:mt-30 md:mb-5 m-14">
          My watchlist
        </h2>
        <div class="flex flex-col justify-evenly md:p-6">
          <div
            v-for="(animes, category) in watchlist"
            :key="category"
            class="flex flex-col w-full text-xs md:text-base"
          >
            <h2 class="md:text-5xl text-3xl font-bold header">{{ category }}</h2>

            <div class="flex items-center justify-center">
              <div
                class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-3 md:mt-5 md:w-[80%] w-full"
              >
                <div
                  v-for="anime in animes"
                  :scr="anime.images.jpg.image_url || anime.images.webp.image_url"
                  :key="anime.title_english || anime.id"
                  class="p-3 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-between">
                    <!-- image source -->
                    <img
                      :alt="anime.title_english || 'Anime poster'"
                      class="max-h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full mt-2">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <button
                      class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/20 mt-2"
                      @click="removeFromWatchlist(anime, category)"
                    >
                      Remove from watchlist
                    </button>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl m-1 bg-black/10"
                      @click="removeFromWatchlist(anime, category)"
                    >
                      <!-- SVG content -->

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
  </div>
</template>

<style scoped>
.header {
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.background {
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
.cards {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.body {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #2d1b4e 100%);
}
.scroll-hidden::-webkit-scrollbar {
  display: none;
}
</style>
