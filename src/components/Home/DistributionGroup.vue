<script setup>
defineProps({
  group: {
    name: String,
    required: true,
  },
})
</script>

<template>
  <H3>{{ group.name }}</H3><br>
</template>

<style scoped>
</style>