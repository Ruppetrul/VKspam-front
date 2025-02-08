<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import DistributionDetail from "@/components/DistributionGroupDetail/DistributionDetail.vue";

const distributionGroupId = useRoute().params.id;

const isLoading = ref(true);
const error = ref('');
const name = ref('');
const url = ref('');
const distributionGroup = ref([]);
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
}

const save = async () => {
  if (!name.value) {
    error.value = 'Name is required';
    return;
  }

  if (!url.value) {
    error.value = 'Url is required';
    return;
  }

  try {
    const token = localStorage.getItem('token');

    const response = await axios.post('/api/distribution',
        new URLSearchParams({
          name: name.value,
          description: name.value,
          url: url.value,
          group_id: distributionGroupId,
          type: 'Any public'
        }),
        {
          headers: {
            jwt_token: token,
          },
        });

    if (response.status === 201 && response.data.success) {
      distributionGroup.value.distributions.push(response.data.data)
      closeModal();
    } else {
      error.value = 'Failed to save distribution group';
    }
  } catch (err) {
    error.value = err.response?.data?.message ?? 'An error occurred: ' + err.message;
  }
};

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
      distributionGroup.value = response.data.data;
    } else {
      error.value = 'Failed to fetch distribution groups';
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

const deleteDistribution = (id) => {
  const index = distributionGroup.value.distributions.findIndex(r => r.id === id);
  if (index !== -1) {
    distributionGroup.value.distributions.splice(index, 1);
  }
};

onMounted(() => {
  fetchDistributionGroup(useRoute().params.id);
});
</script>

<template>
  <div class="distribution-group">
    <h1 v-if="isLoading"> Loading... </h1>
    <div v-else>
      <h1> Название: {{ distributionGroup.name }} </h1>
      <h3> Описание: {{ distributionGroup.description }} </h3>
      <br>
      <div class="distribution-manage-panel">
        <button @click="openModal">Создать рассылку</button>
      </div>
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Новая рассылка VK</h2>
          <form @submit.prevent="save">
            <h3>Название рассылки</h3>
            <input name="name" type="text" placeholder="Группа номер 1" v-model="name"><br>
            <h3>Ссылка на группу VK</h3>
            <input name="name" type="text" placeholder="Ссылка" v-model="url"><br><br>
            <p v-if="error" class="error">{{ error }}</p>
            <div class="modal-actions">
              <button @click="closeModal">Отмена</button>
              <button type="submit" class="btn btn-primary">Создать</button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="distributionGroup.distributions">
        <h3>Связанные рассылки:</h3>
        <div v-for="distribution in distributionGroup.distributions">
          <DistributionDetail :distribution="distribution" :key="distribution.id" :deleteDistribution="deleteDistribution"/>
        </div>
      </div>
      <h1 v-else>Рассылок не создано</h1>
    </div>
  </div>
</template>

<style scoped>
.distribution-group {
  margin: 10px;
}

.modal-overlay {
  margin: 10px;
  padding: 5px;
  border: #181818 1px solid;
}
</style>