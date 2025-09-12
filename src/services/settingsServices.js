import { supabase } from '../lib/supabaseClient'
import { ref } from 'vue'
import { profile } from '../composables/useAuth'

export const name = ref('')
export const bio = ref('')

export const update_profile_details = async () => {
  if (!profile.value?.id) return null
  const { data, error } = await supabase
    .from('profiles')
    .update({ name: name.value, bio: bio.value })
    .eq('id', profile.value.id)
    .select()

  if (error) throw error

  if (data && data.length > 0) {
    name.value = data[0].name || ''
    bio.value = data[0].bio || ''
  }
  return data
}
