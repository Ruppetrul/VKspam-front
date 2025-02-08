<script setup>
import {ref} from "vue";

const isMenuExpanded = ref(false);

const toggleMenu = () => {
  isMenuExpanded.value = !isMenuExpanded.value;
};
</script>

<template>
  <div :class="['sidebar', { 'sidebar-expanded': isMenuExpanded }]">
    <button class="toggle-button" @click="toggleMenu">
      {{ isMenuExpanded ? '◄' : '►' }}
    </button>

    <ul class="menu">
      <router-link :to="{ name: 'home' }">
        <li class="menu-item">
          <img alt="Vue logo" class="menu-item" src="./../src/assets/logo.svg" width="25" height="25" />
          <span v-if="isMenuExpanded" class="menu-text">Группы рассылок</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>

.sidebar {
  width: 60px;
  background-color: #ffdb56;
}

.menu {
  list-style: none;
  padding: 15px;
}

.toggle-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  top: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
}
</style>
