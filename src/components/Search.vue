<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

const searchbar = ref(true)

const anisearch = () => {
  searchbar.value = !searchbar.value
}

const animename = ref('')

// Create a reactive variable to hold the fetched anime data
const animeresult = ref([])

// function to fetch  data from API
async function fetchanime() {
  // fetch anime info from jinka API
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animename.value}`)

    // to check if request was successful
    if (!response.ok) {
      throw new Error('Unsuccessful, Try again')
    }
    // convert response to json format and store
    const data = await response.json()
    // store data in ref array
    animeresult.value = data.data
    // log to console to check value
    console.log(animeresult.value)
  } catch (error) {
    // Handle any errors if the request fails
    console.error('Error fetching anime:', error)
  }
}
</script>

<template>
  <div class="w-full h-full flex justify-center px-4" v-show="searchbar">
    <div
      class="md:mt-40 mt-30 mb-20 md:w-[30%] md:h-[50%] h-[70%] bg-[#181818] rounded-4xl flex flex-col items-center justify-between p-6"
    >
      <div class="flex w-full space-x-2 py-4 mb-4 h-[15%] items-center">
        <p
          class="cursor-pointer p-3 rounded-full hover:bg-[#303030] hover:border hover:border-[#333333]"
          @click="anisearch"
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
        </p>
        <div class="h-full w-full flex items-center py-6 px-3 border rounded-full">
          <input
            type="text"
            placeholder="Search animes..."
            v-model="animename"
            @keyup.enter="fetchanime()"
            class="w-full p-2 rounded-full outline-0 focus:outline-0"
          />
          <p
            class="p-2 cursor-pointer rounded-full hover:bg-[#303030] hover:backdrop-blur-lg"
            @click="fetchanime()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
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
        </div>
      </div>
      <div
        class="h-[85%] flex flex-col items-center justify-center text-gray-400"
        v-if="animename == 0"
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
        <p class="">No results found for ""</p>
      </div>
      <div
        class="h-[85%] w-full space-y-3 flex flex-col items-center text-gray-400 overflow-y-auto scroll-hidden"
        v-else
      >
        <div
          class="w-full max-h-[35%] p-3 flex items-center md:space-x-0 space-x-3 text-white border-b border-[#333333]"
          v-for="anime in animeresult"
          :key="anime.mal_id"
        >
          <div class="w-[20%] h-full">
            <img :src="anime.images.jpg.image_url" :alt="anime.title[0]" class="h-full" />
          </div>
          <div
            class="w-[70%] max-h-full flex flex-col items-start text-start space-y-1 overflow-y-auto scroll-hidden"
          >
            <h2 class="font-bold">{{ anime.title_english }}</h2>
            <p class="text-xs">Episodes - {{ anime.episodes }}</p>
            <p class="text-xs flex items-center">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  padding-left: 2rem;
}

.scroll-hidden::-webkit-scrollbar {
  display: none;
}
</style>
