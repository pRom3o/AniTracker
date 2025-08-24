<script setup>

import { logging_out, logout, user_email, user_password } from '../services/authServices';
// import { watchlist } from '../services/watchlistServices'
import { onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const auth = inject('auth');
// const total_anime = ref(0)
const router = useRouter()
// const email = ref('')
// const watched = ref(0)
// const watching = ref(0)
// const interested = ref(0)
// const name = ref('')
// const bio = ref('')
// const userDetails = reactive({
//     email: '',
//     name: '',
//     bio: '',
//     total_anime: 0,
//     watched: 0,
//     watching: 0,
//     interested: 0,
// })



const goBack = () => {
    router.push('/')
}

const handleLogout = async () => {
    logging_out.value = true
    const success = await logout()
    if (success) {
        router.push('/auth') // Redirect after logout
        user_email.value = ''
        user_password.value = ''
        logging_out.value = false
    } else {
        alert('Logout failed.')
    }
}

onMounted(() => {
    const user = auth.user
    const userDetails = auth.userDetails
    const watchlist = auth.watchlist
    console.log('user: ', user)
    console.log('userDetails: ', userDetails)
    console.log('watchlist: ', watchlist)
})
</script>

<template>
    <div class="md:h-screen min-h-screen w-full background-auth text-gray-300 font-kanit">
        <!-- <div class="h-full w-full flex items-center justify-between flex-col space-y-8">
            <div class="h-full w-full flex items-center flex-col space-y-10 mt-20">
                <div
                    class="fixed top-0 left-0 h-16 w-full border-b border-gray-700 flex justify-between items-center p-4 background">
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
                    <div class="h-full md:w-[50%] w-full flex flex-col items-center justify-between space-y-2">
                        <div class="w-full h-60 p-2 flex items-center justify-center">
                            <div class="h-56 w-56 rounded-full cards p-4 flex items-center justify-center relative">
                                <img :src="previewUrl" alt="User Avatar"
                                    class="object-cover inset-0 rounded-full h-full w-full" />
                                <button class="absolute bottom-0 right-5 p-2 rounded-full bg-black/50 cursor-pointer"
                                    @click="edit_avatar_modal">
                                    <editIcon />
                                </button>
                            </div>
                        </div>
                        <div class="min-h-10 w-full px-4 py-1 cards rounded-2xl">
                            <p>Bio: {{ userDetails.bio ? userDetails.bio : 'empty' }}</p>
                        </div>
                    </div>
                    <div
                        class="h-full md:w-[50%] w-full flex flex-col items-center justify-center space-y-5 md:space-y-14">
                        <div class="w-full flex flex-col space-y-3 px-4 py-2 cards rounded-2xl">
                            <p>Email: {{ userDetails.email }}</p>
                            <p>Name: {{ userDetails.name ? userDetails.name : 'empty' }}</p>
                        </div>
                        <div class="w-full flex flex-col space-y-3 px-4 py-2 cards rounded-2xl">
                            <p>Total animes: {{ userDetails.total_anime }}</p>
                            <p>Watched animes: {{ userDetails.watched }}</p>
                            <p>Currently atching animes: {{ userDetails.watching }}</p>
                            <p>Interested in animes: {{ userDetails.interested }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-end w-full p-3">
                <button class="bg-red-500/50 flex justify-between items-center px-4 py-3 rounded-3xl text-sm space-x-1"
                    @click="handleLogout" v-if="logging_out == false">
                    <p>Logout</p>
                    <LogoutIcon class="h-5 w-5" />
                </button>
                <button class="bg-red-500/50 flex justify-center items-center px-2 py-2 rounded-3xl" v-else>
                    <LoadingIcon />
                </button>
            </div>
            <editAvatarModal v-if="edit_avatar == true" />
        </div> -->
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
