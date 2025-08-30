<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchAnimeDetails, fetchAniListBanner, animeDetails } from '../services/detailsServices'

const route = useRoute()
const banner = ref('')

const summary = ref(false)
const isShown = ref(false)

const isSummary = () => {
  summary.value = !summary.value
  isShown.value = !isShown.value
}

onMounted(() => {
  fetchAnimeDetails(route.params.id)
  fetchAniListBanner(route.params.id)
})

onMounted(async () => {
  banner.value = await fetchAniListBanner(Number(route.params.id))
})
</script>

<template>
  <div class="w-full min-h-screen bg-black/90 text-[#EEEEEE]">
    <div class="flex flex-col justify-center">
      <div class="md:h-[320px] h-[270px] w-full relative">
        <div class="h-full w-full bg-black/50 inset-0 absolute"></div>
        <img :src="banner" alt="anime poster" class="h-full w-full" />
        <div
          class="absolute lg:bottom-[30px] lg:left-[30%] md:left-[30%] md:bottom-[30px] hidden md:block"
        >
          <p class="text-2xl">{{ animeDetails.title_english }}</p>
          <p>{{ animeDetails.title_japanese }}</p>
        </div>
      </div>
      <div class="w-full min-h-[300px] flex justify-center">
        <div class="relative w-[35%] md:flex items-center justify-center hidden">
          <img
            :src="animeDetails.poster"
            alt="anime poster"
            class="md:h-[300px] md:w-[200px] h-[200px] w-[150px] absolute md:left-0 lg:left-[27%] md:-top-[70px] hidden md:inline-block rounded-lg"
          />
        </div>
        <div class="flex h-full md:w-[65%] w-full items-center md:justify-start justify-center">
          <button
            class="px-3 py-5 min-w-60 text-center text-lg leading-8"
            @click="isSummary"
            :class="isShown == false ? 'border-b border-white' : 'border-0'"
          >
            Summary
          </button>
          <button
            class="px-3 py-5 min-w-60 text-center text-lg leading-8"
            @click="isSummary"
            :class="isShown == true ? 'border-b border-white' : 'border-0'"
          >
            Summary
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
