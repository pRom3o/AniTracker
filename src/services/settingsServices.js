import { userSession } from './authServices'
import { supabase } from './supabaseClient'
import { ref } from 'vue'

export const name = ref('')
export const bio = ref('')

export const get_profile_data = async () => {
  const id = userSession.value?.user?.id
  if (!id) return
  const { data, error } = await supabase.from('profiles').select().eq('id', id).single()
  if (error) {
    console.error('error fetching profile: ', error.message)
    return
  }
  if (!data) {
    console.error('no profile found for this user')
    return
  }
  //   const profile = data[0]
  name.value = data.name || ''
  bio.value = data.bio || ''
}

export const update_profile_details = async (name, bio) => {
  const id = userSession.value?.user?.id
  if (!id) return
  const { data, error } = await supabase
    .from('profiles')
    .update({ name: name, bio: bio })
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}
