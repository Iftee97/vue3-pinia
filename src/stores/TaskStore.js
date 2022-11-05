import { defineStore } from 'pinia'

// firebase imports
import { db } from '../firebase/config'
import {
  collection, addDoc, doc, deleteDoc, onSnapshot, getDoc, updateDoc
} from "firebase/firestore";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false
  }),

  getters: {
    favs() {
      return this.tasks.filter(task => task.isFav)
    },

    favCount() {
      return this.tasks.filter(task => task.isFav).length
    },

    totalCount() {
      return this.tasks.length
    }
  },

  actions: {
    async getTasks() {
      this.loading = true
      try {
        const taskRef = collection(db, 'tasks')
        onSnapshot(taskRef, (snapshot) => {
          const results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
          this.tasks = results
        })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },

    async addTask(task) {
      const ref = collection(db, 'tasks')
      await addDoc(ref, task)
    },

    async deleteTask(id) {
      await deleteDoc(doc(db, 'tasks', id))
    },

    async toggleFav(id) {
      const taskRef = doc(db, 'tasks', id)
      const taskSnap = await getDoc(taskRef)
      if (taskSnap.exists()) {
        await updateDoc(taskRef, {
          isFav: !taskSnap.data().isFav
        })
      } else {
        console.log('No such document!')
      }
    }
  }
})