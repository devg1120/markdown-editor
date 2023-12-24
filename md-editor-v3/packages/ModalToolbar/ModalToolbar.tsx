import { defineComponent, PropType, SetupContext, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { getSlot } from '~/utils/vue-tsx';
import Modal from '~/components/Modal';
import { Themes } from '~/type';

const props = {
  title: {
    type: String as PropType<string>,
    default: ''
  },
  modalTitle: {
    type: String as PropType<string>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>
  },
  width: {
    type: String as PropType<string>,
    default: 'auto'
  },
  height: {
    type: String as PropType<string>,
    default: 'auto'
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  onClick: {
    type: Function as PropType<() => void>
  },
  onClose: {
    type: Function as PropType<() => void>
  },
  /**
   * 显示全屏按钮
   */
  showAdjust: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isFullscreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onAdjust: {
    type: Function as PropType<(val: boolean) => void>
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function as PropType<() => void>
  },
  language: {
    type: String as PropType<string>
  },
  theme: {
    type: String as PropType<Themes>
  }
  /**
   * ==结束
   */
};

type ModalToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

export default defineComponent({
  name: 'ModalToolbar',
  props,
  emits: ['onClick', 'onClose', 'onAdjust'],
  setup(
    props: ModalToolbarProps,
    ctx: SetupContext<Array<'onClick' | 'onClose' | 'onAdjust'>>
  ) {
    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');
      const Default = getSlot({ props, ctx }, 'default');

      return (
        <>
          <div
            class={`${prefix}-toolbar-item`}
            title={props.title}
            onClick={() => {
              if (props.onClick instanceof Function) {
                props.onClick();
              } else {
                ctx.emit('onClick');
              }
            }}
          >
            {Trigger}
          </div>
          <Modal
            width={props.width}
            height={props.height}
            title={props.modalTitle}
            visible={props.visible}
            onClose={() => {
              if (props.onClose instanceof Function) {
                props.onClose();
              } else {
                ctx.emit('onClose');
              }
            }}
            showAdjust={props.showAdjust}
            isFullscreen={props.isFullscreen}
            onAdjust={(v) => {
              if (props.onAdjust instanceof Function) {
                props.onAdjust(v);
              } else {
                ctx.emit('onAdjust', v);
              }
            }}
          >
            {Default}
          </Modal>
        </>
      );
    };
  }
});
