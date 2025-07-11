<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { toast_message, toast_type, toast_visible } from '../services/toastServices'
</script>

<template>
  <Transition name="toast"
    ><div
      v-if="toast_visible"
      :class="[
        'fixed top-5 right-5 z-50 px-4 py-2 rounded text-white transition-all',
        toast_type === 'success' ? 'bg-green-600' : 'bg-red-600',
      ]"
    >
      {{ toast_message }}
    </div></Transition
  >
</template>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: scale(0.5);
  transform: translateY(-30px);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
</style>
