<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from "vue-router";

  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();

  const login = async() => {
    try {
      const response = await axios.post('api/auth/login',
        new URLSearchParams({
          email: email.value,
          password: password.value
        }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        }
      });

      if (response.status === 200 && response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);

        await router.push({name: 'home'});
      } else {
        error.value = 'Invalid credentials';
      }
    } catch (err) {
      error.value = 'An error occurred during login' . err;
    }
  };
</script>

<template>
  <main>
    <form id="login-form"
          @submit.prevent="login">
      <input type="email" id="email" v-model="email" placeholder="Email" required /><br>
      <input type="password" id="password" v-model="password" placeholder="Password" required /><br>
      <input type="submit">
    </form>
    <div id="login-error-panel">
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </main>
</template>

<style scoped>
  main {
    text-align: center;
  }
</style>