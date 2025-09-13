<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '../services/toastServices'
import { name, bio, update_profile_details } from '../services/settingsServices'
import { profile } from '../composables/useAuth'

import LoadingIcon from '../../public/icons/LoadingIcon.vue'
import CancelIcon from '../../public/icons/cancelIcon.vue'

const loading = ref(false)
const router = useRouter()
const handleUpdate = async () => {
  loading.value = true
  try {
    const data = await update_profile_details()
    if (data) {
      showToast('Profile update!!', 'success')
      profile.value = data[0]
      router.push('/profile')
      loading.value = false
    }
  } catch (error) {
    showToast(error.message, 'failed')
  } finally {
    loading.value = false
  }
}

const cancelUpdate = () => {
  router.push('/profile')
}

onMounted(() => {
  if (profile.value) {
    name.value = profile.value.name
    bio.value = profile.value.bio
  }
})
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center background-auth text-gray-300">
    <div class="flex flex-col items-center justify-center h-full w-full p-2">
      <div class="min-w-96 flex items-center justify-end mb-3">
        <button class="p-2 rounded-full cards cursor-pointer" @click="cancelUpdate">
          <CancelIcon />
        </button>
      </div>
      <div class="min-h-70 min-w-96 flex flex-col items-center justify-center space-y-10 cards p-4">
        <h1 class="text-2xl font-medium header">Edit profile details</h1>
        <div class="flex flex-col items-start space-y-3 w-full">
          <label for="name">Name</label>
          <input type="text" v-model="name" class="w-full rounded-xl p-2" v-html="name" />
        </div>
        <div class="flex flex-col items-start space-y-3 w-full">
          <label for="name" class="p-1 text-md">Bio</label>
          <textarea
            name="bio"
            id="bio"
            v-model="bio"
            class="min-h-30 w-full p-2 resize-none rounded-xl"
            v-html="bio"
          ></textarea>
        </div>
        <button
          class="w-full card p-2 rounded-2xl hover:bg-black/30 bg-blue-500/10 cursor-pointer"
          @click="handleUpdate"
          v-if="loading == false"
        >
          Update details
        </button>
        <button
          class="flex items-center justify-center w-full cards p-2 rounded-2xl hover:bg-black/80 cursor-pointer"
          v-else
        >
          <LoadingIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-auth {
  background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.card {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
.cards {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
.header {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
input,
textarea {
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: dotted 1px rgba(255, 255, 255, 0.1);
}
textarea::-webkit-scrollbar {
  scroll-snap-type: none;
}
</style>
