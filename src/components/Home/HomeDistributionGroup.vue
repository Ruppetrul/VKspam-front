<script setup>
import { defineProps } from "vue";

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
  console.log("Кнопка 'Запустить' нажата!");
};
</script>

<template>
  <div class="home-distribution-group">
    <div class="group-summary">
      <h1>{{ group.name }}</h1>
      <h5>Текст: {{ group.description }}</h5>
      <h5>Только у кого ДР: {{ group.only_birthday_today }}</h5>
      <h5>Пол: {{ sexs[group.sex] }}</h5>
    </div>

    <button class="run-button" @click="handleRunClick">Запустить</button>
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