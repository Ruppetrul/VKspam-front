<script setup>
import {onMounted, ref} from "vue";
import {fetchDistributionGroups} from "@/js/fetchDistributionGroups.js";
import HomeDistributionGroup from "@/components/Home/HomeDistributionGroup.vue";
import DistributionGroupEditPanel from "@/components/Home/DistributionGroupEditPanel.vue";

const isLoading = ref(true);
const showModal = ref(false);
const distributionGroups = ref([]);

const addDistribution = async (distributionGroup) => {
  if (null === distributionGroups.value) {
    distributionGroups.value = [];
  }
  distributionGroups.value.push(distributionGroup);
}

onMounted(async () => {
  distributionGroups.value = await fetchDistributionGroups();
  isLoading.value = false;
});

</script>

<template>
<h1 v-if="isLoading">Загрузка...</h1>
<div v-else>
  <div id="distribution_group_list_header">
    <h3>Связанные рассылки:</h3>
    <div class="distribution-manage-panel">
      <button v-if="!showModal" @click="showModal = true" @close="showModal = false">Создать рассылку</button>
      <DistributionGroupEditPanel v-else :isOpen="showModal" @close="showModal = false" :addDistributionGroup="addDistribution"/>
    </div>
  </div>
  <DistributionGroupEditPanel></DistributionGroupEditPanel>
  <div v-if="distributionGroups">
    <div id="distributionGroups" v-for="distributionGroup in distributionGroups">
      <HomeDistributionGroup :group="distributionGroup"></HomeDistributionGroup>
    </div>
  </div>
  <div v-else>
    <h1>Группы рассылок еще не созданы :(</h1>
  </div>
</div>
</template>

<style scoped>

</style>