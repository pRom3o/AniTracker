import { ref } from 'vue'

export const toast_message = ref('') // set toast message value

export const toast_type = ref('success') // set toast type

export const toast_visible = ref(false) // toast visibility ref

// function to display toast
export const show_toast = (message, type = 'success') => {
  toast_message.value = message
  toast_type.value = type
  toast_visible.value = true

  setTimeout(() => {
    toast_visible.value = false
  }, 3000)
}
