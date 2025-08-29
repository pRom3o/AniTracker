<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const animeDetails = ref({})

const fetchAnimeDetails = async () => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${route.params.id}/full`)
    if (!response.ok) throw new Error()

    const data = await response.json()

    animeDetails.value = data.data
    console.log('anime details: ', animeDetails.value)
  } catch (error) {
    console.log('error: ', error.message)
  }
}

onMounted(() => {
  fetchAnimeDetails()
})
</script>

<template>
  <div class="min-h-screen w-full">
    <div class="h-[300px] w-full" v-for="anime in animeDetails" :key="anime.mal_id">
      <p>{{ anime.title_english }}</p>
      <p>{{ anime.title_japanese }}</p>
      <img :src="anime.images.jpg.image_url" alt="" class="h-[200px] w-[200px]" />
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-color: #1a1a1a;
}
</style>
