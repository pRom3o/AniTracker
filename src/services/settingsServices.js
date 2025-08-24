import { supabase } from '../lib/supabaseClient'
import { ref } from 'vue'

export const name = ref('')
export const bio = ref('')

export const get_profile_data = async (userId) => {
  const { data, error } = await supabase.from('profiles').select().eq('id', userId).maybeSingle()

  if (error) {
    console.error('error fetching profile:', error.message)
    return null
  }

  return data
}

export const update_profile_details = async () => {
  // const id = userSession.value?.user?.id
  if (!id) return
  const { data, error } = await supabase
    .from('profiles')
    .update({ name: name.value, bio: bio.value })
    .eq('id', id)
    .select()
  if (data) {
    name.value = data.name || ''
    bio.value = data.bio || ''
  }
  if (error) throw error
  return data
}
