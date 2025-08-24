import { ref } from 'vue'
// import { userSession } from './authServices'
export const edit_avatar = ref(false)
import { supabase } from './supabaseClient'

export const edit_avatar_modal = () => {
  edit_avatar.value = !edit_avatar.value
  console.log(edit_avatar.value)
}

export const uploadAvatar = async (file, userId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}.${fileExt}`
  const filePath = `avatars/${fileName}`

  // Upload the file
  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
    upsert: true,
    contentType: file.type,
  })

  if (uploadError) {
    console.error('Upload error:', uploadError.message)
    return null
  }

  // Get public URL
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  if (!data || !data.publicUrl) {
    console.error('Publc Url not found', data)
    return null
  }
  return data.publicUrl
}

export const selectedFile = ref(null)
export const previewUrl = ref(null)

export const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

export const uploadAvatarNow = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first')
    return
  }

  // const userId = userSession.value?.user?.id
  const file = selectedFile.value

  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
    upsert: true,
    contentType: file.type,
  })

  if (uploadError) {
    console.error('Upload failed:', uploadError.message)
    alert('Upload failed!')
    return
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  if (data?.publicUrl) {
    previewUrl.value = data.publicUrl || null
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

export async function getProfile(user_Id) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user_Id)

  if (error) throw error

  console.log(data)
  return data
}
