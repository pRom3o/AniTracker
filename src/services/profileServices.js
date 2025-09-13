import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'

import { watchlist } from './watchlistServices'
import { profile } from '../composables/useAuth'
import { showToast } from './toastServices'

export const editAvatar = ref(false)

export const watchlistStats = computed(() => {
  const watched = (watchlist.value || []).filter((item) => item.status === 'Watched').length
  const watching = (watchlist.value || []).filter((item) => item.status === 'Watching').length
  const interested = (watchlist.value || []).filter(
    (item) => item.status === 'Interested in',
  ).length

  return {
    watched,
    watching,
    interested,
    total: watched + watching + interested,
  }
})

export const editAvatarToggle = () => {
  editAvatar.value = !editAvatar.value
}

export const uploadAvatar = async (file, id) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `profiles/${id}.${fileExt}`
  const filePath = fileName

  // delete old file first (optional)
  await supabase.storage.from('avatars').remove([filePath])

  // Upload the file
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { contentType: file.type, upsert: true })

  if (uploadError) {
    alert(`Upload error : ${uploadError.message}`)
    return null
  }

  // Create a signed URL valid for 1 year (31,536,000 seconds)
  const { data, error: signedUrlError } = await supabase.storage
    .from('avatars')
    .createSignedUrl(filePath, 60 * 60 * 24 * 365)

  if (signedUrlError) {
    return null
  }

  return data.signedUrl
}

export const selectedFile = ref(null)
export const previewUrl = ref('')

export const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file) // preview before upload
}

export const uploading = ref(false)
export const uploadAvatarNow = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first')
    return
  }
  if (!profile) {
    alert('No logged-in profile found')
    return
  }

  uploading.value = true
  try {
    const signedUrl = await uploadAvatar(selectedFile.value, profile.value.id)
    if (signedUrl) {
      previewUrl.value = signedUrl
      alert('Avatar uploaded successfully!')
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: signedUrl })
        .eq('id', profile.value.id)
      if (error) {
        alert(`error updating avatar:  ${error.message}`)
      } else {
        profile.value.avatar_url = signedUrl
      }
    }
  } catch (error) {
    alert(`error uploading, try again: ${error.message}`)
  } finally {
    uploading.value = false
  }
}

export async function getWatchlistItems(user_Id) {
  const { data, error } = await supabase.from('anitracker_db').select('*').eq('user_id', user_Id)

  if (error) throw error

  const watched = data.filter((item) => item.status === 'Watched')
  const watching = data.filter((item) => item.status === 'Watching')
  const interested = data.filter((item) => item.status === 'Interested in')

  return { watched: watched, watching: watching, interested: interested }
}

export const deleteAvatar = async (id) => {
  try {
    // File path (assuming you're saving avatars under `profiles/{id}.ext`)
    const { data: profileData, error: fetchError } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError
    if (!profileData?.avatar_url) return

    // Extract file path from the URL
    const filePath = profileData.avatar_url.split('/avatars/')[1]

    // Remove from storage
    const { error: storageError } = await supabase.storage.from('avatars').remove([filePath])

    if (storageError) throw storageError

    // Remove avatar_url from profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', id)

    if (updateError) throw updateError

    return true
  } catch (err) {
    showToast(`Error deleting avatar, ${err.message}`, 'error')
    return false
  }
}
