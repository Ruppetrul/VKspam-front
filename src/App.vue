<script setup>
import {ref} from "vue";

const isMenuExpanded = ref(false);
const isLogin = localStorage.getItem("token");

const toggleMenu = () => {
  isMenuExpanded.value = !isMenuExpanded.value;
};
</script>

<template>
  <div class="container" v-if='isLogin'>
    <div :class="['sidebar', { 'sidebar-expanded': isMenuExpanded }]">
      <button class="toggle-button" @click="toggleMenu">
        {{ isMenuExpanded ? '◄' : '►' }}
      </button>

      <ul class="menu">
        <router-link :to="{ name: 'home' }">
          <li class="menu-item">
            <img alt="Vue logo" class="menu-item" src="./../src/assets/logo.svg" width="25" height="25" />
            <span v-if="isMenuExpanded" class="menu-text">Главная</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'distribution-groups' }">
          <li class="menu-item">
            <img alt="Vue logo" class="menu-item" src="./../src/assets/logo.svg" width="25" height="25" />
            <span v-if="isMenuExpanded" class="menu-text">Группы рассылок</span>
          </li>
        </router-link>
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
}

.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 60px;
  background-color: #ffdb56;
}

.sidebar-expanded {
  width: 200px;
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
