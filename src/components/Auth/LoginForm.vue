<script setup>
import { user_email, user_password, switchAuthView, signInUser } from '@/services/authServices'
import router from '../../router/index'
import { nextTick, ref } from 'vue'
import LoadingIcon from '/public/icons/LoadingIcon.vue'
import { show_toast } from '../../services/toastServices'

const loading = ref(false)

const handleSignIn = async () => {
  loading.value = true
  const result = await signInUser(user_email.value, user_password.value)
  console.log(result)
  if (result?.user) {
    await nextTick()
    router.push('/watchlist')
    loading.value = false
    show_toast('Login successful', 'success')
  } else {
    show_toast('Invalid credentials', 'failed')
    console.error('Sign in failed')
    loading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center p-4 background-auth text-white/80"
  >
    <div class="min-h-90 md:w-xl w-full rounded-3xl shadow-xl p-3 cards">
      <div class="min-h-90 w-full flex flex-col items-center space-y-10 rounded-3xl md:p-5 p-3">
        <h1 class="text-2xl font-stretch-100% font-[800] header p-2">Welcome back!</h1>
        <div class="flex flex-col justify-center w-full space-y-8">
          <div class="flex flex-col space-y-3">
            <label for="user_email" class="px-4">Email</label>
            <input
              type="email"
              v-model="user_email"
              placeholder="enter your email..."
              class="w-full outline-gray-500 py-3 px-5 rounded-3xl outline"
            />
          </div>
          <div class="flex flex-col space-y-3">
            <label for="user_password" class="px-4">Password</label>
            <input
              type="password"
              v-model="user_password"
              placeholder="enter your password..."
              class="w-full outline-gray-500 py-3 px-5 rounded-3xl outline"
            />
          </div>
          <button
            @click="handleSignIn"
            v-if="loading == false"
            class="w-full px-5 p-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-3xl hover:bg-black/20"
          >
            Sign in
          </button>
          <button
            class="w-full px-5 p-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-3xl hover:bg-black/20 flex items-center justify-center"
            v-else
          >
            <LoadingIcon />
          </button>
          <button class="text-[#5a96f5] text-center" @click="switchAuthView">
            Not a user? Join us here
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

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
</style>
