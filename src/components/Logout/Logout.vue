<script setup>
  import {useRouter} from "vue-router";

  localStorage.removeItem("token");
  const router = useRouter();
  router.push({ path: "/" });
</script>

<template>
</template>

<style scoped>
</style>