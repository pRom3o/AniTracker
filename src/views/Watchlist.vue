<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Nav from '../components/Nav.vue'
import { computed } from 'vue'
import {
  watchlist,
  removeFromWatchlist,
  categories,
  open_menu_id,
  toggleMenu,
  showUpdateModal,
  select_edit_id,
  is_data_fetched,
  closeMenu,
  handleCategoryUpdate,
} from '../services/watchlistServices'
import EllipsisIcon from '../../public/icons/ellipsisIcon.vue'

// array to store watched animes
const watchedList = computed(() => watchlist.value.filter((anime) => anime.status === 'Watched'))

// array to store Currently watching animes
const watchingList = computed(() => watchlist.value.filter((anime) => anime.status === 'Watching'))

// array to store Interested in animes
const interestedInList = computed(() =>
  watchlist.value.filter((anime) => anime.status === 'Interested in'),
)

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
</script>

<template>
  <div class="min-h-screen w-full text-white/80 text-center flex flex-col body">
    <Nav />
    <div v-if="is_data_fetched == false" class="md:mt-28 mt-10 mb-8">
      <div class="flex items-center justify-center md:p-6 p-3 mt-20">
        <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 md:w-[80%] gap-2 w-full mt-5">
          <div
            class="flex flex-col md:h-80 md:w-64 min-h-52 min-w-32 background backdrop-blur-3xl shadow-lg rounded-3xl animate-pulse"
            v-for="_ in arr"
            :key="_"
          ></div>
        </div>
      </div>
    </div>
    <div class="py-6 px-4 flex-1 mt-5" v-else>
      <div v-if="watchlist.length == 0" class="flex items-center justify-center h-[80vh]">
        <h1 class="md:text-4xl header"><i>Nothing in your watchlist...</i></h1>
      </div>
      <div v-else class="">
        <h2 class="text-center md:text-3xl font-bold text-2xl md:m-20 mb-8 mt-12">My watchlist</h2>
        <!-- Watched section -->
        <Transition name="fade-slide" appear
          ><div v-if="watchedList.length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Watched</h2>
            <div class="flex items-center justify-center">
              <div
                class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 md:gap-2 gap-2.5 md:w-[80%] w-full"
              >
                <div
                  v-for="(anime, index) in watchedList"
                  :key="index"
                  class="p-2 cards md:max-h-80 md:max-w-64 min-h-52 min-w-32 rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102 relative"
                >
                  <EllipsisIcon
                    class="p-1 cursor-pointer mt-2 rounded-full hover:bg-black/20 absolute bottom-2 right-0 md:mx-1"
                    @click="toggleMenu(anime.id)"
                  />
                  <div class="flex flex-col h-full justify-evenly space-y-2">
                    <!-- image source -->
                    <img
                      :src="anime.image_url"
                      :alt="anime.title_english || 'Anime poster'"
                      class="h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full my-2 pr-3 md:text-base text-[10px]">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || anime.title || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <Transition name="ellipsis"
                      ><div
                        class="background inset-0 flex items-center flex-col backdrop-blur-xl justify-center text-gray-300 absolute top-0 left-0 p-2 rounded-3xl"
                        v-if="open_menu_id === anime.id"
                        @click.self="closeMenu"
                      >
                        <button
                          class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/30 bg-black/50 mb-3"
                          @click="removeFromWatchlist(anime.id)"
                        >
                          Remove
                        </button>

                        <button
                          class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl bg-black/50"
                          @click="removeFromWatchlist(anime.id)"
                        >
                          Remove
                        </button>
                        <button
                          class="w-full md:p-3 p-1 flex items-center justify-evenly md:text-sm text-xs cursor-pointer rounded-3xl hover:bg-black/30 mt-3 bg-black/50"
                          @click="showUpdateModal(anime.id)"
                        >
                          Update category
                        </button>
                        <Transition name="category-dropdown"
                          ><div
                            class="background absolute inset-0 z-50 w-full text-white flex flex-col items-center justify-center space-y-4 rounded-3xl"
                            v-if="select_edit_id === anime.id"
                            @click.self="closeMenu"
                          >
                            <div
                              class="backdrop-blur-xl w-full rounded-3xl flex flex-col items-center justify-center p-2 space-y-5"
                            >
                              <button
                                v-for="category in categories"
                                :key="category"
                                @click="handleCategoryUpdate(anime.id, category)"
                                class="w-full p-2 items-center justify-around cursor-pointer md:text-sm text-[10px] flex rounded-3xl border border-gray-500 bg-gray-400/20 hover:bg-gray-400/40"
                              >
                                {{ category }}
                              </button>
                            </div>
                          </div></Transition
                        >
                      </div></Transition
                    >
                  </div>
                </div>
              </div>
            </div>
          </div></Transition
        >
        <!-- Currently watching section -->

        <Transition name="fade-slide" appear
          ><div v-if="watchingList.length > 0" class="mt-8">
            <h2 class="font-bold text-2xl md:text-4xl">Currently watching</h2>
            <div class="flex items-center justify-center">
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-2 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in watchingList"
                  :key="index"
                  class="p-2 cards rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102 relative"
                >
                  <EllipsisIcon
                    class="p-1 cursor-pointer mt-2 rounded-full hover:bg-black/20 absolute bottom-2 right-0 md:mx-1"
                    @click="toggleMenu(anime.id)"
                  />
                  <div class="flex flex-col h-full justify-evenly space-y-2">
                    <!-- image source -->
                    <img
                      :src="anime.image_url"
                      :alt="anime.title_english || 'Anime poster'"
                      class="max-h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full my-2 pr-3 md:text-base text-[10px]">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || anime.title || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <Transition name="ellipsis"
                      ><div
                        class="background inset-0 flex items-center flex-col backdrop-blur-xl justify-center text-gray-300 absolute top-0 left-0 p-2 rounded-3xl"
                        v-if="open_menu_id === anime.id"
                        @click.self="closeMenu"
                      >
                        <button
                          class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/30 bg-black/50 mb-3"
                          @click="removeFromWatchlist(anime.id)"
                        >
                          Remove
                        </button>

                        <button
                          class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl bg-black/50"
                          @click="removeFromWatchlist(anime.id)"
                        >
                          Remove
                        </button>
                        <button
                          class="w-full md:p-3 p-1 flex items-center justify-evenly md:text-sm text-xs cursor-pointer rounded-3xl hover:bg-black/30 mt-3 bg-black/50"
                          @click="showUpdateModal(anime.id)"
                        >
                          Update category
                        </button>
                        <Transition name="category-dropdown"
                          ><div
                            class="background absolute inset-0 z-50 w-full text-white flex flex-col items-center justify-center space-y-4 rounded-3xl"
                            v-if="select_edit_id === anime.id"
                            @click.self="closeMenu"
                          >
                            <div
                              class="backdrop-blur-xl w-full rounded-3xl flex flex-col items-center justify-center p-2 space-y-5"
                            >
                              <button
                                v-for="category in categories"
                                :key="category"
                                @click="handleCategoryUpdate(anime.id, category)"
                                class="w-full p-2 items-center justify-around cursor-pointer md:text-sm text-[10px] flex rounded-3xl border border-gray-500 bg-gray-400/20 hover:bg-gray-400/40"
                              >
                                {{ category }}
                              </button>
                            </div>
                          </div></Transition
                        >
                      </div></Transition
                    >
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
              <div class="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-2 md:w-[80%] w-full">
                <div
                  v-for="(anime, index) in interestedInList"
                  :key="index"
                  class="p-2 cards rounded-2xl shadow-2xl md:p-3 transition-transform duration-500 ease-in-out transform md:hover:scale-102 relative"
                >
                  <EllipsisIcon
                    class="p-1 cursor-pointer mt-2 rounded-full hover:bg-black/20 absolute bottom-2 right-0 md:mx-1"
                    @click="toggleMenu(anime.id)"
                  />
                  <div class="flex flex-col h-full justify-evenly space-y-2">
                    <!-- image source -->
                    <img
                      :src="anime.image_url"
                      :alt="anime.title_english || 'Anime poster'"
                      class="max-h-full md:aspect-[3/3] aspect-[2/3] w-full object-cover rounded-lg"
                    />
                    <p class="w-full my-2 pr-3 md:text-base text-[10px]">
                      {{
                        anime.title_english && anime.title_english.length > 30
                          ? anime.title_english.slice(0, 30) + '...'
                          : anime.title_english || anime.title || 'No title available'
                      }}
                    </p>
                    <!-- buttons -->
                    <Transition name="ellipsis"
                      ><div
                        class="background inset-0 flex items-center flex-col backdrop-blur-xl justify-center text-gray-300 absolute top-0 left-0 p-2 rounded-3xl"
                        v-if="open_menu_id === anime.id"
                        @click.self="closeMenu"
                      >
                        <button
                          class="w-full p-3 hidden md:flex items-center justify-evenly text-sm cursor-pointer rounded-3xl hover:bg-black/30 bg-black/50 mb-3"
                          @click="removeFromWatchlist(anime.id)"
                        >
                          Remove
                        </button>

                        <button
                          class="w-full p-2 items-center justify-around text-xs cursor-pointer flex md:hidden rounded-3xl bg-black/50"
                          @click="removeFromWatchlist(anime.id)"
                        >
                          Remove
                        </button>
                        <button
                          class="w-full md:p-3 p-1 flex items-center justify-evenly md:text-sm text-xs cursor-pointer rounded-3xl hover:bg-black/30 mt-3 bg-black/50"
                          @click="showUpdateModal(anime.id)"
                        >
                          Update category
                        </button>
                        <Transition name="category-dropdown"
                          ><div
                            class="background absolute inset-0 z-50 w-full text-white flex flex-col items-center justify-center space-y-4 rounded-3xl"
                            v-if="select_edit_id === anime.id"
                            @click.self="closeMenu"
                          >
                            <div
                              class="backdrop-blur-xl w-full rounded-3xl flex flex-col items-center justify-center p-2 space-y-5"
                            >
                              <button
                                v-for="category in categories"
                                :key="category"
                                @click="handleCategoryUpdate(anime.id, category)"
                                class="w-full p-2 items-center justify-around cursor-pointer md:text-sm text-[10px] flex rounded-3xl border border-gray-500 bg-gray-400/20 hover:bg-gray-400/40"
                              >
                                {{ category }}
                              </button>
                            </div>
                          </div></Transition
                        >
                      </div></Transition
                    >
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
}
.cards {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
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

.category-dropdown-enter-from,
.category-dropdown-enter-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.category-dropdown-enter-active,
.category-dropdown-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}
.ellipsis-enter-from,
.ellipsis-enter-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.ellipsis-enter-active,
.ellipsis-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}
</style>
