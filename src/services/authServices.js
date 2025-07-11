import { ref } from 'vue'
import { supabase } from './supabaseClient'

export const user_email = ref('')
export const user_password = ref('')

export const current_auth_view = ref('login')

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

export const userSession = ref(null)

export const isDropdownOpen = ref(false)

export const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
