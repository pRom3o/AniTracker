<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Nav from '../components/Nav.vue'
import { onMounted, computed } from 'vue'
import {
  watchlist,
  removeFromWatchlist,
  fetchData,
  categories,
  updateCategory,
} from '../services/watchlistServices'

onMounted(() => {
  fetchData()
})

// array to store watched animes
const watchedList = computed(() => watchlist.value.filter((anime) => anime.status === 'Watched'))

// array to store Currently watching animes
const currentlyWatchingList = computed(() =>
  watchlist.value.filter((anime) => anime.status === 'Currently watching'),
)

// array to store Interested in animes
const interestedInList = computed(() =>
  watchlist.value.filter((anime) => anime.status === 'Interested in'),
)
console.log('Interested in', interestedInList.value)
</script>

<template>
  <div class="min-h-screen w-full text-white/80 text-center flex flex-col body">
    <Nav />
    <div class="p-6 flex-1 mt-5">
      <div v-if="watchlist.length == 0" class="flex items-center justify-center h-[100vh]">
        <h1 class="md:text-4xl header"><i>Nothing in your watchlist...</i></h1>
      </div>
      <div v-else class="">
        <h2 class="text-center md:text-3xl font-bold text-2xl md:m-20 mb-8 mt-12">My watchlist</h2>
        <!-- Watched section -->
        <Transition name="fade-slide" appear
          ><div v-if="watchedList.length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Watched</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-3 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in watchedList"
                  :key="index"
                  class="p-2 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-evenly">
                    <!-- image source -->
                    <img
                      :src="anime.image_url"
                      :alt="anime.title_english || 'Anime poster'"
                      class="max-h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full my-2 md:text-base text-xs">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || anime.title || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <button
                      class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/20 mt-2"
                      @click="removeFromWatchlist(anime.id)"
                    >
                      Remove from watchlist
                    </button>
                    <select
                      name="category"
                      id="category"
                      class="text-sm outline-none"
                      v-model="anime.status"
                      @change="updateCategory(anime.id, anime.status)"
                    >
                      <option
                        :value="category"
                        v-for="category in categories"
                        :key="category"
                        class="bg-blue-400 text-black"
                      >
                        {{ category }}
                      </option>
                    </select>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl bg-black/10"
                      @click="removeFromWatchlist(anime.id)"
                    >
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
          ><div v-if="currentlyWatchingList.length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Currently watching</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-3 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in currentlyWatchingList"
                  :key="index"
                  class="p-2 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-evenly">
                    <!-- image source -->
                    <img
                      :src="anime.image_url"
                      :alt="anime.title_english || 'Anime poster'"
                      class="max-h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full my-2 md:text-base text-xs">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || anime.title || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <button
                      class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/20 mt-2"
                      @click="removeFromWatchlist(anime.id)"
                    >
                      Remove from watchlist
                    </button>
                    <select
                      name="category"
                      id="category"
                      class="text-sm outline-none"
                      v-model="anime.status"
                      @change="updateCategory(anime.id, anime.status)"
                    >
                      <option :value="category" v-for="category in categories" :key="category">
                        {{ category }}
                      </option>
                    </select>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl bg-black/10"
                      @click="removeFromWatchlist(anime.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div></Transition
        >
        <!-- Interested in section -->
        <Transition name="fade-slide" appear
          ><div v-if="interestedInList.length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Interested in</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-3 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in interestedInList"
                  :key="index"
                  class="p-2 background rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102"
                >
                  <div class="flex flex-col h-full justify-evenly">
                    <!-- image source -->
                    <img
                      :src="anime.image_url"
                      :alt="anime.title_english || 'Anime poster'"
                      class="max-h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full my-2 md:text-base text-xs">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || anime.title || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <button
                      class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/20 mt-2"
                      @click="removeFromWatchlist(anime.id)"
                    >
                      Remove from watchlist
                    </button>
                    <div class="">
                      <label for="category">update category</label>
                      <select
                        name="category"
                        id="category"
                        class="text-sm outline-none"
                        v-model="anime.status"
                        @change="updateCategory(anime.id, anime.status)"
                      >
                        <option :value="category" v-for="category in categories" :key="category">
                          {{ category }}
                        </option>
                      </select>
                    </div>
                    <button
                      class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl bg-black/10"
                      @click="removeFromWatchlist(anime.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div></Transition
        >
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
