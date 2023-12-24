
import { createApp } from 'vue';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';
import App from './App.vue';

VMdEditor.use(githubTheme, {
//VMdEditor.use(vuepressTheme, {
  Hljs: hljs,
});

const app = createApp(App);

app.use(VMdEditor);

app.mount('#app')

/*
import { createApp } from 'vue';
import App from './App.vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

VueMarkdownEditor.use(vuepressTheme);

let app = createApp(App).use(VueMarkdownEditor);

app.mount('#app')

*/

