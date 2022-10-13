<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

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
  </main>
</template>

<script>
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";

export default {
  name: "App",

  components: {
    TaskDetails,
    TaskForm,
  },

  setup() {
    const taskStore = useTaskStore();

    const filter = ref("all");

    // fetch tasks json server
    taskStore.getTasks();

    return {
      taskStore,
      filter,
    };
  },
};
</script>