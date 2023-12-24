<script setup>
  import { ref } from 'vue';
  import data from './data';

  //const text = ref('# HELLO');
  const text = ref(data);
  //const text = data;
</script>

<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

