<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
const loading = ref(true)

const auth = inject('auth')
const router = useRouter()
const currentAuthView = ref('login')

const switchAuthView = (page) => {
  console.log('page', page)
  currentAuthView.value = page
}

onMounted(() => {
  if (auth && auth.user.value) {
    router.push('/profile')
  }
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen w-full background-auth">
    <!-- <Transition name="switch-form"> -->
    <LoginForm :switchAuthView="{ switchAuthView }" />
    <!-- <SignupForm v-else :switchAuthView="{ switchAuthView }" /> -->
    <!-- </Transition> -->
    <!-- <div class="spinner" v-else></div> -->
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
