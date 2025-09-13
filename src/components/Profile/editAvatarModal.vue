<script setup>
import {
  editAvatarToggle,
  previewUrl,
  handleFileChange,
  uploadAvatarNow,
  uploading,
  deleteAvatar,
} from '../../services/profileServices'
import LoadingIcon from '../../../public/icons/LoadingIcon.vue'
import { profile } from '../../composables/useAuth'
import { ref } from 'vue'

const deleting = ref(false)
const handleDeleteAvatar = async () => {
  if (!profile.value?.id) return

  deleting.value = true

  try {
    const success = await deleteAvatar(profile.value.id)
    if (success) {
      profile.value.avatar_url = null
      previewUrl.value = null
      alert('Avatar deleted successfully')
    }
  } catch (error) {
    alert(`error deleting avatar: ${error.message}`)
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <div class="w-full h-screen bg-black/50 fixed z-100 p-4">
    <div
      class="h-full w-full p-3 flex items-center justify-center backdrop-blur-md"
      @click.self="editAvatarToggle"
    >
      <div
        class="min-h-72 md:w-88 w-full rounded-3xl border p-4 cards flex flex-col items-center justify-between space-y-5"
      >
        <!-- Inside modal -->
        <label class="relative block w-full cursor-pointer">
          <input type="file" class="hidden" @change="handleFileChange" />
          <div class="border border-dashed p-4 rounded-lg text-center">
            Click to select an image
          </div>
        </label>

        <!-- Show preview if selected -->
        <img
          v-if="previewUrl || profile.avatar_url"
          :src="previewUrl || profile.avatar_url"
          class="mt-4 h-32 w-32 rounded-full object-cover"
        />

        <!-- Upload Button -->
        <button
          v-if="uploading"
          class="mt-4 bg-blue-500/70 px-4 py-2 rounded-xl text-white hover:bg-blue-700"
        >
          <LoadingIcon />
        </button>
        <button
          v-else
          @click="uploadAvatarNow"
          class="mt-4 bg-blue-500/70 px-4 py-2 rounded-xl text-white hover:bg-blue-700"
        >
          Upload Avatar
        </button>
        <button
          v-if="profile.avatar_url && !deleting"
          @click="handleDeleteAvatar"
          class="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete Avatar
        </button>
        <button v-else-if="deleting" class="bg-red-500 text-white px-3 py-1 rounded">
          <LoadingIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  background: rgba(255, 255, 255, 0.05);
}
</style>
