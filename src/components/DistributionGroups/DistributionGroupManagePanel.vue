<script setup>
import {defineProps, ref} from 'vue';
import axios from "axios";

const props = defineProps({
  addDistribution: {
    type: Function,
    required: true,
  }
})

const isModalOpen = ref(false);

const selectedSex = ref(0);
const onlyBirthdayToday = ref(0);

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
          name: name.value,
          description: name.value,
          sex: selectedSex.value,
          only_birthday_today: onlyBirthdayToday.value
        }),
        {
          headers: {
            'jwt-token': token,
          },
        });
    if (response.status === 200 && response.data.success) {
      props.addDistribution(response.data.data)
      closeModal();
    } else {
      error.value = 'Failed to save distribution group';
    }
  } catch (err) {
      error.value = err.response?.data?.message ?? 'An error occurred: ' + err.message;
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
        <h3>Пол:</h3>
        <input name="sex" type="radio" v-model="selectedSex" value="1"><b> Ж </b><br>
        <input name="sex" type="radio" v-model="selectedSex" value="2"><b> М </b><br>
        <input name="sex" type="radio" v-model="selectedSex" value="0"><b> Любой </b><br>
        <h3>Только у кого день рождения:</h3>
        <input name="sex" type="checkbox" v-model="onlyBirthdayToday" value="0"><br>
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