import { ref, reactive } from 'vue'

export const watchlist = reactive({ Watched: [], 'Currently watching': [], 'Interested in': [] })
export const isOpen = ref(false)

export const categories = ['Watched', 'Currently watching', 'Interested in']

const stored = localStorage.getItem('watchlist')
if (stored) {
  watchlist.value = JSON.parse(stored)
}
const selectedAnime = ref({})

export const addToWatchlist = (anime) => {
  // modal toggle
  isOpen.value = true
  selectedAnime.value = anime
  localStorage.removeItem('watchlist')

  setTimeout(() => {
    isOpen.value = false
    selectedAnime.value = {}
  }, 5000)
}
export const selectcategory = (category) => {
  const exists = watchlist[category].some(
    (item) => item.title_english === selectedAnime.value.title_english,
  )
  // add new anime to watchlist and avoid duplicates
  if (!exists) {
    watchlist[category].push(selectedAnime.value)
    // convert array to string for JSON
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    isOpen.value = false
    console.log(category)
    selectedAnime.value = {}
  }
}
export const removeFromWatchlist = (anime) => {
  watchlist.value = watchlist.value.filter((item) => item.title_english !== anime.title_english)
  localStorage.setItem('watchlist', JSON.stringify(watchlist.value))
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
