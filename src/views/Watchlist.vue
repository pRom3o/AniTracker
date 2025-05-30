<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'
import Nav from '@/components/Nav.vue'

const myWatchlist = ref([])

onMounted(() => {
  myWatchlist.value = JSON.parse(localStorage.getItem('watchlist')) || []
})

const addToCurrentlyWatching = (anime) => {
  // create new watchlist or retrieve existing watchlist
  const currentlyWatching = JSON.parse(localStorage.getItem('currentlyWatching')) || []
  // add new anime to watchlist
  currentlyWatching.push(anime)
  // convert array to string for JSON
  localStorage.setItem('currentlyWatching', JSON.stringify(currentlyWatching))
  console.log(currentlyWatching)
}
const addToWatched = (anime) => {
  // create new watchlist or retrieve existing watchlist
  const watched = JSON.parse(localStorage.getItem('watched')) || []
  // add new anime to watchlist
  watched.push(anime)
  // convert array to string for JSON
  localStorage.setItem('watched', JSON.stringify(watched))
  console.log(watched)
}
const addToInterested = (anime) => {
  // create new watchlist or retrieve existing watchlist
  const interestedIn = JSON.parse(localStorage.getItem('interestedIn')) || []
  // add new anime to watchlist
  interestedIn.push(anime)
  // convert array to string for JSON
  localStorage.setItem('interestedIn', JSON.stringify(interestedIn))
  console.log(interestedIn)
}

const removeFromWatchlist = (anime) => {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
  const updatedList = watchlist.filter((item) => item !== anime)
  localStorage.setItem('watchlist', JSON.stringify(updatedList))
}
</script>

<template>
  <div class="h-screen w-full bg-[#1e1e1e] text-center text-gray-200">
    <Nav class="pb-2" />
    <div class="h-full w-full p-6 flex items-center justify-center" v-if="myWatchlist.length == 0">
      <h1 class="md:text-3xl"><i>Nothing in your watchlist...</i></h1>
    </div>
    <div class="h-full w-full p-6 border" v-else>
      <div class="flex flex-col space-y-5">
        <div v-if="watched.length > 0">
          <h2>Watched</h2>
          <div class="grid grid-cols-4 gap-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
