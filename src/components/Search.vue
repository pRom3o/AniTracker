<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import debounce from 'lodash.debounce'
import { ref } from 'vue'
import {
  addToWatchlist,
  isOpen,
  status,
  searchbar,
  animeSearch,
  handleCategoryModal,
  animeName,
  selectedStatus,
  addAnime,
} from '../services/watchlistServices'

// reactive variable to hold the fetched anime data
const animeResults = ref([])

// variable for loading state
const loading = ref(false)

// function to fetch  data from Jikan API with debounce
const debounced = debounce(async function fetchanime() {
  // loading state
  loading.value = true
  // fetch anime info from jinka API
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName.value}`)
    // to check if request was successful
    if (!response.ok) {
      throw new Error('Unsuccessful, Try again')
    }
    // convert response to json format and store
    const data = await response.json()
    // store data in ref array
    animeResults.value = data.data
  } catch (error) {
    // Handle any errors if the request fails
    console.error('Error fetching anime:', error)
  } finally {
    loading.value = false
  }
}, 300)
</script>

<template>
  <div
    class="w-full h-full flex justify-center md:px-4 backdrop-blur-md bg-black/30 fixed px-4"
    v-show="searchbar"
    @click.self="animeSearch()"
  >
    <div
      class="lg:mt-62 mt-30 md:w-[70%] lg:w-[40%] lg:h-[50%] h-[70%] cards rounded-4xl flex flex-col items-center justify-between p-6 text-gray-300"
    >
      <div class="flex w-full space-x-2 md:py-4 mb-4 md:h-[15%] items-center">
        <button
          class="cursor-pointer p-3 rounded-full hover:bg-white/10 hover:border hover:border-[#333333]"
          @click="animeSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4.808 9.441L6.774 7.47C8.19 6.048 8.744 5.284 9.51 5.554c.957.337.642 2.463.642 3.18c1.486 0 3.032-.131 4.497.144C19.487 9.787 21 13.715 21 18c-1.37-.97-2.737-2.003-4.382-2.452c-2.054-.562-4.348-.294-6.465-.294c0 .718.314 2.844-.642 3.181c-.868.306-1.321-.494-2.737-1.915l-1.966-1.972C3.603 13.338 3 12.733 3 11.995c0-.74.603-1.344 1.808-2.554"
              color="#fff"
            />
          </svg>
        </button>
        <div class="w-full flex items-center md:py-2 px-3 border rounded-full">
          <input
            type="text"
            placeholder="Search animes..."
            v-model="animeName"
            @keyup.enter="fetchanime()"
            @input="debounced"
            class="w-full p-2 rounded-full outline-0 focus:outline-0"
          />
          <button
            class="p-3 cursor-pointer rounded-full md:text-xl hover:bg-white/10 hover:text-white flex items-center justify-center"
            @click="fetchanime()"
          >
            search
            <p class="mx-2 hidden md:flex">
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
        </div>
      </div>
      <div
        class="h-[85%] flex flex-col items-center justify-center text-gray-400"
        v-if="animeName == 0"
      >
        <p class="p-2 opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
        <p class="text-white">No results found for ""</p>
      </div>
      <div
        class="md:h-[85%] h-full w-full space-y-3 flex flex-col items-center text-gray-400 overflow-y-auto scroll-hidden"
        v-else
      >
        <div class="h-full w-full flex items-center justify-center" v-if="loading">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.225s"
                    values="16;0"
                  />
                  <animateTransform
                    attributeName="transform"
                    dur="1.125s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
                <path
                  stroke-dasharray="64"
                  stroke-dashoffset="64"
                  stroke-opacity="0.3"
                  d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.9s"
                    values="64;0"
                  />
                </path>
              </g>
            </svg>
          </p>
        </div>
        <div
          class="w-full max-h-[35%] py-2 flex items-center justify-evenly md:space-x-0 space-x-3 text-white border-b border-[#333333]"
          v-for="anime in animeResults"
          :key="anime.mal_id"
          v-else
        >
          <div class="w-[20%] h-full">
            <img :src="anime.images.jpg.image_url" alt="#" class="md:h-full aspect-3/3" />
          </div>
          <div
            class="w-[70%] max-h-full flex flex-col items-start text-start space-y-1 overflow-y-auto scroll-hidden"
          >
            <h2 class="font-bold text-sm md:text-base">
              {{
                anime.title_english && anime.title_english.length > 30
                  ? anime.title_english.slice(0, 30) + '...'
                  : anime.title_english || 'No title available'
              }}
            </h2>
            <p class="text-xs">Episodes - {{ anime.episodes }}</p>
            <div class="text-xs w-full flex items-center justify-between">
              <p class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  class="mr-1"
                >
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"
                    color="#fff"
                  />
                </svg>
                {{ anime.score }} - {{ anime.type }} - {{ anime.year }} - {{ anime.status }}
              </p>
              <button class="hidden md:flex items-center cursor-pointer" @click="addAnime(anime)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="m11 19.654l-1.156-1.042q-2.28-2.087-3.799-3.593T3.632 12.34q-.896-1.173-1.264-2.146T2 8.225q0-1.908 1.296-3.201T6.5 3.731q1.32 0 2.475.675T11 6.369q.87-1.288 2.025-1.963T15.5 3.73q1.737 0 2.948 1.08q1.212 1.08 1.48 2.689H18.9q-.238-1.23-1.19-2t-2.21-.77q-1.217 0-2.21.688T11.403 7.5h-.804q-.91-1.413-1.907-2.091T6.5 4.73q-1.463 0-2.482.997Q3 6.725 3 8.225q0 .844.35 1.714t1.25 2t2.45 2.658T11 18.3q.766-.69 1.506-1.364q.74-.672 1.323-1.23l.11.11l.246.247l.248.247l.11.11q-.59.557-1.314 1.208t-1.471 1.341zm6.73-3.154v-3h-3v-1h3v-3h1v3h3v1h-3v3z"
                  />
                </svg>
                Add to watchlist
              </button>
              <button
                class="md:hidden flex items-center cursor-pointer mx-2"
                @click="addAnime(anime)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="m11 19.654l-1.156-1.042q-2.28-2.087-3.799-3.593T3.632 12.34q-.896-1.173-1.264-2.146T2 8.225q0-1.908 1.296-3.201T6.5 3.731q1.32 0 2.475.675T11 6.369q.87-1.288 2.025-1.963T15.5 3.73q1.737 0 2.948 1.08q1.212 1.08 1.48 2.689H18.9q-.238-1.23-1.19-2t-2.21-.77q-1.217 0-2.21.688T11.403 7.5h-.804q-.91-1.413-1.907-2.091T6.5 4.73q-1.463 0-2.482.997Q3 6.725 3 8.225q0 .844.35 1.714t1.25 2t2.45 2.658T11 18.3q.766-.69 1.506-1.364q.74-.672 1.323-1.23l.11.11l.246.247l.248.247l.11.11q-.59.557-1.314 1.208t-1.471 1.341zm6.73-3.154v-3h-3v-1h3v-3h1v3h3v1h-3v3z"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Transition name="fade-slide" appear
      ><div
        v-if="isOpen"
        class="flex items-center justify-center fixed inset-0 z-60 bg-black/20"
        @click="handleCategoryModal()"
      >
        <div class="backdrop-blur-3xl h-full w-full flex items-center justify-center bg-black/10">
          <div class="h-full w-full flex items-center justify-center z-50 m-4">
            <div
              class="w-96 min-h-22 cards-1 backdrop-blur-3xl flex flex-col items-center justify-center p-4 rounded-2xl"
              @click.stop
            >
              <div class="flex items-center text-white">
                <label for="status" class="text-lg">Select category: </label>
                <select
                  name="category"
                  id="category"
                  v-model="selectedStatus"
                  class="text-sm outline-none text-center"
                  @change="addToWatchlist()"
                >
                  <option
                    :value="category"
                    v-for="category in status"
                    :key="category"
                    class="text-black text-sm"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div></Transition
    >
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.background {
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
.btn {
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cards-1 {
  background: linear-gradient(-45deg, #6f6f8e, #455ea3, #4e81c0, #5a5a8f);
  border: 2px solid rgba(255, 255, 255, 0.1);
}
.cards {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::placeholder {
  padding-left: 2rem;
}

.scroll-hidden::-webkit-scrollbar {
  display: none;
}
</style>
