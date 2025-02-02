<script setup>
import DistributionGroup from "@/components/Home/DistributionGroup.vue";
import DistributionGroupManagePanel from "@/components/Home/DistributionGroupManagePanel.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const distributionGroups = ref([]);

const isLoading = ref(true);

const error = ref('');

const fetchDistributionGroups = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
        'api/distributions/group/list',
        {
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

const deleteGroup = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`api/distributions/group`,
        {
          params: {
            id: id,
          },
          headers: {
            jwt_token: token
          }
        })
    if (response.status === 200) {
      distributionGroups.value = distributionGroups.value.filter(
          group => group.id !== id
      )
    }
  } catch (err) {

  }
}

onMounted(() => {
  fetchDistributionGroups();
});

</script>

<template>
  <DistributionGroupManagePanel/>
  <p v-if="error" class="error">{{ error }}</p>
  <p v-if="isLoading">Loading...</p>
  <ul v-else>
    <li v-for="group in distributionGroups" :key="group.id">
      <DistributionGroup :group="group" :deleteGroup="deleteGroup" />
    </li>
  </ul>
</template>

<style scoped>
</style>