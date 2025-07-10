import { ref } from 'vue'
import { supabase } from './supabaseClient'

export const watchlist = ref([]) // watchlist
export const isOpen = ref(false) // ref to track category modal state
export const isLoading = ref(false) // ref to track loading state
export const searchbar = ref(false) // ref to track search modal state
export const is_data_fetched = ref(false)

// Toast
export const toastMessage = ref('')
export const toastType = ref('success') // 'success' | 'error'

export const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

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
export const categories = ['Watched', 'Watching', 'Interested in']

// Fetch existing watchlist items
export const fetchData = async () => {
  const { data, error } = await supabase.from('anitracker_db').select('*')
  if (error) {
    console.error('Fetch error:', error)
  } else {
    is_data_fetched.value = false
    setTimeout(() => {
      watchlist.value = data
      is_data_fetched.value = true
    }, 500)
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
    showToast('Anime added successfully!', 'success')
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
    showToast('Deleted', 'error')
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
    showToast('category updated successfully!', 'success')
    console.log('Updated:', data)
    fetchData() // refresh list
  }
}

// ellipson svg
export const open_menu_id = ref(null) // track anime id whose ellipson was clicked
export const select_edit_id = ref(null) // track anime id whose ellipson was clicked

export const toggleMenu = (anime_id) => {
  if (open_menu_id.value === anime_id) {
    open_menu_id.value = null
  } else {
    open_menu_id.value = anime_id
  }
}

export const showSelect = (anime_id) => {
  select_edit_id.value = select_edit_id.value === anime_id ? null : anime_id
}

export const closeMenu = () => {
  open_menu_id.value = null
  select_edit_id.value = null
}

export const handleCategoryUpdate = (id, category) => {
  closeMenu()
  updateCategory(id, category)
}
