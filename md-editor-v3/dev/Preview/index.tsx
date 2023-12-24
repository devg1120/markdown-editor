/* eslint-disable vue/require-default-prop */
import {
  defineComponent,
  reactive,
  PropType,
  onUnmounted,
  watch,
  ref,
  onMounted
} from 'vue';
import { MdEditor, MdCatalog, DropdownToolbar, ModalToolbar, config } from '~~/index';
import type { ExposeParam } from '~~/index';
import mdText from '../data.md';
import { Theme } from '../App';
import Normal from './Normal/index.vue';
import axios from 'axios';
// import TargetBlankExtension from './image/TargetBlankExtension.js';
// import 'katex/dist/katex.min.css';

// import { Extension } from '@codemirror/state';
import { lineNumbers } from '@codemirror/view';
import { CompletionSource } from '@codemirror/autocomplete';
// import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
// import DDD from './.local/DDD.vue';
// import screenfull from 'screenfull';
// import katex from 'katex';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.css';
// import mermaid from 'mermaid';
// import highlight from 'highlight.js';
// import 'highlight.js/styles/tokyo-night-dark.css';

// import prettier from 'prettier';
// import parserMarkdown from 'prettier/parser-markdown';

// import ancher from 'markdown-it-anchor';

import './index.less';
import Icon from '~/components/Icon';

// import { cdnBase } from '../../MdEditor/config';

// const myCompletions = (context: CompletionContext) => {
//   const word = context.matchBefore(/@|\w*/);
//   if (word!.from == word!.to && !context.explicit) return null;

//   return {
//     from: word!.from,
//     options: [
//       { label: '@imzbf', type: 'text' },
//       { label: '@github', type: 'text' },
//       { label: 'match', type: 'keyword' },
//       { label: 'hello', type: 'variable', info: '(World)' },
//       { label: 'helo', type: 'variable', info: '(MD)' },
//       { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' }
//     ]
//   };
// };

config({
  codeMirrorExtensions(theme, extensions) {
    // console.log(theme, extensions, keyBindings);

    // return extensions;
    return [...extensions, lineNumbers()];
  },
  // iconfontType: 'class',
  // markdownItConfig: (mdit) => {
  // mdit.use(ancher, {
  //   permalink: true
  // });
  // markdownItPlugins(plugins) {
  //   console.log(plugins);
  //   return [];
  // },

  // mdit.use(TargetBlankExtension);
  // },
  mermaidConfig: (base) => {
    return base;
  },
  editorExtensions: {
    // prettier: {
    //   prettierInstance: prettier,
    //   parserMarkdownInstance: parserMarkdown
    // },
    // highlight: {
    // instance: highlight
    // css: {
    //   'tokyo-night': {
    //     light: `${cdnBase}/highlight.js/11.5.1/styles/tokyo-night-light.min.css`,
    //     dark: `${cdnBase}/highlight.js/11.5.1/styles/tokyo-night-dark.min.css`
    //   }
    // }
    // }
    // screenfull: {
    //   instance: screenfull
    // },
    // katex: {
    //   instance: katex
    // }
    // cropper: {
    //   instance: Cropper
    // },
    // mermaid: {
    //   instance: mermaid
    // }
  }
});

const SAVE_KEY = 'XHMPGLJIZTDB';
const INPUT_BOX_WITDH = 'tcxll8alg5jx52hw';

