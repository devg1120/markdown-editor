<!--
<template>
  <md-editor v-model="text" @onChange="onChange" @onUploadImg="onUploadImg" />
</template>

<script>
import { defineComponent } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "App",
  components: {
    MdEditor,
  },
  data() {
    return {
      text: "# AAA这是标题",
    };
  },
  methods: {
    onChange(val) {},
    onUploadImg(files) {
      console.log(Array.from(files));
    },
  },
});
</script>

-->



<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { config } from 'md-editor-v3';
import { lineNumbers } from '@codemirror/view';

/*
config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});
*/

const text = ref('# Hello Editor');


</script>


<!--
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

-->
