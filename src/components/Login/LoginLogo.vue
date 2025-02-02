<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
    <header>
      <img alt="Vue logo" class="logo" src="./../../assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <h1 class="green">{{ msg }}</h1>
      </div>
    </header>
</template>

<style scoped>
header {
  text-align: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
