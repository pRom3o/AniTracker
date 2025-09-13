import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { user_email } from './authServices'
import { profile } from '../composables/useAuth'

export const watchlist = ref([]) // watchlist
export const isOpen = ref(false) // ref to track category modal state
export const isLoading = ref(false) // ref to track loading state
export const searchbar = ref(false) // ref to track search modal state
export const is_data_fetched = ref(false) // to check is data is fetched from watchist

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
export const handleCategoryModal = () => {
  isOpen.value = !isOpen.value
}

// toggle search modal
export const animeSearch = () => {
  searchbar.value = !searchbar.value
}

// to store anime name
export const animeName = ref('')

// categories array
export const status = ['Watched', 'Watching', 'Interested in']

// Fetch existing watchlist items
export const fetchSupabaseData = async () => {
  is_data_fetched.value = false // show skeleton at the start

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    is_data_fetched.value = true // stop skeleton, but empty data
    return
  }

  const { data, error } = await supabase.from('anitracker_db').select('*').eq('user_id', user.id)

  if (error) {
    return
  } else {
    watchlist.value = data || []
  }

  is_data_fetched.value = true // hide skeleton once finished
}

export const watched = computed(() => watchlist.value.filter((item) => item.status === 'Watched'))
export const watching = computed(() => watchlist.value.filter((item) => item.status === 'Watching'))
export const interested = computed(() =>
  watchlist.value.filter((item) => item.status === 'Interested in'),
)

// store category/status
export const selectedStatus = ref('')

// store selected anime from search list
export const selectedAnime = ref({})

// trigger category modal and save selected anime
export const addAnime = (anime) => {
  handleCategoryModal()
  selectedAnime.value = anime
}

// Async function to insert to supabase db
export const addToWatchlist = async () => {
  handleCategoryModal()
  const { error } = await supabase
    .from('anitracker_db')
    .insert([
      {
        title: selectedAnime.value.title_english || selectedAnime.value.title,
        status: selectedStatus.value,
        image_url: selectedAnime.value.images.jpg.image_url,
        rating: selectedAnime.value.score,
        episodes: selectedAnime.value.episodes,
        user_email: user_email.value,
        user_id: profile.value.id,
      },
    ])
    .select('*')
  if (error) {
    showToast('Insert Error', 'failed')
  } else {
    showToast('Anime added successfully!', 'success')
    fetchSupabaseData()
    selectedStatus.value = ''
    selectedAnime.value = {}
  }
}

// Async function to delete from supabase db
export const removeFromWatchlist = async (id) => {
  const { data, error } = await supabase.from('anitracker_db').delete().eq('id', id).select('*')
  watchlist.value = watchlist.value.filter((items) => items.id !== id)
  if (error) {
    showToast(`delete error, ${data.name}`, 'error')
  } else {
    showToast(`Deleted ${data.name}`, 'error')

    fetchSupabaseData() // refresh list
  }
}

// Async function to update category in supabase db
export const updatestatus = async (id, status) => {
  const { error } = await supabase
    .from('anitracker_db')
    .update({ status: status })
    .eq('id', id)
    .select('*')

  if (error) {
    showToast(`delete error, ${error.message}`, 'error')
  } else {
    showToast('Status updated successfully!', 'success')

    fetchSupabaseData() // refresh list
  }
}

export const open_menu_id = ref(null) // track anime id whose ellipson was clicked
export const select_edit_id = ref(null) // track anime id whose ellipson was clicked

// ellipson svg to handle remove/update modal
export const toggleMenu = (anime_id) => {
  if (open_menu_id.value === anime_id) {
    open_menu_id.value = null
  } else {
    open_menu_id.value = anime_id
  }
}

// shwow update modal
export const showUpdateModal = (anime_id) => {
  select_edit_id.value = select_edit_id.value === anime_id ? null : anime_id
}

// close update/remove modal
export const closeMenu = () => {
  open_menu_id.value = null
  select_edit_id.value = null
}

// handle update category
export const handlestatusUpdate = (id, status) => {
  closeMenu()
  updatestatus(id, status)
}
