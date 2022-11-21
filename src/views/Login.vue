<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <h2>login</h2>
    <label>
      <span> email: </span>
      <input type="email" v-model="email" />
    </label>
    <label>
      <span> password: </span>
      <input type="password" v-model="password" />
    </label>
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
        console.log(err.message);
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

<style scoped>
.login-form {
  max-width: 360px;
  margin: 60px auto;
  padding: 20px;
}

.login-form label {
  display: block;
  margin: 30px auto;
}

.login-form span {
  display: block;
  margin-bottom: 6px;
}

.login-form input {
  padding: 8px 6px;
  font-size: 1em;
  color: #777;
  width: 100%;
}

.login-form button {
  padding: 12px 16px;
  font-size: 1rem;
}
</style>