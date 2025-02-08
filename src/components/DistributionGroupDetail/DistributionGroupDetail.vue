<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import DistributionDetail from "@/components/DistributionGroupDetail/DistributionDetail.vue";

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
      distributionGroups.value = response.data.data;
    } else {
      error.value = 'Failed to fetch distribution groups';
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchDistributionGroup(useRoute().params.id);
});
</script>

<template>
  <div class="distribution-group">
    <h1 v-if="isLoading"> Loading... </h1>
    <div v-else>
      <h1> Название: {{ distributionGroups.name }} </h1>
      <h3> Описание: {{ distributionGroups.description }} </h3>
      <br>
      <h3>Связанные рассылки:</h3>
      <div v-for="distribution in distributionGroups.distributions">
        <DistributionDetail :distribution="distribution"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.distribution-group {
  margin: 10px;
}
</style>