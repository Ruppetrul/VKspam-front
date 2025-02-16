<script setup>
import {onMounted, ref} from "vue";
import {fetchDistributionGroups} from "@/js/fetchDistributionGroups.js";
import HomeDistributionGroup from "@/components/Home/HomeDistributionGroup.vue";

const isLoading = ref(true);
const distributionGroups = ref([]);

onMounted(async () => {
  distributionGroups.value = await fetchDistributionGroups();
  isLoading.value = false;
});
</script>

<template>
<h1 v-if="isLoading">Загрузка...</h1>
<div v-else-if="!isLoading">
  <div id="distributionGroups" v-for="distributionGroup in distributionGroups">
    <HomeDistributionGroup :group="distributionGroup"></HomeDistributionGroup>
  </div>
</div>
</template>

<style scoped>

</style>