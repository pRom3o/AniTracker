<script setup>
import { onMounted, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import LeftarrowIcon from '../../public/icons/LeftarrowIcon.vue'
import SettingsIcon from '../../public/icons/SettingsIcon.vue'
import editAvatarModal from '../components/Profile/editAvatarModal.vue'
import LogoutIcon from '../../public/icons/LogoutIcon.vue'
import LoadingIcon from '../../public/icons/LoadingIcon.vue'
import { editAvatar, editAvatarToggle, previewUrl } from '../services/profileServices'
import { logout, getUser } from '../services/authServices'

const auth = inject('auth')

const router = useRouter()

const user = ref({})
const userDetails = ref({})
const watchlist = ref({})
const loading = ref(false)

const goBack = () => {
  router.push('/')
}

const handleLogout = () => {
  logout()
  router.push('/auth')
}
onMounted(() => {
  user.value = auth.user
  userDetails.value = auth.userDetails
  watchlist.value = auth.watchlist

  console.log('user: ', user)
  console.log('userDetails: ', userDetails)
  console.log('watchlist: ', watchlist)
})

onMounted(() => {
  getUser()
  // getProfile()
})
</script>

<template>
  <div class="md:h-screen min-h-screen w-full background-auth text-gray-300 font-kanit">
    <div class="h-full w-full flex items-center justify-between flex-col space-y-8">
      <div class="h-full w-full flex items-center flex-col space-y-10 mt-20">
        <div
          class="fixed top-0 left-0 h-16 w-full border-b border-gray-700 flex justify-between items-center p-4 background"
        >
          <div class="flex items-center space-x-4">
            <button @click="goBack">
              <LeftarrowIcon />
            </button>
            <h1 class="font-bold text-3xl">Profile</h1>
          </div>
          <button @click="router.push('/settings')" class="p-2">
            <SettingsIcon />
          </button>
        </div>
        <div class="w-full md:w-7xl flex items-center flex-col justify-between p-3 space-y-10">
          <div
            class="h-full md:w-[50%] w-full flex flex-col items-center justify-between space-y-2"
          >
            <div class="w-full h-60 p-2 flex items-center justify-center">
              <div
                class="h-56 w-56 rounded-full cards p-4 flex items-center justify-center relative"
              >
                <img
                  :src="previewUrl"
                  alt="User Avatar"
                  class="object-cover inset-0 rounded-full h-full w-full"
                />
                <button
                  class="absolute bottom-0 right-5 p-2 rounded-full bg-black/50 cursor-pointer"
                  @click="editAvatarToggle"
                >
                  <editIcon />
                </button>
              </div>
            </div>
            <div class="min-h-10 w-full px-4 py-1 cards rounded-2xl">
              <p>Bio: {{ userDetails.bio ? userDetails.bio : 'empty' }}</p>
            </div>
          </div>
          <div
            class="h-full md:w-[50%] w-full flex flex-col items-center justify-center space-y-5 md:space-y-14"
          >
            <div class="w-full flex flex-col space-y-3 px-4 py-2 cards rounded-2xl">
              <p>Email: {{ userDetails.email }}</p>
              <p>Name: {{ userDetails.name ? userDetails.name : 'empty' }}</p>
            </div>
            <div class="w-full flex flex-col space-y-3 px-4 py-2 cards rounded-2xl">
              <p>Total animes: {{ userDetails.total_anime }}</p>
              <p>Watched animes: {{ watchlist.watched }}</p>
              <p>Currently atching animes: {{ watchlist.watching }}</p>
              <p>Interested in animes: {{ watchlist.interested }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end w-full p-3">
        <button
          class="bg-red-500/50 flex justify-between items-center px-4 py-3 rounded-3xl text-sm space-x-1"
          @click="handleLogout"
        >
          <p>Logout</p>
          <LogoutIcon class="h-5 w-5" v-if="loading == false" />
          <LoadingIcon class="h-5 w-5" v-else />
        </button>
      </div>
      <editAvatarModal v-if="editAvatar == true" />
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
}

.background {
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
}
</style>
