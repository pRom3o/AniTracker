<script setup>
import { getUser } from '../services/authServices'
import { onMounted, ref } from 'vue'
import router from '../router/index'
import { show_toast } from '../services/toastServices'
import { name, bio, get_profile_data, update_profile_details } from '../services/settingsServices'
import LoadingIcon from '../../public/icons/LoadingIcon.vue'

const loading = ref(false)
const handleUpdate = async () => {
  loading.value = true
  const result = await update_profile_details(name.value, bio.value)
  if (result?.length) {
    router.push('/profile')
    show_toast('Profile update!!', 'success')
  } else {
    show_toast('error updating profile', 'failed')
    loading.value = false
  }
}

onMounted(async () => {
  await getUser()
  await get_profile_data()
})
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center background-auth text-gray-300">
    <div class="flex flex-col items-center justify-center h-full w-full p-2">
      <div class="min-h-70 min-w-96 flex flex-col items-center justify-center space-y-10 cards p-4">
        <h1 class="text-2xl font-medium header">Edit profile details</h1>
        <div class="flex flex-col items-start space-y-3 w-full">
          <label for="name">Name</label>
          <input type="text" v-model="name" class="w-full rounded-xl p-2" />
        </div>
        <div class="flex flex-col items-start space-y-3 w-full">
          <label for="name" class="p-1 text-md">Bio</label>
          <textarea
            name="bio"
            id="bio"
            v-model="bio"
            class="min-h-30 w-full p-2 resize-none rounded-xl"
          ></textarea>
        </div>
        <button
          class="w-full cards p-2 rounded-2xl hover:bg-black/80 cursor-pointer"
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
