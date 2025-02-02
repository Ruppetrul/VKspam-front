<script setup>
import { defineProps } from 'vue';
import axios from "axios";

const props = defineProps({
  group: {
    name: String,
    id: Number,
    required: true,
  },
})

const deleteGroup = async () => {
  try {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');
    const response = await axios.delete(`api/distributions/group`,
        {
          params: {
            id: props.group.id,
          },
          headers: {
            jwt_token: token
          }
        })
    if (response.status === 200) {

    }
  } catch (err) {

  }
}

</script>

<template>
  <div class="group-item">
    <H3>{{ group.name }}</H3><br>
    <button class="delete-button" @click="deleteGroup">×</button>
  </div>
</template>

<style scoped>
.group-item {
  display: flex;
  justify-content: space-between;
}
</style>