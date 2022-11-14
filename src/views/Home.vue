<template>
  <div>
    <!-- filter nav -->
    <div class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </div>

    <!-- loading -->
    <div class="loading" v-if="taskStore.loading">loading tasks...</div>

    <!-- task lists -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} fav tasks left to do</p>
      <div v-for="(task, index) in taskStore.favs" :key="index">
        <TaskDetails :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TaskDetails from "../components/TaskDetails.vue";
import TaskForm from "../components/TaskForm.vue";
import { useTaskStore } from "../stores/TaskStore";

export default {
  name: "Home",

  components: {
    TaskDetails,
    TaskForm,
  },

  setup() {
    const taskStore = useTaskStore();

    const filter = ref("all");

    taskStore.getTasks();

    return {
      taskStore,
      filter,
    };
  },
};
</script>