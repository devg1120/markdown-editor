
<template >
  <MdEditor v-model="md.text" :theme="md.theme" :language="md.language" :toolbars="toolbars" >
    <template #defToolbars>
      <NormalToolbar title="mark" @onClick="handler">
        <template #trigger>
	  <!--
          <svg width="27" height="27" viewbox="0 0 27 27" class="md-editor-icon">
            <path d="M20.035 13.5 13.5 19.802l-1.307-1.26 
	             4.37-4.214H6.965v-1.782h9.466l-4.238-4.087 
		     1.307-1.26 6.535 6.301Z"/>
          </svg>
	  -->
          <svg class="md-editor-icon" aria-hidden="true">
	      <use href="./icon/arrow.svg#arrow"/>
          </svg>
        </template>
      </NormalToolbar>
      <NormalToolbar title="sun" @onClick="sun">
        <template #trigger>
          <!--	https://icons8.jp/icons/set/sun  -->
          <svg class="md-editor-icon" aria-hidden="true">
	      <use href="./icon/sun.svg#sun"/>
          </svg>
        </template>
      </NormalToolbar>
    </template>
  </MdEditor>
  <!--
  <MdEditor v-model="md.text" :theme="md.theme" :language="md.language" />
  -->

</template>

<script setup>
import { ref , reactive } from 'vue';
import { MdEditor , NormalToolbar} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { config } from 'md-editor-v3';
import { lineNumbers } from '@codemirror/view';

import data from './data';
//import data from './data2';


config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});


//const text = ref('# Hello Editor');
//const text = ref(data);


const md = reactive({
       theme: "dark",
       language: "en-US",
      //text: '# Hello Editor'
      text: data
    });




const toolbars = [
  0,
  1,
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
  'github'
];

const handler = () => {
  console.log('NormalToolbar clicked!');
};

const sun = () => {
  console.log('sun clicked!');
  if (md.theme == "dark") {
      md.theme = "";
  } else {
      md.theme = "dark";
  }
};

</script>

<!--
<template>
  <MdEditor v-model="text" theme="dark" language="en-US" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { config } from 'md-editor-v3';
import { lineNumbers } from '@codemirror/view';

import data from './data';
//import data from './data2';


config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});


//co CROW first live scope and docment movienst text = ref('# Hello Editor');
const text = ref(data);


</script>

-->
