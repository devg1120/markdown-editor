/* eslint-disable vue/require-default-prop */
import { defineComponent, PropType } from 'vue';
import './index.less';
import { Theme } from '../App';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    onChange: {
      type: Function as PropType<(v: Theme) => void>,
      default: () => {}
    },
    onPreviewChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => {}
    },
    onCodeThemeChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => {}
    },
    onLangChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => {}
    }
  },
  setup(props) {
    return () => (
      <header class="page-header">
        <section class="container">
          <p class="header-actions">
	  <a>&nbsp; BgColor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <button class="btn btn-header" onClick={() => props.onChange('light')}>
              ライトモード
            </button>
            <button class="btn btn-header" onClick={() => props.onChange('dark')}>
              ダークモード
            </button>
	  <a>&nbsp; &nbsp;  &nbsp;  &nbsp;  Lang &nbsp;</a>
            <button class="btn btn-header" onClick={() => props.onLangChange('zh-CN')}>
             Chainese
            </button>
            <button class="btn btn-header" onClick={() => props.onLangChange('en-US')}>
             English             
            </button>
          </p>
          <p class="header-actions">
	  <a>&nbsp; Preview &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('default')}
            >
              default
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('cyanosis')}
            >
              cyanosis
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('github')}
            >
              github
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('mk-cute')}
            >
              mk-cute
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('smart-blue')}
            >
              smart-blue
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('vuepress')}
            >
              vuepress
            </button>
          </p>
          <p class="header-actions">
	  <a>&nbsp; CodeTheme &nbsp;&nbsp;</a>
            <button
              class="btn btn-header"
              onClick={() => props.onCodeThemeChange('a11y')}
            >
              a11y
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onCodeThemeChange('atom')}
            >
              atom-one
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onCodeThemeChange('github')}
            >
              github
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onCodeThemeChange('gradient')}
            >
              gradient
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onCodeThemeChange('tokyo-night')}
            >
              tokyo-night
            </button>
          </p>
        </section>
      </header>
    );
  }
});
