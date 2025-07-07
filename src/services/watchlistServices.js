import { ref } from 'vue'
import supabase from './supabaseClient'

export const watchlist = ref([]) // watchlist
export const isOpen = ref(false) // ref to track category modal state
export const isLoading = ref(false) // ref to track loading state
export const searchbar = ref(false) // ref to track search modal state

// switch category modal state
export const mode = () => {
  isOpen.value = !isOpen.value
}

// toggle search modal
export const anisearch = () => {
  searchbar.value = !searchbar.value
}

// to store anime name
export const animeName = ref('')

// categories array
export const categories = ['Watched', 'Currently watching', 'Interested in']

// Fetch existing watchlist items
export const fetchData = async () => {
  const { data, error } = await supabase.from('anitracker_db').select('*')
  if (error) {
    console.error('Fetch error:', error)
  } else {
    watchlist.value = data
  }
}

// store category/status
export const selectedCategory = ref('')

// store selected anime from search list
export const selectedAnime = ref({})

// trigger category modal and save selected anime
export const add = (anime) => {
  mode()
  selectedAnime.value = anime
}

// Async function to insert to supabase db
export const addToWatchlist = async () => {
  mode()
  const { data, error } = await supabase
    .from('anitracker_db')
    .insert([
      {
        title: selectedAnime.value.title_english || selectedAnime.value.title,
        status: selectedCategory.value,
        image_url: selectedAnime.value.images.jpg.image_url,
        rating: selectedAnime.value.score,
        episodes: selectedAnime.value.episodes,
      },
    ])
    .select('*')
  if (error) {
    console.log('Insert Error', error)
  } else {
    console.log('Inserted', data)
    fetchData()
    selectedCategory.value = ''
    selectedAnime.value = {}
  }
}

// Async function to delete from supabase db
export const removeFromWatchlist = async (id) => {
  const { data, error } = await supabase.from('anitracker_db').delete().eq('id', id).select('*')
  watchlist.value = watchlist.value.filter((items) => items.id !== id)
  if (error) {
    console.error('delete error:', error)
  } else {
    console.log('deleted:', data)
    fetchData() // refresh list
  }
}

// Async function to update category in supabase db
export const updateCategory = async (id, category) => {
  const { data, error } = await supabase
    .from('anitracker_db')
    .update({ status: category })
    .eq('id', id)
    .select('*')

  if (error) {
    console.error('update error:', error)
  } else {
    console.log('Updated:', data)
    fetchData() // refresh list
  }
}
