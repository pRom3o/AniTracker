import { ref } from 'vue'

export const watchlist = ref([])

const stored = localStorage.getItem('watchlist')
if (stored) {
  watchlist.value = JSON.parse(stored)
}

export const addToWatchlist = (anime) => {
  // add new anime to watchlist and avoid duplicates
  const exists = watchlist.value.some((item) => item.title_english === anime.title_english)
  if (!exists) {
    watchlist.value.push(anime)
    // convert array to string for JSON
    localStorage.setItem('watchlist', JSON.stringify(watchlist.value))
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
