<script setup>
import DistributionGroup from "@/components/DistributionGroups/DistributionGroup.vue";
import DistributionGroupManagePanel from "@/components/DistributionGroups/DistributionGroupManagePanel.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const distributionGroups = ref(null);

const isLoading = ref(true);

const error = ref('');

const fetchDistributionGroups = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
        'api/distributions/group/list',
        {
          headers: {
            'jwt-token': token,
          },
        }
    );

    if (response.status === 200 && response.data.success) {
      if (response.data.data) {
        distributionGroups.value = response.data.data;
      }
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
            'jwt-token': token
          }
        })
    if (response.status === 200) {
      distributionGroups.value = distributionGroups.value.filter(
          group => group.id !== id
      )
      if (distributionGroups.value.length === 0) {
        distributionGroups.value = null;
      }
    }
  } catch (err) {

  }
}

const addDistribution = async (distributionGroup) => {
  if (null === distributionGroups.value) {
    distributionGroups.value = [];
  }
  distributionGroups.value.push(distributionGroup);
}

onMounted(() => {
  fetchDistributionGroups();
});

</script>

<template>
  <DistributionGroupManagePanel :addDistribution="addDistribution"/>
  <br>
  <p v-if="error" class="error">{{ error }}</p>
  <ul v-if="distributionGroups">
    <li v-for="group in distributionGroups" :key="group.id">
      <DistributionGroup :group="group" :deleteGroup="deleteGroup" />
    </li>
  </ul>
  <div v-else>
    <h2>Группа рассылок еще не созданы.</h2>
  </div>
</template>

<style scoped>
</style>