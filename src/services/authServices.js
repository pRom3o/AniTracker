import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { show_toast } from './toastServices'

export const user_email = ref('') // store user email
export const user_password = ref('') // store password

export const signInUser = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { error }
}

// sign up function
export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/profile`,
    },
  })

  if (error) throw error

  return data
}

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
    console.log('Logged-in user:', user)
    return user
  } else if (error) {
    console.error('Error getting user:', error.message)
    show_toast('Login to access this page', 'failed')
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Logout error:', error.message)
    return false
  }
  return true
}

export async function initAuth() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.log('Error fetching session', error.message)
    return
  }
  if (data.session) {
    console.log('Active session: ', data.session)
  }
  return data
}
