<script setup>
  import {reactive} from "vue";
  import {createDistributionGroup} from "@/js/createDistributionGroup.js";

  const props = defineProps({
    isOpen: Boolean,
    addDistributionGroup: Function,
  });

  const formState = reactive({
    name: '',
    selectedSex: 0,
    onlyBirthdayToday: 0,
    onlyBirthdayFriends: 0,
    error: ''
  });
  const emit = defineEmits(['close'])

  const save = async () => {
      if (!formState.name) {
        formState.error = 'Name is required';
        return;
      }

      try {
        const response = await createDistributionGroup(formState);
        if (response.status === 200 && response.data.success) {
          props.addDistributionGroup(response.data.data)
          emit('close');
        } else {
          formState.error = 'Failed to save distribution group';
        }
      } catch (err) {
        formState.error = err.response?.data?.message ?? 'An error occurred: ' + err.message;
        console.error('Failed to create distribution group:', err);
      }
  }
</script>

<template>
  <div v-if="isOpen" class="modal">
    <h2>Новая группа рассылки</h2>
    <form @submit.prevent="save">
      <input name="name" type="text" placeholder="Группа номер 1" v-model="formState.name">
      <h3>Пол:</h3>
      <input name="sex" type="radio" v-model="formState.selectedSex" value="1"><b> Ж </b><br>
      <input name="sex" type="radio" v-model="formState.selectedSex" value="2"><b> М </b><br>
      <input name="sex" type="radio" v-model="formState.selectedSex" value="0"><b> Любой </b><br><br>
      <h3>Рассылка именинникам:</h3>
      <input name="birthday" type="radio" v-model="formState.onlyBirthdayToday" value="0"><br><br>
      <h3>Рассылка друзьям именинника (лучше делать заблаговременно):</h3>
      <input name="birthday" type="radio" v-model="formState.onlyBirthdayFriends" value="0"><br><br>
      <p v-if="formState.error" class="error">{{ formState.error }}</p>
      <div class="modal-actions">
        <button class="distribution-edit-cancel" @click="$emit('close')">Отмена</button>
        <button type="submit" class="btn btn-primary distribution-edit-approve">Создать</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.modal {
  margin-left: 10pt;
}

.distribution-edit-cancel {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background: red;
}

.distribution-edit-approve {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background: green;
  margin-left: 5pt;
}

.distribution-edit-cancel:hover {
  color: darkgreen;
}

.distribution-edit-cancel:active {
  color: green;
}

.distribution-edit-approve:hover {
  color: darkred;
}

.distribution-edit-approve:active {
  color: red;
}
</style>