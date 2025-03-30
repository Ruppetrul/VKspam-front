<script setup>
import {onMounted, ref, watchEffect} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import DistributionDetail from "@/components/DistributionGroupDetail/DistributionDetail.vue";
import {sexs} from "@/js/sexs.js";

const distributionGroupId = useRoute().params.id;

const isLoading = ref(true);
const error = ref('');
const name = ref('');
const url = ref('');
const distributionGroup = ref([]);
const isModalOpen = ref(false);

const selectedSex = ref(distributionGroup.value.sex);
const onlyBirthdayToday = ref(distributionGroup.value.only_birthday_today);
const onlyBirthdayFriends = ref(distributionGroup.value.only_birthday_friends);

const openModal = () => {
  isModalOpen.value = !isModalOpen.value;
}

const closeModal = () => {
  isModalOpen.value = false;
}

const saveDescriptionText = async () => {
  try {
    const token = localStorage.getItem('token');

    const data = {
      id: distributionGroupId,
      name: distributionGroup.value.name,
      description: distributionGroup.value.description,
      sex: selectedSex.value,
      only_birthday_today: onlyBirthdayToday.value,
      only_birthday_friends: onlyBirthdayFriends.value,
    }

    const response = await axios.put(
        '/api/distributions/group',
        new URLSearchParams(data),
      {
        headers: {
          'jwt-token': token,
        },
    }
    );
    if (response.status === 200 && response.data.success) {
      distributionGroup.value.description = response.data.data.description;
    } else {
      error.value = 'Failed to fetch distribution groups';
    }
  } catch (err) {
    console.log(err);
    error.value = err.message;
  } finally {
    //isLoading.value = false;
  }
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
            'jwt-token': token,
          },
        });

    if (response.status === 201 && response.data.success) {
      if (!distributionGroup.value.distributions) {
        distributionGroup.value.distributions = [];
      }
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
            'jwt-token': token,
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

const playSpam = async () => {
  console.log('play spam start');
  console.log('play spam end');
}

onMounted(() => {
  fetchDistributionGroup(useRoute().params.id);
});

watchEffect(() => {
  selectedSex.value = distributionGroup.value.sex;
  onlyBirthdayToday.value = distributionGroup.value.only_birthday_today;
  onlyBirthdayFriends.value = distributionGroup.value.only_birthday_friends;
});

</script>

<template>
  <div class="distribution-group">
    <h1 v-if="isLoading"> Loading... </h1>
    <div v-else>
      <div id="distribution_group_panel">
        <h1> Название: {{ distributionGroup.name }} </h1> <br>
        <h3> Текст рассылки: </h3>
        <textarea id="distribution_group_text" v-model="distributionGroup.description">{{distributionGroup.description}}</textarea>
        <br>
        <h3>Пол: {{ sexs[distributionGroup.sex] }}</h3>
        <input name="sex" type="radio" v-model="selectedSex" value="1"><b> Ж </b><br>
        <input name="sex" type="radio" v-model="selectedSex" value="2"><b> М </b><br>
        <input name="sex" type="radio" v-model="selectedSex" value="0"><b> Любой </b><br>
        <br>
        <b>Только тем, у кого день рождения сегодня:</b> <input name="birthday_filters" type="checkbox" v-model="onlyBirthdayToday"><br><br>
        <b>Только друзьям именинника:</b> <input name="birthday_filters" type="checkbox" v-model="onlyBirthdayFriends"><br><br>
        <button @click="saveDescriptionText">Сохранить настройки</button>
      </div>
      <div id="distribution_group_list_header">
        <h3>Связанные рассылки:</h3>
        <div class="distribution-manage-panel">
          <button @click="openModal">Создать рассылку</button>
        </div>
      </div>
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Новая рассылка VK</h2>
          <form @submit.prevent="save">
            <h3>Название рассылки</h3>
            <input name="name" type="text" placeholder="Группа номер 1" v-model="name"><br>
            <h3>Id группы в VK (например testnautyg)</h3>
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
        <div v-for="distribution in distributionGroup.distributions">
          <DistributionDetail :distribution="distribution" :key="distribution.id" :deleteDistribution="deleteDistribution"/>
        </div>
      </div>
      <h1 v-else>Рассылок не создано</h1>
    </div>
  </div>
</template>

<style scoped>
#distribution_group_text {
  width: 100vh;
  resize: none;
  height: auto;
  max-height: 15em;
  line-height: 1.5;
  min-height: 7em;
}

#distribution_group_panel {
  padding-bottom: 10px;
  border-bottom-style: inset;
}

#distribution_group_list_header{
  margin-bottom: 10px;
  padding-top: 10px;
}

.distribution-group {
  margin: 10px;
}

.modal-overlay {
  margin: 10px;
  padding: 5px;
  border: #181818 1px solid;
}

</style>