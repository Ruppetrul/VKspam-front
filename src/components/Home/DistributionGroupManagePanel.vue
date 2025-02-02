<script setup>
import {ref} from 'vue';
import axios from "axios";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
}

const name = ref('');
const error = ref('');

const save = async () => {
  if (!name.value) {
    error.value = 'Name is required';
    return;
  }

  try {
    const token = localStorage.getItem('token');

    const response = await axios.post('api/distributions/group',
        new URLSearchParams({
          name1: name.value,
          description: name.value,
        }),
        {
          headers: {
            jwt_token: token,
          },
        });

    if (response.status === 200 && response.data.success) {
      closeModal();
    } else {
      error.value = 'Failed to save distribution group';
    }
  } catch (err) {
    if (err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'An error occurred: ' + err.message;
    }
  }
};
</script>

<template>
  <div class="distribution-group-manage-panel">
    <button @click="openModal">Создать группу</button>
  </div>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <h2>Новая группа рассылки</h2>
      <form @submit.prevent="save">
        <input name="name" type="text" placeholder="Группа номер 1" v-model="name">
        <p v-if="error" class="error">{{ error }}</p>
        <div class="modal-actions">
          <button @click="closeModal">Отмена</button>
          <button type="submit" class="btn btn-primary">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.distribution-group-manage-panel {
  background-color: #ffcbcb;
}

.modal-overlay {
  position: fixed;
  display: flex;
  border: #181818 1px solid;
}

.modal {
  background-color: white;
  padding: 20px;
  width: 300px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>