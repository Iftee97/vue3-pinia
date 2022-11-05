<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button>add</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";

export default {
  name: "TaskForm",

  setup() {
    const taskStore = useTaskStore();

    const newTask = ref("");

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: Math.floor(Math.random() * 10000),
        });
        newTask.value = ""; // reset input
      }
    };

    return {
      newTask,
      handleSubmit,
    };
  },
};
</script>