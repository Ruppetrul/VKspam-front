<script setup>
import {defineProps, onMounted, ref} from "vue";
import {runSpam} from "@/js/runSpam.js";
import {getProgress} from "@/js/getProgress.js";
import {showToast} from "@/js/toast.js";

const isRunning = ref(false);
const isError = ref(false);
const progress = ref(0);
const message = ref("");
const todayProcessed = ref(false);

const props = defineProps({
  group: {
    name: String,
    description: String,
    id: Number,
    required: true,
    only_birthday_today: Boolean,
    sex: Number,
    last_processing: String,
  },
  delete: Function
});

const sexs = {
  0: "Любой",
  1: "Мужчины",
  2: "Женщины",
};

const handleRunClick = async () => {
  try {
    const response = await runSpam(props.group.id)
    if (response.status !== 200) {
      isError.value = true;
      isRunning.value = false;
      showToast('Сервис ответил неизвестным статусом. Обратитесь к разработчику.')
      return;
    }
  } catch (error) {
    isError.value = true;
    isRunning.value = false;
    showToast(error.message)
    return;
  }

  isRunning.value = true
  progress.value = 0
  message.value = ""

  const interval = setInterval(async function () {
    const result = await getProgress(props.group.id);

    progress.value = result.Progress;
    message.value = result.Message;

    switch (progress.value) {
      case -2:
        isError.value = true;
        isRunning.value = true;
        clearInterval(interval);
        break;
      case -1:
        isError.value = false;
        isRunning.value = false;
        clearInterval(interval);
        break;
    }
  }, 3000)
};

onMounted(async () => {
  const processingDate = new Date(props.group.last_processing);
  const today = new Date();

  todayProcessed.value =
      processingDate.getFullYear() === today.getFullYear() &&
      processingDate.getMonth() === today.getMonth() &&
      processingDate.getDate() === today.getDate();

  const interval = setInterval(async function () {
    const result = await getProgress(props.group.id);
    progress.value = result.Progress;

    if (progress.value < 0) {
      clearInterval(interval);
      isRunning.value = false;
    } else {
      isRunning.value = true;
    }
  }, 3000)
});
</script>

<template>

  <div class="home-distribution-group">
    <div class="group-summary">
      <router-link :to="{ name: 'group-detail', params: {id: group.id} }">
        <h1>{{ group.name }}</h1>
      </router-link>
      <h5>Текст: {{ group.description }}</h5>
      <h5>Только у кого ДР: {{ group.only_birthday_today }}</h5>
      <h5>Пол: {{ sexs[group.sex] }}</h5>
      <h5>Последняя рассылка: {{group.last_processing}} </h5>
    </div>

    <div class="action-buttons">
      <button v-if="!isRunning" class="delete-button" @click="props.delete(group.id)">
Удалить
      </button>
      <button v-if="!isRunning && !todayProcessed" class="run-button" @click="handleRunClick">Запустить</button>
      <div v-else-if="isRunning">
        <div v-if="progress === -2">
          <h1>Ошибка.</h1>
          <button class="run-button" @click="handleRunClick">Попробовать еще раз.</button>
        </div>
        <div v-else>
          <h2 v-if="message"> Инфо: {{message}} </h2>
          <h3> Прогресс по текущей задаче: {{progress}} %. </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.home-distribution-group {
  justify-content: space-between;
  display: flex;
  margin-top: 10pt;
}

.run-button, .delete-button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  height: fit-content;
}

.run-button {
  background-color: green;
  margin-left: 5px;
}

.delete-button {
  background-color: red;
}

.run-button:hover {
  background-color: darkgreen;
}

.run-button:active {
  background-color: limegreen;
}

.delete-button:hover {
  background-color: darkred;
}

.delete-button:active {
  background-color: red;
}

.action-buttons {
  display: inline-flex;
}
</style>