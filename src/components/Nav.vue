<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { nextTick, onMounted, ref, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import Search from './Search.vue'
import { searchbar, animeSearch } from '../services/watchlistServices'
import { toggleDropdown, isDropdownOpen, signOutUser } from '../services/authServices'
import { useRouter } from 'vue-router'

import ProfileIcon from '/public/icons/ProfileIcon.vue'
import LogoutIcon from '/public/icons/LogoutIcon.vue'

const dropDownRef = ref(null)
const profileButtonRef = ref(null)

const handleClickOutside = (event) => {
  if (
    dropDownRef.value &&
    !dropDownRef.value.contains(event.target) &&
    profileButtonRef.value &&
    !profileButtonRef.value.contains(event.target)
  ) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const router = useRouter()
// handle signout
const handleSignOut = async () => {
  const { error } = await signOutUser()
  if (error) {
    console.error('Sign out error: ', error.message)
    return
  }

  await nextTick()
  router.push('/auth')
}
</script>

<template>
  <div
    class="max-w-full rounded-full backdrop-blur-md overlay p-2 md:m-2 flex items-center justify-between fixed left-1 right-1 top-2 z-2 text-gray-300"
  >
    <p class="text-center p-4 rounded-full hover:backdrop-blur-lg hidden md:flex">
      <RouterLink to="/" class="logo">AniTracker</RouterLink>
    </p>
    <div class="space-x-2 p-2 overlay rounded-full flex items-center justify-evenly">
      <li class="md:px-4 md:py-1 hover:backdrop-blur-lg rounded-2xl text-sm md:text-base pl-2">
        <RouterLink to="/">Home</RouterLink>
      </li>
      <button
        type="text"
        class="px-4 py-2 rounded-3xl text-center flex items-center cursor-pointer border border-[#333333]"
        @click="animeSearch"
      >
        Search
        <p class="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24 ">
            <path
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17.5 17.5L22 22m-2-11a9 9 0 0 1-17.064 4M2 11a9 9 0 0 1 17.065-4m0 0V2m0 5H14.5M2.936 15v5m0-5H7.5"
              color="#fff"
            />
          </svg>
        </p>
      </button>
      <li class="md:px-4 py-1 hover:backdrop-blur-lg rounded-2xl text-sm md:text-base pr-2">
        <RouterLink to="/watchlist">Watchlist</RouterLink>
      </li>
    </div>
    <!-- <div class="md:min-w-[5%] flex justify-center p-2 hover:backdrop-blur-lg rounded-full relative">
      <div v-if="userSession" class="flex items-center justify-center">
        <button @click="toggleDropdown" ref="profileButtonRef"><ProfileIcon /></button>
        <Transition name="search"
          ><div
            class="absolute top-14 md:-left-[70%] right-0 min-h-36 w-36 background rounded-3xl space-y-5 p-4 flex flex-col items-center justify-evenly"
            v-if="isDropdownOpen"
            ref="dropDownRef"
          >
            <button
              class="w-full px-5 p-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-3xl hover:bg-black/20 flex items-center justify-evenly space-x-1"
            >
              <RouterLink to="/profile">Profile</RouterLink> <ProfileIcon />
            </button>
            <button
              class="w-full px-5 p-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-3xl hover:bg-black/20 flex items-center justify-evenly space-x-1"
              @click="handleSignOut"
            >
              <p>Logout</p>
              <LogoutIcon />
            </button></div
        ></Transition>
      </div>
      <div class="md:w-[5%] flex justify-center p-2 hover:backdrop-blur-lg rounded-full" v-else>
        <RouterLink to="/auth">Login/Signup</RouterLink>
      </div>
    </div> -->
  </div>
  <Transition name="search">
    <Search v-if="searchbar" class="z-50" />
  </Transition>
</template>

<style scoped>
.background {
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
}
li {
  list-style: none;
}

.overlay {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #2d1b4e 100%);
}
/* .overlay2 {
  background-color: rgba(0, 0, 0, 0.4);
} */

::placeholder {
  text-align: center;
  font-size: 14px;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: scale(0.5);
  transform: translateY(-30px);
}

.search-enter-active,
.search-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
