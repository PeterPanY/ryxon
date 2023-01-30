import {
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'

// Utils
import {
  extend,
  numericProp,
  preventDefault,
  makeStringProp,
  createNamespace,
  BORDER_SURROUND,
} from '../utils'
import { useRoute, routeProps } from '../composables/use-route'

// Components
import { Icon } from '../icon'
import { Loading, LoadingType } from '../loading'

// Types
import {
  ButtonSize,
  ButtonType,
  ButtonNativeType,
  ButtonIconPosition,
} from './types'

const [, bem] = createNamespace('button')

export const buttonProps = extend({}, routeProps, {
  type: makeStringProp<ButtonType>('default'), // 类型，可选值为 primary success warning danger
  size: makeStringProp<ButtonSize>('normal'), // 尺寸，可选值为 large small mini
  text: String, // 按钮文字
  color: String, // 按钮颜色
  icon: String, // 左侧图标名称或图片链接
  iconPrefix: String, // 图标类名前缀
  iconPosition: makeStringProp<ButtonIconPosition>('left'), // 图标展示位置
  tag: makeStringProp<keyof HTMLElementTagNameMap>('button'), // 按钮根节点的 HTML 标签
  nativeType: makeStringProp<ButtonNativeType>('button'), // 原生 button 标签的 type 属性
  block: Boolean, // 是否为块级元素
  plain: Boolean, // 是否为朴素按钮
  square: Boolean, // 	是否为方形按钮
  round: Boolean, // 是否为圆形按钮
  disabled: Boolean, // 是否禁用按钮
  hairline: Boolean, // 是否使用 0.5px 边框
  loading: Boolean, // 是否显示为加载状态
  loadingText: String, // 加载状态提示文字
  loadingType: String as PropType<LoadingType>, // 	加载图标类型
  loadingSize: numericProp, // 加载图标大小
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export default defineComponent({
  name: 'RButton',
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const route = useRoute()
    const renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading()
      }
      return (
        <Loading
          size={props.loadingSize}
          type={props.loadingType}
          class={bem('loading')}
        />
      )
    }

    const renderIcon = () => {
      if (props.loading) {
        return renderLoadingIcon()
      }

      if (slots.icon) {
        return <div class={bem('icon')}>{slots.icon()}</div>
      }

      if (props.icon) {
        return (
          <Icon
            name={props.icon}
            class={bem('icon')}
            classPrefix={props.iconPrefix}
          />
        )
      }
    }

    const renderText = () => {
      let text
      if (props.loading) {
        text = props.loadingText
      } else {
        text = slots.default ? slots.default() : props.text
      }

      if (text) {
        return <span class={bem('text')}>{text}</span>
      }
    }

    const getStyle = () => {
      const { color, plain } = props
      if (color) {
        const style: CSSProperties = {
          color: plain ? color : 'white',
        }

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color
        }

        // hide border when color is linear-gradient
        if (color.includes('gradient')) {
          style.border = 0
        } else {
          style.borderColor = color
        }

        return style
      }
    }

    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        preventDefault(event)
      } else if (!props.disabled) {
        emit('click', event)
        route()
      }
    }

    return () => {
      const {
        tag,
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition,
      } = props

      const classes = [
        bem([
          type,
          size,
          {
            plain,
            block,
            round,
            square,
            loading,
            disabled,
            hairline,
          },
        ]),
        { [BORDER_SURROUND]: hairline },
      ]

      return (
        <tag
          type={nativeType}
          class={classes}
          style={getStyle()}
          disabled={disabled}
          onClick={onClick}
        >
          <div class={bem('content')}>
            {iconPosition === 'left' && renderIcon()}
            {renderText()}
            {iconPosition === 'right' && renderIcon()}
          </div>
        </tag>
      )
    }
  },
})
