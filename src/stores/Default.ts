import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilesStore = defineStore('files', () => {
  const files = ref([] as string[])

  return { files }
})