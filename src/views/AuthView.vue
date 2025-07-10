<script setup>
import { current_auth_view } from '../services/authServices.js'
import LoginForm from '../components/Auth/LoginForm.vue'
import SignupForm from '../components/Auth/SignupForm.vue'
</script>

<template>
  <div class="min-h-screen w-full background-auth">
    <Transition name="switch-form">
      <LoginForm v-if="current_auth_view === 'login'" />
      <SignupForm v-else />
    </Transition>
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
