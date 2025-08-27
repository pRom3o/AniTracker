<script setup>
import Nav from '@/components/Nav.vue'
import { onMounted, ref } from 'vue'
import nextBtn from '../components/buttons/nextBtn.vue'
import prevBtn from '../components/buttons/prevBtn.vue'

const topAnimes = ref([])
const queryType = 'upcoming'

const getTopAnime = async () => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?q=${queryType}}`)

    if (!response.ok) {
      throw new Error('Unsuccessful fetch')
    }
    const data = await response.json()
    topAnimes.value = data.data
    console.log('Fetched: ', topAnimes.value)
  } catch (error) {
    console.log('error: ', error.message)
  }
}

onMounted(() => {
  getTopAnime()
})
</script>

<template>
  <div class="h-screen flex-1 w-full text-center text-white/80 body overflow-auto">
    <Nav />
    <main class="flex flex-col w-full px-10 md:pt-34 pt-30 pb-20 md:pb-14">
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <!-- Recommendations card -->
          <div
            class="md:w-[300px] w-full px-6 md:py-20 py-10 transition-transform duration-500 ease-in-out transform hover:-translate-y-3 cards rounded-3xl"
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
            class="md:w-[300px] w-full px-6 md:py-20 py-10 transition-transform duration-500 ease-in-out transform hover:-translate-y-3 cards rounded-3xl"
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
            class="md:w-[300px] w-full px-6 md:py-20 py-10 transition-transform duration-500 ease-in-out transform hover:-translate-y-3 cards rounded-3xl"
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
      <section class="w-full flex items-center justify-center p-3 mt-12">
        <div class="flex items-center justify-evenly w-full border min-h-40">
          <prevBtn />
          <div class="h-full w-full flex items-center justify-center p-3">
            <div class="lg:w-[1200px] w-full grid grid-cols-3 gap-3">
              <div class="min-h-40 cards"></div>
              <div class="min-h-40 cards"></div>
              <div class="min-h-40 cards"></div>
            </div>
          </div>
          <nextBtn />
        </div>
      </section>
    </main>
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
</style>
