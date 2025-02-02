<script setup>
import {onMounted, ref} from "vue";
  import axios from "axios";
  import {useRoute} from "vue-router";

  const isLoading = ref(true);

  const distributionGroups = ref([]);

  const fetchDistributionGroup = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
          '/api/distributions/group',
          {
            params: {
              id: id,
            },
            headers: {
              jwt_token: token,
            },
          }
      );
      if (response.status === 200 && response.data.success) {
        console.log(response.data);
        distributionGroups.value = response.data.data;
      } else {
        error.value = 'Failed to fetch distribution groups';
      }
    } catch (err) {

    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchDistributionGroup(useRoute().params.id);
  });
</script>

<template>
  <h1 v-if="isLoading"> Loading... </h1>
  <div v-else>
    <h3> Id: {{distributionGroups.id}} </h3>
    <h3> Name: {{distributionGroups.name}} </h3>
    <h3> Description: {{distributionGroups.description}} </h3>
  </div>

</template>

<style scoped>

</style>