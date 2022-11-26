<template>
  <div>
    <div style="background: #e7e7e7">
      <TaskForm style="margin-bottom: 1rem" />
      <div class="userContainer" v-if="user">
        <p>
          <strong>{{ user.email }}</strong>
        </p>
        <span> | </span>
        <a href="#" @click="logout">logout</a>
      </div>
    </div>

    <div v-if="user">
      <div class="filter">
        <button @click="filter = 'all'">All Tasks</button>
        <button @click="filter = 'favs'">Fav Tasks</button>
      </div>
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
    const user = computed(() => authStore.user);

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    return {
      taskStore,
      filter,
      user,
      logout,
    };
  },
};
</script>

<style scoped>
.userContainer {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.taskForm {
  margin-bottom: 8px;
}
</style>