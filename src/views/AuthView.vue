<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';
const loading = ref(true)

const auth = inject('auth');
const router = useRouter();

onMounted(() => {
    if (auth && auth.user) {
        router.push('/profile');
    }
    loading.value = false
})
</script>


<template>
    <div class="min-h-screen w-full background-auth" :class="{ 'center': loading }">
        <Transition name="switch-form" v-if="!loading">
            <LoginForm v-if="current_auth_view === 'login'" />
            <SignupForm v-else />
        </Transition>
        <div class="spinner" v-if="loading"></div>
    </div>
</template>

<style scoped>
.background-auth {
    background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);
    background-size: cover;
    background-position: center;
    min-height: 100vh;
}

.switch-form-enter-active,
.switch-form-leave-active {
    transition:
        opacity 0.7s ease-in-out,
        transform 0.7s ease-in-out;
}

.switch-form-enter-from {
    transform: translateY(-50px);
    opacity: 0;
}

.switch-form-leave-to {
    transform: translateY(50px);
    opacity: 0;
}
</style>
