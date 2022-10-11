import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Gloomhaven", isFav: true }
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

    totalCount: (state) => {
      return state.tasks.length
    }
  },

  actions: {

  }
})