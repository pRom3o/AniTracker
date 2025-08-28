<script setup>
import { user_email, user_password, signUpUser } from '@/services/authServices.js'
import { supabase } from '../../lib/supabaseClient'
import LoadingIcon from '/public/icons/LoadingIcon.vue'
import { show_toast } from '../../services/toastServices'
import { previewUrl } from '../../services/profileServices'
import { showToast } from '../../services/watchlistServices'

import { ref } from 'vue'

// const auth = inject('auth')

// const user = auth.user
const userBio = ref('')
const userName = ref('')

const insertProfile = async (id, email) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      [
        {
          id: id,
          bio: userBio.value,
          name: userName.value,
          email: email,
          avatar_url: previewUrl.value || '',
        },
      ],
      { onConflict: 'id' },
    )
    .select('*')

  if (error) {
    showToast('error creating profile: ', 'failed')
    console.log('error creating profile: ', error.message)
  } else {
    showToast('Profile inserted: ', 'success')
    console.log('Profile inserted: ', data)
  }
}

const loading = ref(false)
const emit = defineEmits(['switchForm'])
const handleSignUp = async () => {
  loading.value = true
  console.log('signing up')
  try {
    const { data } = await signUpUser(user_email.value, user_password.value)
    if (data?.user) {
      console.log('sign up complete: ', data.user.email)
      await insertProfile(data.user.id, data.user.email)
      loading.value = false
      user_email.value = ''
      user_password.value = ''

      show_toast('Signup success, check email for confirmation message', 'success')
    }
  } catch (err) {
    show_toast(err.message || 'Signup failed', 'failed')
    console.error('Sign up failed: ', err.message)
  } finally {
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
        <h1 class="text-2xl font-stretch-100% font-[800] header p-2">Join AniTracker</h1>
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
            <label for="userName" class="px-4">Name</label>
            <input
              type="text"
              v-model="userName"
              placeholder="enter your name..."
              class="w-full outline-gray-500 py-3 px-5 rounded-3xl outline"
            />
          </div>
          <div class="flex flex-col space-y-3">
            <label for="userBio" class="px-4">Bio</label>
            <textarea
              name="userBio"
              id="userBio"
              v-model="userBio"
              placeholder="enter a short bio..."
              class="w-full outline-gray-500 py-3 px-5 rounded-3xl outline resize-none"
            ></textarea>
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
            @click="handleSignUp"
            v-if="loading == false"
            class="w-full px-5 p-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-3xl hover:bg-black/20"
          >
            Create account
          </button>
          <button
            @click="handleSignUp"
            v-else
            class="flex items-center justify-center w-full px-5 p-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-3xl hover:bg-black/20"
          >
            <LoadingIcon />
          </button>
          <button class="text-[#5a96f5] text-center" @click="emit('switchForm')">
            Already a user? Login here
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
