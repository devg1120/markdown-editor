<template>
  <div class="container">
    <div style="margin: 1em 0">
      <button @click="changeVisible">クリック</button>
    </div>
    <div v-if="visible">
        <MdEditorV3
            theme={props.theme}
          v-model="text"
          editor-id="vue-template1"
          language="en-US"
          @on-drop="onDrop"
        />
        <MdEditorV3
          v-model="text"
          editor-id="vue-template2"
          language="en-US"
          @on-drop="onDrop"
        />
    </div>
    <div v-else>
          <MdPreview
	   style="width:80%"
            previewTheme="default"
            codeTheme="default"
            v-model="text"
          />

    </div>
    <!--
    <MdEditorV3
      v-if="visible"
      v-model="text"
      editor-id="vue-template2"
      language="en-US"
      @on-drop="onDrop"
    />
    -->
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
