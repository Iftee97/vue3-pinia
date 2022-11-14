<template>
  <form @submit.prevent="handleSubmit">
    <h2>login</h2>
    <br />
    <div>
      <label> email: </label>
      <input type="email" v-model="email" />
    </div>
    <div>
      <label> password: </label>
      <input type="password" v-model="password" />
    </div>
    <button>login</button>
    <p>
      dont have an account?
      <a href="#" @click="this.$router.push('/signup')">sign up</a>
    </p>
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