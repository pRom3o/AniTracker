import { ref, reactive } from 'vue'
// import supabase from '../src/state/supabaseClient'

export const watchlist = reactive({ Watched: [], 'Currently watching': [], 'Interested in': [] })
export const isOpen = ref(false)
export const isLoading = ref(false)
export const searchbar = ref(false)

export const anisearch = () => {
  searchbar.value = !searchbar.value
}

export const categories = ['Watched', 'Currently watching', 'Interested in']

const stored = localStorage.getItem('watchlist')
if (stored) {
  const pasrsed = JSON.parse(stored)
  // Assign each category individually to maintain reactivity
  Object.assign(watchlist, pasrsed)
}

const selectedAnime = ref({})

export const addToWatchlist = (anime) => {
  // modal toggle
  isOpen.value = true
  selectedAnime.value = anime
}

export const mode = () => {
  isOpen.value = false
}
export const selectcategory = (category) => {
  const exists = watchlist[category].some(
    (item) => item.title_english === selectedAnime.value.title_english,
    mode(),
  )
  // add new anime to watchlist and avoid duplicates
  if (!exists) {
    watchlist[category].push(selectedAnime.value)
    console.log(selectedAnime.value)
    // convert array to string for JSON
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    // isOpen.value = false
    console.log(category)
    selectedAnime.value = {}
  }
}
export const removeFromWatchlist = (anime, category) => {
  watchlist[category] = watchlist[category].filter((item) => item.mal_id !== anime.mal_id)
  localStorage.setItem('watchlist', JSON.stringify(watchlist))
}
