<template>
  <form @submit.prevent="handleSubmit">
    <h2>login</h2>
    <br />
    <div>
      <label>
        <span>email:</span>
        <input type="email" v-model="email" />
      </label>
    </div>
    <div>
      <label>
        <span>password:</span>
        <input type="password" v-model="password" />
      </label>
    </div>
    <button>login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";

export default {
  name: "Login",

  setup() {
    const email = ref("");
    const password = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await authStore.login({
          email: email.value,
          password: password.value,
        });
        router.push("/"); // redirects to the homepage
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>