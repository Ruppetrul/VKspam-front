<script setup>
import {onMounted, ref} from "vue";
import {fetchDistributionGroups} from "@/js/fetchDistributionGroups.js";
import HomeDistributionGroup from "@/components/Home/HomeDistributionGroup.vue";
import DistributionGroupEditPanel from "@/components/Home/DistributionGroupEditPanel.vue";
import {deleteDistributionGroup} from "@/js/deleteDistributionGroup.js";

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

const deleteGroup = async (id) => {
  try {
    const response = await deleteDistributionGroup(id)

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

</script>

<template>
<h1 v-if="isLoading">Загрузка...</h1>
<div id="distribution_group_list_body" v-else>
  <div id="distribution_group_list_header">
    <h3>Связанные рассылки:</h3>
    <div class="distribution-manage-panel">
      <button id="createDistributionsButton" v-if="!showModal" @click="showModal = true" @close="showModal = false">Создать рассылку</button>
      <DistributionGroupEditPanel v-else :isOpen="showModal" @close="showModal = false" :addDistributionGroup="addDistribution"/>
    </div>
  </div>
  <DistributionGroupEditPanel></DistributionGroupEditPanel>
  <div v-if="distributionGroups">
    <div id="distributionGroups" v-for="distributionGroup in distributionGroups">
      <HomeDistributionGroup :group="distributionGroup" :delete="deleteGroup"></HomeDistributionGroup>
    </div>
  </div>
  <div v-else>
    <h1>Группы рассылок еще не созданы :(</h1>
  </div>
</div>
</template>

<style scoped>
  #createDistributionsButton {
    border: none;
    background: green;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }

  #createDistributionsButton:hover {
    background: darkgreen;
  }

  #createDistributionsButton:active {
    background: green;
  }

  #distribution_group_list_body {
    height: 100%;
  }

  .distribution-manage-panel {
    border-left: ridge;
    padding-left: 5pt;
  }
</style>