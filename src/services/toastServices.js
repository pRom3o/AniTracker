import { ref } from 'vue'

export const toast_message = ref('')

export const toast_type = ref('success')

export const toast_visible = ref(false)
export const show_toast = (message, type = 'success') => {
  toast_message.value = message
  toast_type.value = type
  toast_visible.value = true

  setTimeout(() => {
    toast_visible.value = false
  }, 3000)
}
