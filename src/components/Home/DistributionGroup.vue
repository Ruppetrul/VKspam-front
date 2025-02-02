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
    <router-link :to="{ name: 'group-detail', params: {id: group.id} }"><H3>{{ group.name }}</H3><br></router-link>
    <button class="delete-button" @click="deleteGroup( group.id)">×</button>
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