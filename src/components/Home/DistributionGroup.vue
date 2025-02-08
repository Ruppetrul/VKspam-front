<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  group: {
    name: String,
    id: Number,
    required: true,
  },
  deleteGroup: {
    type: Function,
    required: true,
  }
})

</script>

<template>
  <div class="group-item">
    <router-link :to="{ name: 'group-detail', params: {id: group.id} }"><h3>{{ group.name }}</h3><br></router-link>
    <button class="delete-button" @click="deleteGroup(group.id)">×</button>
  </div>
</template>

<style scoped>
.group-item {
  display: flex;
  justify-content: space-between;
}

.delete-button {
  height: min-content;
}
</style>