const mdHeadingId = (t: string, l: number, index: number) => `heading-${index}`;

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    previewTheme: String as PropType<string>,
    codeTheme: String as PropType<string>,
    lang: String as PropType<string>
  },
  setup(props) {
    const storagedText = localStorage.getItem(SAVE_KEY) || '';
    const storagedWidth = localStorage.getItem(INPUT_BOX_WITDH) || '200px';
    const md = reactive({
      text: storagedText || mdText,
      text2: 'Hello world',
      visible: false,
      modalVisible: false,
      isFullscreen: false,
      inputBoxWitdh: storagedWidth
    });

    const editorRef = ref<ExposeParam>();

    // 自动保存
    let taskId = -1;
    watch(
      () => md.text,
      () => {
        clearInterval(taskId);
        taskId = window.setTimeout(() => {
          localStorage.setItem(SAVE_KEY, md.text);
        }, 2_000);
      }
    );

    onMounted(() => {
      editorRef.value?.on('preview', (status) => {
        console.log('preview', status);
      });

      editorRef.value?.on('htmlPreview', (status) => {
        console.log('htmlPreview', status);
      });

      editorRef.value?.on('pageFullscreen', (status) => {
        console.log('pageFullscreen', status);
      });

      editorRef.value?.on('fullscreen', (status) => {
        console.log('fullscreen', status);
      });

      editorRef.value?.on('catalog', (status) => {
        console.log('catalog', status);
      });
    });

    onUnmounted(() => {
      clearInterval(taskId);
    });
    // -----end-----

    const completions = reactive<{
      list: Array<CompletionSource>;
    }>({
      list: []
    });

    onMounted(() => {
      setTimeout(() => {
        completions.list.push((context) => {
          const word = context.matchBefore(/^>\s*/);

          if (word === null || (word.from == word!.to && context.explicit)) {
            return null;
          }

          return {
            from: word.from,
            options: [
              {
                label: '> ',
                type: 'text'
              }
            ]
          };
        });
      }, 5000);
    });

    return () => (
      <div class="project-preview">
        <div
          style={{
            width: '200px',
            padding: '10px',
            border: '1px solid #666',
            position: 'fixed',
            right: '10px',
            top: '170px'
          }}
        >
          <MdCatalog editorId="md-prev" theme={props.theme} mdHeadingId={mdHeadingId} />
        </div>

        <div class="container">
          <MdEditor
            completions={completions.list}
            ref={editorRef}
            editorId="md-prev"
            previewTheme={props.previewTheme}
            theme={props.theme}
            modelValue={md.text}
            // pageFullscreen
            // preview={false}
            // htmlPreview
            //language={props.lang}
            language="en-US"
            // toolbarsExclude={['github']}
            // noPrettier
            // tabWidth={4}
            showCodeRowNumber
            // katex={katex}
            // tableShape={[10, 10]}
            // noMermaid
            // placeholder="placeholder"
            // noKatex
            // noHighlight
            mdHeadingId={mdHeadingId}
            // sanitize={(h) => `<a href="#">aaa</a>${h}`}
            // scrollAuto={false}
            // noIconfont
            // codeStyleReverse={false}
            // codeStyleReverseList={['mk-cute']}
            // autoFocus
            // disabled
            // readOnly
            // maxLength={10}
            // autoDetectCode
            // onHtmlChanged={console.log}
            // onError={console.log}
            onSave={(v, h) => {
              console.log('onSave');
              h.then((html) => {
                console.log('onSaveAsync', html);
              });
              localStorage.setItem(SAVE_KEY, v);
            }}
            // onHtmlChanged={console.log}
            // onGetCatalog={console.log}
            codeTheme={props.codeTheme}
            // toolbars={['bold', 'link', '=', 'prettier', 'link']}
            // toolbarsExclude={['github']}
            onChange={(value) => (md.text = value)}
            // noImgZoomIn
            // customIcon={{
            //   bold: {
            //     component: 'A',
            //     props: {}
            //   },
            //   // copy: '<i class="fa fa-car"></i>',
            //   preview: {
            //     component: '<i class="fa fa-car"></i>',
            //     props: {
            //       name: 'copy'
            //     }
            //   },
            //   github: {
            //     component: Icon,
            //     props: {
            //       name: 'italic'
            //     }
            //   }
            // }}
            onUploadImg={async (
              files: Array<File>,
              callback: (urls: string[]) => void
            ) => {
              const res = await Promise.all(
                files.map((file) => {
                  return new Promise((rev, rej) => {
                    const form = new FormData();
                    form.append('file', file);

                    axios
                      .post('/api/img/upload', form, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      })
                      .then((res) => rev(res))
                      .catch((error) => rej(error));
                  });
                })
              );

              callback(res.map((item: any) => item.data.url));
            }}
            formatCopiedText={(text: string) => {
              return `${text} \nfrom @imzbf`;
            }}
            // onBlur={console.log}
            // onFocus={console.log}
            // onInput={console.log}
            // showToolbarName
            inputBoxWitdh={md.inputBoxWitdh}
            onInputBoxWitdhChange={(w) => {
              md.inputBoxWitdh = w;
              localStorage.setItem(INPUT_BOX_WITDH, w);
            }}
            toolbars={[
              'bold',
              'underline',
              'italic',
              'strikeThrough',
              '-',
              'title',
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
              0,
              1,
              2,
              '=',
              'prettier',
              'pageFullscreen',
              'fullscreen',
              'preview',
              'htmlPreview',
              'catalog',
              'github'
            ]}
            // onDrop={(e) => {
            //   console.log('ee', e);
            // }}
            defToolbars={
              <>
                <Normal />
                <DropdownToolbar
                  title="下拉扩展"
                  visible={md.visible}
                  trigger={<Icon name="strike-through" />}
                  onChange={(visible) => {
                    md.visible = visible;
                  }}
                  overlay={<div>下拉内容</div>}
                ></DropdownToolbar>
                <ModalToolbar
                  title="弹窗扩展"
                  modalTitle="外置弹窗"
                  showAdjust
                  visible={md.modalVisible}
                  isFullscreen={md.isFullscreen}
                  onAdjust={(isFullscreen) => {
                    md.isFullscreen = isFullscreen;
                  }}
                  trigger={<Icon name="strike-through" />}
                  onClick={() => {
                    md.modalVisible = true;
                  }}
                  onClose={() => {
                    md.modalVisible = false;
                  }}
                >
                  <div
                    style={{
                      width: '500px',
                      height: '300px'
                    }}
                  ></div>
                </ModalToolbar>
              </>
            }
            footers={['markdownTotal', '=', 0, 'scrollSwitch']}
            defFooters={
              <>
                <span>^_^</span>
              </>
            }
          ></MdEditor>
          <br />
          {/* <Editor
            editorId="md-prev-2"
            theme={props.theme}
            previewTheme={props.previewTheme}
            codeTheme={props.codeTheme}
            modelValue={md.text2}
            onChange={(value) => (md.text2 = value)}
          /> */}
        </div>
      </div>
    );
  }
});
