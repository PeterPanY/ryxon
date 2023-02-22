import {
  h,
  inject,
  computed,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  extend,
  isString,
  numericProp,
  iconPropType,
  preventDefault,
  makeStringProp,
  createNamespace
} from '../utils'
import { useRoute, routeProps } from '../composables/use-route'
import { buttonGroupContextKey } from '../button-group/ButtonGroup'

// Components
import { Icon } from '../icon'
import { Loading, LoadingType } from '../loading'

// Types
import {
  ButtonSize,
  ButtonType,
  ButtonNativeType,
  ButtonIconPosition
} from './types'

const [, bem, , isBem] = createNamespace('button')

export const buttonProps = extend({}, routeProps, {
  type: makeStringProp<ButtonType>('default'), // 类型，可选值为 primary success warning danger
  size: makeStringProp<ButtonSize>('normal'), // 尺寸，可选值为 large small mini
  text: [String, Boolean], // 按钮文字或者文字按钮
  color: String, // 按钮颜色
  icon: iconPropType, // 左侧图标名称或图片链接
  iconPrefix: String, // 图标类名前缀
  iconPosition: makeStringProp<ButtonIconPosition>('left'), // 图标展示位置
  tag: makeStringProp<keyof HTMLElementTagNameMap>('button'), // 按钮根节点的 HTML 标签
  nativeType: makeStringProp<ButtonNativeType>('button'), // 原生 button 标签的 type 属性
  plain: Boolean, // 是否为朴素按钮
  round: Boolean, // 是否为圆形按钮
  disabled: Boolean, // 是否禁用按钮
  loading: Boolean, // 是否显示为加载状态
  loadingText: String, // 加载状态提示文字
  loadingType: String as PropType<LoadingType>, // 	加载图标类型
  loadingSize: numericProp, // 加载图标大小
  circle: Boolean, // 是否为圆形按钮
  link: Boolean, // 是否为链接按钮
  bg: Boolean // 是否显示文字按钮背景颜色
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export default defineComponent({
  name: 'RButton',
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const route = useRoute()

    const buttonGroupContext = inject(buttonGroupContextKey, undefined)

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
            name={isString(props.icon) ? props.icon : ''}
            class={bem('icon')}
            classPrefix={props.iconPrefix}
          >
            {props.icon && !isString(props.icon) && h(props.icon)}
          </Icon>
        )
      }
    }

    // 展示文字
    const renderText = () => {
      let text
      if (props.loading) {
        text = props.loadingText
      } else {
        text = slots.default
          ? slots.default()
          : isString(props.text)
          ? props.text
          : ''
      }

      if (text) {
        return <span class={bem('text')}>{text}</span>
      }
    }

    const getStyle = () => {
      const { color, plain } = props
      if (color) {
        const style: CSSProperties = { color: plain ? color : 'white' }

        if (!plain) {
          // 使用背景而不是backgroundColor使线性渐变生效
          style.background = color
        }

        // 当颜色为线性渐变时隐藏边框
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

    const _size = computed(() => props.size || buttonGroupContext?.size || '')
    const _type = computed(() => props.type || buttonGroupContext?.type || '')

    return () => {
      const {
        bg,
        tag,
        text,
        link,
        round,
        plain,
        circle,
        loading,
        disabled,
        nativeType,
        iconPosition
      } = props

      const classes = [
        bem([
          _type.value,
          _size.value,
          {
            text: isString(text),
            link,
            plain,
            round,
            circle,
            loading,
            disabled
          }
        ]),
        isBem('has-bg', bg)
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
  }
})
