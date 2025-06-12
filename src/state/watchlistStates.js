import { ref, reactive } from 'vue'

export const watchlist = reactive({ Watched: [], 'Currently watching': [], 'Interested in': [] })
export const isOpen = ref(false)
export const isLoading = ref(false)

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

  setTimeout(() => {
    isOpen.value = false
    selectedAnime.value = {}
  }, 3000)
}
export const selectcategory = (category) => {
  const exists = watchlist[category].some(
    (item) => item.title_english === selectedAnime.value.title_english,
    (isOpen.value = false),
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

// const addToCurrentlyWatching = (anime) => {
//   // create new watchlist or retrieve existing watchlist
//   const currentlyWatching = JSON.parse(localStorage.getItem('currentlyWatching')) || []
//   // add new anime to watchlist
//   currentlyWatching.push(anime)
//   // convert array to string for JSON
//   localStorage.setItem('currentlyWatching', JSON.stringify(currentlyWatching))
//   console.log(currentlyWatching)
// }
// const addToWatched = (anime) => {
//   // create new watchlist or retrieve existing watchlist
//   const watched = JSON.parse(localStorage.getItem('watched')) || []
//   // add new anime to watchlist
//   watched.push(anime)
//   // convert array to string for JSON
//   localStorage.setItem('watched', JSON.stringify(watched))
//   console.log(watched)
// }
// const addToInterested = (anime) => {
//   // create new watchlist or retrieve existing watchlist
//   const interestedIn = JSON.parse(localStorage.getItem('interestedIn')) || []
//   // add new anime to watchlist
//   interestedIn.push(anime)
//   // convert array to string for JSON
//   localStorage.setItem('interestedIn', JSON.stringify(interestedIn))
//   console.log(interestedIn)
// }
