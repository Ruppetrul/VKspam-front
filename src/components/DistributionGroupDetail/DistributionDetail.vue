<script setup>
import {defineProps} from "vue";

const props = defineProps({
  'distribution' : {
    'id' : Number,
    'name' : String,
    'url' : String,
  }
});

const distribution = props.distribution;
</script>

<template>
  <div class="distribution-detail">
    <h2>Name: {{distribution.name}}</h2>
    <h3>Url: {{distribution.url}}</h3>
  </div>
</template>

<style scoped>
.distribution-detail {
  padding: 5px;
  margin-bottom: 5px;
  background-color: #bdbdbd;
}
</style>