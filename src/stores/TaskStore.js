import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play MarioCart", isFav: true },
      { id: 3, title: "learn Vue 3 and Pinia", isFav: true },
    ],
  }),

  getters: {
    favs() {
      return this.tasks.filter(task => task.isFav)
    },

    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
      // return this.tasks.filter(task => task.isFav).length // // alternative way to count favs
    },

    totalCount() {
      return this.tasks.length
    }
    // totalCount: (state) => {
    //   return state.tasks.length
    // } // arrow function alternative
  },

  actions: {
    addTask(task) {
      this.tasks.push(task)
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    toggleFav(id) {
      const task = this.tasks.find(task => task.id === id)
      task.isFav = !task.isFav
    }
  }
})