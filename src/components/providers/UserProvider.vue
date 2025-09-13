<script setup>
import { ref, onMounted, provide, reactive } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'
import { getWatchlistItems } from '../../services/profileServices.js'
import { useRouter } from 'vue-router'

const user = ref(null)
const loading = ref(true)
const userDetails = reactive({
  email: '',
  name: '',
  bio: '',
  total_anime: 0,
})
const watchlist = reactive({
  watched: 0,
  watching: 0,
  interested: 0,
})
const router = useRouter()

const logout = () => {
  supabase.auth.signOut()
  router.push('/auth')
}

onMounted(() => {
  const { data } = supabase.auth.getSession()
  if (data && data.session) {
    const list = getWatchlistItems(data.session.user.id)

    user.value = data.session.user
    userDetails.email = data.session.user.email
    userDetails.name = data.session.user.name
    userDetails.bio = data.session.user.bio
    userDetails.total_anime = data.session.user.total_anime
    watchlist.watched = list.watched
    watchlist.watching = list.watching
    watchlist.interested = list.interested
  } else {
    user.value = data
  }
  loading.value = false

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
})

provide('auth', { user, loading, userDetails, watchlist, logout })
</script>

<template>
  <slot />
</template>
