<template>
  <div>
    <div class="new-task-form" v-if="authIsReady">
      <TaskForm />
    </div>

    <!-- {{ user && user.email }} -->

    <div class="userContainer" v-if="user">
      <p>
        user: <strong>{{ user.email }}</strong>
      </p>
      <a href="#" @click="logout" v-if="user">logout</a>
    </div>
    <div class="notLoggedIn" v-else>
      <p>you are not logged in</p>
      <a href="#" @click="this.$router.push('/login')">login</a>
    </div>

    <div class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </div>

    <div class="loading" v-if="taskStore.loading">loading tasks...</div>

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
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { useAuthStore } from "../stores/AuthStore";
import { useRouter } from "vue-router";
import TaskForm from "../components/TaskForm.vue";
import TaskDetails from "../components/TaskDetails.vue";

export default {
  name: "Home",

  components: {
    TaskDetails,
    TaskForm,
  },

  setup() {
    const taskStore = useTaskStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const filter = ref("all");
    const authIsReady = computed(() => authStore.authIsReady);
    const user = computed(() => authStore.user);

    taskStore.getTasks();

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    return {
      taskStore,
      filter,
      user,
      authIsReady,
      logout,
    };
  },
};
</script>