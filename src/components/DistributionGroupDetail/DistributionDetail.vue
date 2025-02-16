<script setup>
import {defineProps} from "vue";
import axios from "axios";

const props = defineProps({
  'distribution' : {
    'id' : Number,
    'name' : String,
    'url' : String,
  },
  deleteDistribution: {
    type: Function,
    required: true,
  }},
);

const distribution = props.distribution;

const deleteDistributionLocal = async (id) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete('/api/distribution',
        {
          params: {
            id: id,
          },
          headers: {
            jwt_token: token,
          },
        });

    if (response.status === 200) {
      props.deleteDistribution(id);
    } else {
    }
  } catch (err) {
  }
};
</script>

<template>
  <div class="distribution-detail">
    <div>
      <h2>Name: {{distribution.name}}</h2>
      <h3>Url: {{distribution.url}}</h3>
    </div>

    <button class="delete-button" @click="deleteDistributionLocal(distribution.id)">×</button>
  </div>
</template>

<style scoped>
.distribution-detail {
  padding: 5px;
  margin-bottom: 5px;
  background-color: #bdbdbd;
  display: flex;
  justify-content: space-between;
}

.delete-button {
  height: min-content;
}

</style>