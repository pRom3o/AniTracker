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
        <h1 class="md:text-4xl header"><i>Nothing in your watchlist...</i></h1>
      </div>
      <div v-else class="">
        <h2 class="text-center md:text-3xl font-bold text-xl md:m-20 m-8">My watchlist</h2>
        <!-- Watched section -->
        <Transition name="fade-slide" appear
          ><div v-if="watchlist['Watched'].length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Watched</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2 gap-3 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in watchlist['Watched']"
                  :key="index"
                  class="p-3 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-between leave enter">
                    <!-- image source -->
                    <img
                      :src="anime.images.jpg.image_url"
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
                      @click="removeFromWatchlist(anime, 'Watched')"
                    >
                      Remove from watchlist
                    </button>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl m-1 bg-black/10"
                      @click="removeFromWatchlist(anime, 'Watched')"
                    >
                      <!-- SVG content -->

                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div></Transition
        >
        <!-- Currently watching section -->
        <Transition name="fade-slide" appear
          ><div v-if="watchlist['Currently watching'].length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Currently watching</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2 gap-3 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in watchlist['Currently watching']"
                  :key="index"
                  class="p-3 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-between">
                    <!-- image source -->
                    <img
                      :src="anime.images.jpg.image_url"
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
                      @click="removeFromWatchlist(anime, 'Currently watching')"
                    >
                      Remove from watchlist
                    </button>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl m-1 bg-black/10"
                      @click="removeFromWatchlist(anime, 'Currently watching')"
                    >
                      <!-- SVG content -->

                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div></Transition
        >
        <!-- Interested in section -->
        <transition name="fade-slide" appear>
          <div v-if="watchlist['Interested in'].length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Interested in</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2 gap-3 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in watchlist['Interested in']"
                  :key="index"
                  class="p-3 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-between">
                    <!-- image source -->
                    <img
                      :src="anime.images.jpg.image_url"
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
                      @click="removeFromWatchlist(anime, 'Interested in')"
                    >
                      Remove from watchlist
                    </button>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl m-1 bg-black/10"
                      @click="removeFromWatchlist(anime, 'Interested in')"
                    >
                      <!-- SVG content -->

                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header,
h2 {
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
