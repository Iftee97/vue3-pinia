<template>
  <form @submit.prevent="handleSubmit">
    <h2>signup</h2>
    <br />
    <div>
      <label> email: </label>
      <input type="email" v-model="email" />
    </div>
    <div>
      <label> password: </label>
      <input type="password" v-model="password" />
    </div>
    <div>
      <label> username: </label>
      <input type="text" v-model="displayName" />
    </div>
    <button>signup</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";

export default {
  name: "Signup",

  setup() {
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await authStore.signup({
          email: email.value,
          password: password.value,
          displayName: displayName.value,
        });
        router.push("/"); // redirects to the homepage
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      email,
      password,
      displayName,
      handleSubmit,
    };
  },
};
</script>