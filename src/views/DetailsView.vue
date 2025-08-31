<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import {
  fetchAnimeDetails,
  fetchAniListBanner,
  animeDetails,
  recommendations,
  recommendationsById,
} from '../services/detailsServices'

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
  recommendationsById(route.params.id)
})

onMounted(async () => {
  banner.value = await fetchAniListBanner(Number(route.params.id))
  console.log('recommendations: ', recommendations.value)
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
              <p id="details" v-for="(studio, index) in animeDetails.studios" :key="index">
                studio: {{ studio }}
              </p>
              <p id="details">Themes: {{ animeDetails.themes.join(', ') || 'none' }}</p>
              <p id="details">Demogaphic: {{ animeDetails.demographics.join(', ') || 'none' }}</p>
              <hr class="mt-5 text-white/10" />
              <ul class="flex items-center space-x-3">
                <li
                  v-for="(item, index) in animeDetails.genres"
                  :key="item.mal_id"
                  class="py-1 px-4 text-sm mt-3 bg-[#333]"
                >
                  <a :href="animeDetails.genres[index].url || 'none'" target="_blank">{{
                    animeDetails.genres[index].name
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
          <section v-show="isShown == true" class="flex justify-center lg:justify-start">
            <div class="mt-4 mb-8">
              <div
                v-if="recommendations.length"
                class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
              >
                <div
                  v-for="rec in recommendations"
                  :key="rec.entry.mal_id"
                  class="flex flex-col items-center justify-center cards w-[130px] p-2"
                >
                  <img
                    :src="rec.entry.images.jpg.image_url"
                    :alt="rec.entry.title"
                    class="rounded-3xl h-[150px]"
                  />
                  <p class="text-sm">
                    {{
                      rec.entry.title && rec.entry.title.length > 30
                        ? rec.entry.title.slice(0, 30) + '...'
                        : rec.entry.title || 'No title'
                    }}
                  </p>
                </div>
              </div>
              <p v-else>No recommendations available.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li:hover {
  cursor: pointer;
}

.cards {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
</style>
