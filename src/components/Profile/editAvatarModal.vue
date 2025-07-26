<script setup>
import {
  edit_avatar_modal,
  previewUrl,
  handleFileChange,
  uploadAvatarNow,
} from '../../services/profileServices'
// import uploadIcon from '/public/icons/uploadIcon.vue'
</script>

<template>
  <div class="w-full h-screen bg-black/50 fixed z-100 p-4">
    <div
      class="h-full w-full p-3 flex items-center justify-center backdrop-blur-md"
      @click.self="edit_avatar_modal"
    >
      <div
        class="min-h-72 md:w-88 w-full rounded-3xl border p-4 cards flex flex-col items-center justify-between space-y-5"
      >
        <!-- Inside modal -->
        <label class="relative block w-full cursor-pointer">
          <input type="file" class="hidden" @change="handleFileChange" />
          <div class="border border-dashed p-4 rounded-lg text-center">
            Click to select an image
          </div>
        </label>

        <!-- Show preview if selected -->
        <img v-if="previewUrl" :src="previewUrl" class="mt-4 h-32 w-32 rounded-full object-cover" />

        <!-- Upload Button -->
        <button
          @click="uploadAvatarNow"
          class="mt-4 bg-blue-500/70 px-4 py-2 rounded-xl text-white hover:bg-blue-700"
        >
          Upload Avatar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  background: rgba(255, 255, 255, 0.05);
}
</style>
