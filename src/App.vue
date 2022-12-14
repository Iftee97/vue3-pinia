<template>
  <main>
    <Navbar />
    <router-view />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { useTaskStore } from "./stores/TaskStore";
import { useAuthStore } from "./stores/AuthStore";

export default {
  name: "App",

  components: {
    Navbar,
  },

  // setup() {
  //   const taskStore = useTaskStore();
  //   taskStore.getTasks();

  //   return {
  //     taskStore,
  //   };
  // },

  mounted() {
    const authStore = useAuthStore();
    authStore.init();

    const taskStore = useTaskStore();
    taskStore.getTasks(); // gets all tasks when the component mounts
  },
};
</script>