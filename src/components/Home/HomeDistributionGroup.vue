<script setup>
import {defineProps, onMounted, ref} from "vue";
import {runSpam} from "@/js/runSpam.js";
import {getProgress} from "@/js/getProgress.js";

const isRunning = ref(false);
const isError = ref(false);
const progress = ref(0);

const props = defineProps({
  group: {
    name: String,
    description: String,
    id: Number,
    required: true,
    only_birthday_today: Boolean,
    sex: Number,
  },
});

const sexs = {
  0: "Любой",
  1: "Мужчины",
  2: "Женщины",
};

const handleRunClick = () => {
  runSpam(props.group.id)
  isRunning.value = true
  progress.value = 0

  const interval = setInterval(async function () {
    progress.value = await getProgress(props.group.id);

    switch (props.group.id) {
      case -1:
        isError.value = false;
        isRunning.value = false;
        clearInterval(interval);
        break
      case -2:
        isError.value = true;
        clearInterval(interval);
        break;
      case 100:
        isRunning.value = false;
        clearInterval(interval);
        break;
    }
  }, 3000)
};

onMounted(async () => {
  var value = await getProgress(props.group.id);
  if (value > -1) {
    isRunning.value = true;
    const interval = setInterval(async function () {
      progress.value = await getProgress(props.group.id);
      if (progress.value < 0 || progress.value === 100) {
        clearInterval(interval);
        isRunning.value = false;
      }
    }, 3000)
  }
});
</script>

<template>
  <div class="home-distribution-group">
    <div class="group-summary">
      <h1>{{ group.name }}</h1>
      <h5>Текст: {{ group.description }}</h5>
      <h5>Только у кого ДР: {{ group.only_birthday_today }}</h5>
      <h5>Пол: {{ sexs[group.sex] }}</h5>
    </div>

    <button v-if="!isRunning" class="run-button" @click="handleRunClick">Запустить</button>
    <div v-else>
      <div v-if="progress === -2">
        <h1>Ошибка.</h1>
        <button class="run-button" @click="handleRunClick">Попробовать еще раз.</button>
      </div>
      <h1 v-else> Прогресс: {{progress}} %. </h1>
    </div>
  </div>
</template>

<style scoped>

.home-distribution-group {
  justify-content: space-between;
  display: flex;
}

.run-button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.run-button:hover {
  background-color: darkgreen;
}

.run-button:active {
  background-color: limegreen;
}
</style>