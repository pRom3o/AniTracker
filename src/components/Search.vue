<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
// Create a reactive variable to hold the fetched anime data
const animeresult = ref([])

// function to fetch  data from API
async function fetchanime() {
  // fetch anime info from jinka API
  try {
    const response = await fetch('https://api.jikan.moe/v4/anime?q=solo%20leveling')

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

fetchanime()
</script>

<template>
  <div class="w-full h-full flex justify-center">
    <div
      class="md:mt-40 mt-30 mb-20 md:w-[40%] md:h-[40%] h-[50%] border border-black rounded-4xl flex flex-col items-center justify-between p-6"
    >
      <div class="md:h-[15%] w-full flex items-center p-3 border rounded-full">
        <p class="p-2">
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
          class="w-full p-2 rounded-full outline-0 focus:outline-0"
        />
      </div>
      <div class="h-[85%] flex flex-col items-center justify-center text-gray-400">
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
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  padding-left: 2rem;
}
</style>
