<script setup>
import { ref } from 'vue'
import Nav from '@/components/Nav.vue'

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
  <div class="h-screen w-full bg-[#1e1e1e] text-center text-gray-50">
    <Nav class="pb-2" />
    <div
      class="w-full h-full bg-cover bg-center"
      style="background-image: url('/images/landscape2.jpg')"
    ></div>
  </div>
</template>
