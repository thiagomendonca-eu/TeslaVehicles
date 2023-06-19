import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoggedStore = defineStore('logged', () => {
    const status = ref(false)
    return { status }
})