import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

import { useRouter } from 'vue-router'
import { showToast } from './toastServices'
const router = useRouter()

export const user_email = ref('') // store user email
export const user_password = ref('') // store password

export const signInUser = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { error }
}

// sign up functions start
export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  return { user: data.user, session: data.session }
}

export const userBio = ref('')
export const userName = ref('')
export const loading = ref(false)

// sign out function
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  user_email.value = ''
  user_password.value = ''
  return error
}

export const isDropdownOpen = ref(false) // track profile/logout dropdown

// toggle dropdown show/hide
export const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

export const logging_out = ref(false)

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (user) {
    showToast(`welcome back ${user_email.value}`, 'success')
    return user
  } else if (error) {
    showToast(`Error getting user: ${error.message}`, 'failed')
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    showToast('Logout error:', 'failed')
    return false
  }

  return true
}

export const handleLogout = async () => {
  const success = await logout()
  if (success) {
    router.push('/auth')
  }
}
