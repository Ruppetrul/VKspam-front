<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";

const isMenuExpanded = ref(false);
const route = useRoute(); // Получаем текущий маршрут

const toggleMenu = () => {
  isMenuExpanded.value = !isMenuExpanded.value;
};
</script>

<template>
  <div class="container" v-if="route.path !== '/'">
    <div :class="['sidebar', { 'sidebar-expanded': isMenuExpanded }]">
      <button class="toggle-button" @click="toggleMenu">
        {{ isMenuExpanded ? '◄' : '►' }}
      </button>
      <ul class="menu">
        <li class="menu-item">
          <router-link :to="{ name: 'home' }">
            <span class="sidebar-item" v-if="isMenuExpanded">Главная</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{ name: 'logout' }">
            <span class="sidebar-item" v-if="isMenuExpanded">Выйти</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>

.content {
  padding: 10px;
  width: 100vw;
  align-content: center;
}

.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 60px;
  background-color: lightgreen;
}

.sidebar-expanded {
  width: 200px;
}

.menu {
  padding-left: 15px;
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

.toggle-button {
  padding: 15px;
}

.sidebar-item {
  font-size: 18px;
  color: black;
}

</style>
