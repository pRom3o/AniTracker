import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export const user_email = ref('') // store user email
export const user_password = ref('') // store password

export const current_auth_view = ref('login') // set current auth view to login page

// switch authView from signup to login and vice versa
export const switchAuthView = () => {
  if (current_auth_view.value === 'signup') {
    current_auth_view.value = 'login'
  } else {
    current_auth_view.value = 'signup'
  }
}

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

export async function getUser(user_id) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUserById(user_id)

  if (error) {
    throw error
  }

  return user
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
}
