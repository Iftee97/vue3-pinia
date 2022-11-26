<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h2>signup</h2>
    <label>
      <span> email: </span>
      <input type="email" v-model="email" />
    </label>
    <label>
      <span> password: </span>
      <input type="password" v-model="password" />
    </label>
    <label>
      <span> username: </span>
      <input type="text" v-model="displayName" />
    </label>
    <button>signup</button>
    <p>
      already have an account?
      <a href="#" @click="this.$router.push('/login')">login</a>
    </p>
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
        console.log(err.message);
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

<style scoped>
.signup-form {
  max-width: 360px;
  margin: 60px auto;
  padding: 20px;
}

.signup-form label {
  display: block;
  margin: 30px auto;
}

.signup-form span {
  display: block;
  margin-bottom: 6px;
}

.signup-form input {
  padding: 8px 6px;
  font-size: 1em;
  color: #777;
  width: 100%;
}

.signup-form button {
  padding: 12px 16px;
  font-size: 1rem;
}
</style>