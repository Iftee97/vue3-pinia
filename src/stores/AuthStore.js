import { defineStore } from 'pinia'

// firebase auth imports
import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    showNavbar: false, // might need later
  }),

  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        localStorage.setItem('user', JSON.stringify(this.user))
        console.log('user:', this.user)
      })
      // localStorage.setItem('user', JSON.stringify(this.user))
      // console.log('user:', this.user)
    },

    async signup({ email, password }) {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        this.user = response.user
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        throw new Error('could not sign up')
      }
    },

    async login({ email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        this.user = response.user
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        throw new Error('could not login')
      }
    },

    async logout() {
      await signOut(auth)
      this.user = null
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    toggleNavbar() {
      this.showNavbar = !this.showNavbar
    }
  },
})