import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { getUser } from './authServices'
import { watchlist } from './watchlistServices'

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
  console.log(editAvatar.value)
}
export const uploadAvatar = async (file, userId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}.${fileExt}`
  const filePath = `avatars/${fileName}`

  // delete old file first (optional)
  await supabase.storage.from('avatars').remove([filePath])

  // Upload the file
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { contentType: file.type })

  if (uploadError) {
    console.error('Upload error:', uploadError.message)
    return null
  }

  // Get public URL
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  if (!data || !data.publicUrl) {
    console.error('Public Url not found', data)
    return null
  }

  return data.publicUrl
}

export const selectedFile = ref(null)
export const previewUrl = ref('')

export const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file) // preview before upload
}

export const uploadAvatarNow = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first')
    return
  }
  const user = await getUser()
  if (!user) {
    alert('No logged-in user found')
    return
  }

  const publicUrl = await uploadAvatar(selectedFile.value, user.id)
  if (publicUrl) {
    previewUrl.value = publicUrl
    alert('Avatar uploaded successfully!')
  } else {
    alert('Something went wrong fetching avatar URL')
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
