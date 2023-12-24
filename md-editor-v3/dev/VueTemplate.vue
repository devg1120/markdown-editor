<template>
  <div class="container">
    <div style="margin: 1em 0">
      <button @click="changeVisible">クリック</button>
    </div>
    <MdEditorV3
      v-if="visible"
      v-model="text"
      editor-id="vue-template"
      language="en-US"
      @on-drop="onDrop"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import data from './data.md';

const text = ref(data);
const visible = ref(true);

const changeVisible = () => {
  visible.value = !visible.value;
};

const onDrop = (e: DragEvent) => {
  console.log('e', e);
};
</script>
