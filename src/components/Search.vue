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
  <div class="w-full h-full flex justify-center" v-show="searchbar">
    <div
      class="md:mt-40 mt-30 mb-20 md:w-[40%] md:h-[40%] h-[50%] bg-[#1f1f1f] rounded-4xl flex flex-col items-center justify-between p-6"
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
        <div class="h-full w-full flex items-center p-5 border rounded-full">
          <p class="p-2" @click="fetchanime()">
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
          <input
            type="text"
            placeholder="Search animes..."
            v-model="animename"
            @keyup.enter="fetchanime()"
            class="w-full p-2 rounded-full outline-0 focus:outline-0"
          />
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
        class="min-h-[85%] w-full flex flex-col items-center justify-center text-gray-400"
        v-else
      >
        <li v-for="anime in animeresult" :key="anime.mal_id">
          <a>{{ anime.url }}</a>
        </li>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  padding-left: 2rem;
}
</style>
