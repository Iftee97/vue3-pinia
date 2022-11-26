<template>
  <header @click="this.$router.push('/')">
    <img src="../assets/pinia-logo.svg" alt="pinia logo" />
    <h1>Pinia Tasks</h1>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>