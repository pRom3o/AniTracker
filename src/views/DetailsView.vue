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
        <div class="w-full">
          <div
            class="absolute lg:bottom-[30px] lg:left-[25%] md:left-[30%] md:bottom-[30px] hidden md:block"
          >
            <p class="text-2xl">{{ animeDetails.title_english }}</p>
            <p>{{ animeDetails.title }}</p>
          </div>
        </div>
      </div>
      <div class="w-full min-h-[300px] flex justify-center">
        <div class="relative w-[25%] md:flex items-center justify-center hidden">
          <img
            :src="animeDetails.poster"
            alt="anime poster"
            class="md:h-[300px] md:w-[200px] h-[200px] w-[150px] absolute md:left-0 lg:left-[27%] md:-top-[70px] hidden md:inline-block rounded-lg"
          />
        </div>
        <div class="h-full md:w-[75%] w-full flex flex-col ml-4">
          <ul class="flex w-full">
            <li
              class="px-3 py-5 min-w-60 text-center text-lg leading-8"
              @click="isSummary"
              :class="isShown == false ? 'border-b border-white' : 'border-0'"
            >
              Summary
            </li>
            <li
              class="px-3 py-5 min-w-60 text-center text-lg leading-8"
              @click="isSummary"
              :class="isShown == true ? 'border-b border-white' : 'border-0'"
            >
              Recommendations
            </li>
          </ul>
          <div class="md:flex w-full p-3 space-x-10" v-show="isShown == false">
            <div class="md:w-[60%] leading-7">
              <p class="w-full">{{ animeDetails.synopsis }}</p>
            </div>
            <div class="flex flex-col md:w-[20%]">
              <hr class="mb-5 text-white/10" />
              <p id="details">Japanese: {{ animeDetails.title_japanese }}</p>
              <p id="details">Type: {{ animeDetails.type }}</p>
              <p id="details">Episodes: {{ animeDetails.episodes }}</p>
              <p id="details">Status: {{ animeDetails.status }}</p>
              <p id="details">Duration {{ animeDetails.duration }}</p>
              <p id="details">Aired: {{ animeDetails.aired }}</p>
              <p id="details">Season: {{ animeDetails.season }}</p>
              <p id="details">studio: {{ animeDetails.studio.name }}</p>
              <p id="details">Themes: {{ animeDetails.themes[0] }}</p>
              <p id="details">Demogaphic: {{ animeDetails.demographics[0] }}</p>
              <hr class="mt-5 text-white/10" />
              <ul class="flex items-center">
                <li
                  v-for="(item, index) in animeDetails.genres"
                  :key="item.mal_id"
                  class="py-1 px-4 text-sm mt-3 bg-[#333]"
                >
                  <a :href="animeDetails.genres[index].url" target="_blank">{{
                    animeDetails.genres[index].name
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li:hover {
  cursor: pointer;
}
</style>
