import { ref } from 'vue'
import { supabase } from './supabaseClient'

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

// sign in function
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  } catch (error) {
    if (error) {
      console.error('Sign in error: ', error.message)
      return error
    }
  }
}

// sign up function
export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    console.error('Signup error: ', error.message)
    return error
  }
  return data
}

// sign out function
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  user_email.value = ''
  user_password.value = ''
  return error
}

export const userSession = ref(null) // store user session

export const isDropdownOpen = ref(false) // track profile/logout dropdown

// toggle dropdown show/hide
export const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
