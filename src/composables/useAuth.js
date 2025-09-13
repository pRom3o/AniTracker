import { ref, watch } from 'vue'
import { supabase } from '../lib/supabaseClient'

export const authUser = ref(null)
export const profile = ref(null)

export async function initAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  authUser.value = session?.user || null

  supabase.auth.onAuthStateChange((_event, session) => {
    authUser.value = session?.user || null
  })
}

export async function getProfile() {
  if (!authUser.value) return null
  console.log('auth user being used: ', authUser.value?.id)

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.value?.id)
    .maybeSingle()

  if (error) throw error
  console.log('fetched data', data)
  return data
}

// 👀 Watch authUser and refetch profile
watch(authUser, async (newUser) => {
  if (newUser) {
    profile.value = await getProfile()
    console.log('profile from useAuth: ', profile.value)
  } else {
    profile.value = null
  }
})
