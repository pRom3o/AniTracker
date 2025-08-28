<script setup>
import Nav from '@/components/Nav.vue'
import { onMounted, ref, computed, onUnmounted } from 'vue'
import nextBtn from '../components/buttons/nextBtn.vue'
import prevBtn from '../components/buttons/prevBtn.vue'

const recommendations = ref([])
const currentPage = ref(1)
const perPage = ref(4)
// const queryType = 'upcoming'

const getRecommendations = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/recommendations/anime')
    if (!response.ok) throw new Error('Unsuccessful fetch')

    const data = await response.json()
    // flatten entries into a single array
    recommendations.value = data.data.flatMap((rec) => rec.entry)
    console.log(recommendations.value)
  } catch (error) {
    console.error('Error fetching recommendations:', error.message)
  }
}

const isSmallScreen = ref(false)
// const isSmallmid = ref(false)

const paginatedRecommendations = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return recommendations.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => Math.ceil(recommendations.value.length / perPage.value))

const updatePerPage = () => {
  if (window.innerWidth < 740) {
    // mobile
    perPage.value = 1
    isSmallScreen.value = true
  } else {
    perPage.value = 4
    isSmallScreen.value = false
  }
}

onMounted(() => {
  updatePerPage()
  window.addEventListener('resize', updatePerPage)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePerPage)
})

onMounted(() => {
  getRecommendations()
  console.log('paginated: ', paginatedRecommendations.value)
})
</script>

<template>
  <div class="h-screen flex-1 w-full text-center text-white/80 body overflow-auto">
    <Nav />
    <main class="flex flex-col w-full px-10 md:pt-34 pt-30 pb-10 md:pb-14">
      <header class="text-center flex flex-col items-center">
        <h1
          class="md:text-6xl text-[2rem] w-full font-extrabold md:mb-6 mb-4 md:w-[50%] flex items-center text-center md:px-10"
        >
          Your Anime Journey Starts, Here.
        </h1>
        <p class="md:text-xl text-center font-medium mb-4 md:w-[50%]">
          Discover, track, and organize your favorite anime series with our intuitive platform
          designed for true anime enthusiasts🎨✨📊.
        </p>
      </header>

      <section class="w-full flex items-center justify-center">
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <!-- Recommendations card -->
          <div
            class="md:w-[500px] lg:w-[300px] w-full px-6 md:py-20 py-10 transition-transform duration-500 ease-in-out transform hover:-translate-y-3 cards rounded-3xl"
          >
            <div class="p-4 flex flex-col items-center space-y-3">
              <div class="flex items-center justify-center">
                <p class="recommendations-icon p-4 text-6xl rounded-3xl">✨</p>
              </div>
              <h2>Smart Recommendations</h2>
              <p>
                Get AI-powered suggestions based on your viewing history, ratings, and preferences.
                Discover your next favorite series effortlessly.
              </p>
            </div>
          </div>

          <!-- Track card -->

          <div
            class="md:w-[500px] lg:w-[300px] w-full px-6 md:py-20 py-10 transition-transform duration-500 ease-in-out transform hover:-translate-y-3 cards rounded-3xl"
          >
            <div class="p-4 flex flex-col items-center space-y-3">
              <div class="flex items-center justify-center">
                <p class="track-icon p-4 text-6xl rounded-3xl">📊</p>
              </div>
              <h2>Track Progress</h2>
              <p>
                Monitor your watching progress, set viewing goals, and see detailed statistics about
                your anime journey with beautiful charts.
              </p>
            </div>
          </div>

          <!-- Customize card -->
          <div
            class="md:w-[500px] lg:w-[300px] w-full px-6 md:py-20 py-10 transition-transform duration-500 ease-in-out transform hover:-translate-y-3 cards rounded-3xl"
          >
            <div class="p-4 flex flex-col items-center space-y-3 mb-10">
              <div class="flex items-center justify-center">
                <p class="customize-icon p-4 text-6xl rounded-3xl">🎨</p>
              </div>
              <h2>Customize Watchlist</h2>
              <p>
                Create personalized lists, add custom tags, and organize your anime collection
                exactly how you want it. Make it uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <section class="w-full flex flex-col items-center justify-center my-12">
      <h3 class="font-bold text-2xl md:text-4xl">Recommendations for our users:</h3>

      <section class="w-full flex items-center justify-center mt-12">
        <div class="flex items-center justify-evenly w-full min-h-60">
          <prevBtn @click="currentPage--" :disabled="currentPage === 1" />
          <div class="h-full w-full flex items-center justify-center">
            <div class="w-full grid gap-3" :class="isSmallScreen ? 'grid-cols-1' : 'grid-cols-4'">
              <TransitionGroup name="fade-slide">
                <div
                  class="min-h-40 cards flex items-center p-2 transition-transform duration-500 ease-in-out transform hover:-translate-y-3"
                  v-for="anime in paginatedRecommendations"
                  :key="anime.mal_id"
                  :class="isSmallScreen ? 'w-full' : ''"
                >
                  <img
                    :src="anime.images.jpg.image_url"
                    alt=""
                    class="h-full w-[50%] rounded-2xl"
                  />
                </div>
              </TransitionGroup>

              <!-- <div class="min-h-40 cards"></div>
            <div class="min-h-40 cards"></div>
            <div class="min-h-40 cards"></div> -->
            </div>
          </div>
          <nextBtn @click="currentPage++" :disabled="currentPage === totalPages" />
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
.body {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #2d1b4e 100%);
}
.cards {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

h1 {
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

h2 {
  font-size: 20px;
}

.customize-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.recommendations-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.track-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
