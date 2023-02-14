import {
  Transition,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'
import {
  truthProp,
  makeStringProp,
  componentSizes,
  createNamespace,
  HAPTICS_FEEDBACK
} from '../utils'
import { Icon } from '../icon'
import { Close } from '@ryxon/icons'
import type { TagType } from './types'

const [, bem] = createNamespace('tag')

export const tagProps = {
  size: { type: String, values: componentSizes, default: '' }, // 尺寸
  mark: Boolean, // 是否为标记样式
  show: truthProp, // 是否展示标签
  type: makeStringProp<TagType>('primary'), // 类型
  color: String, // 背景色
  plain: Boolean, // 是否为空心样式
  round: Boolean, // Tag 是否为圆形
  textColor: String, // 文本颜色
  closeable: Boolean, // 是否可关闭
  hit: Boolean, // 是否有边框描边
  disableTransitions: Boolean // 是否禁用渐变动画
  // effect // 主题
}

export type TagProps = ExtractPropTypes<typeof tagProps>

export default defineComponent({
  name: 'RTag',
  props: tagProps,
  emits: ['close'],
  setup(props, { slots, emit }) {
    const onClose = (event: MouseEvent) => {
      event.stopPropagation()
      emit('close', event)
    }

    const getStyle = (): CSSProperties => {
      if (props.plain) {
        return {
          color: props.textColor || props.color,
          borderColor: props.color
        }
      }
      return {
        color: props.textColor,
        background: props.color
      }
    }

    const renderTag = () => {
      const { type, mark, plain, round, size, closeable } = props

      const classes: Record<string, unknown> = {
        mark,
        plain,
        round
      }
      if (size) {
        classes[size] = size
      }

      const CloseIcon = closeable && (
        <Icon class={[bem('close'), HAPTICS_FEEDBACK]} onClick={onClose}>
          <Close />
        </Icon>
      )

      return (
        <span
          style={getStyle()}
          class={[bem([classes, type]), { 'is-hit': props.hit }]}
        >
          {slots.default?.()}
          {CloseIcon}
        </span>
      )
    }

    return () =>
      props.disableTransitions ? (
        props.show ? (
          renderTag()
        ) : null
      ) : (
        <Transition name={props.closeable ? 'r-fade' : undefined}>
          {props.show ? renderTag() : null}
        </Transition>
      )
  }
})
