import {
  h,
  toRaw,
  watch,
  computed,
  onMounted,
  onUnmounted,
  defineComponent,
  type PropType,
  type TeleportProps,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  pick,
  isDef,
  unknownProp,
  numericProp,
  makeStringProp,
  makeNumberProp,
  createNamespace,
  TypeComponentsMap,
  iconPropType
} from '../utils'
import { lockClick } from './lock-click'

// Components
import { Icon } from '../icon'
import { Popup } from '../popup'
import { Loading, LoadingType } from '../loading'

import { getLastOffset } from './instance'

// Types
import type { ToastType, ToastPosition, ToastWordBreak } from './types'

const [, bem] = createNamespace('toast')

const popupInheritProps = [
  'show',
  'overlay',
  'teleport',
  'transition',
  'overlayClass',
  'overlayStyle',
  'closeOnClickOverlay'
] as const

export const toastProps = {
  icon: iconPropType,
  show: Boolean,
  type: makeStringProp<ToastType>('text'),
  overlay: Boolean,
  message: numericProp,
  iconSize: numericProp,
  duration: makeNumberProp(3000),
  position: makeStringProp<ToastPosition>('top'),
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  wordBreak: String as PropType<ToastWordBreak>,
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp('r-fade'),
  loadingType: String as PropType<LoadingType>,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean,
  offset: makeNumberProp(20),
  customStyle: Object as PropType<CSSProperties>,
  id: String
}

export type ToastProps = ExtractPropTypes<typeof toastProps>

export default defineComponent({
  name: 'RToast',
  props: toastProps,
  emits: ['update:show'],
  setup(props, { emit, slots }) {
    let timer: ReturnType<typeof setTimeout>
    let clickable = false

    const toggleClickable = () => {
      const newValue = props.show && props.forbidClick
      if (clickable !== newValue) {
        clickable = newValue
        lockClick(clickable)
      }
    }

    const updateShow = (show: boolean) => emit('update:show', show)

    const onClick = () => {
      if (props.closeOnClick) {
        updateShow(false)
      }
    }

    const clearTimer = () => clearTimeout(timer)

    const renderIcon = () => {
      const { icon, type, iconSize, iconPrefix, loadingType } = props

      // 获取类型图标
      const hasIcon = computed(() => {
        if (icon) {
          return icon
        }
        if (
          type === 'success' ||
          type === 'warning' ||
          type === 'info' ||
          type === 'danger'
        ) {
          return TypeComponentsMap[type]
        }
        return ''
      })

      if (hasIcon.value) {
        const iconComp = toRaw(hasIcon.value)

        const isSting = typeof iconComp === 'string'

        return (
          <Icon
            name={isSting ? iconComp : ''}
            size={iconSize}
            class={bem('icon')}
            classPrefix={iconPrefix}
          >
            {!isSting && h(iconComp)}
          </Icon>
        )
      }

      if (type === 'loading') {
        return (
          <Loading class={bem('loading')} size={iconSize} type={loadingType} />
        )
      }
    }

    const renderMessage = () => {
      const { type, message } = props

      if (slots.message) {
        return <div class={bem('text')}>{slots.message()}</div>
      }

      if (isDef(message) && message !== '') {
        return type === 'html' ? (
          <div key={0} class={bem('text')} innerHTML={String(message)} />
        ) : (
          <div class={bem('text')}>{message}</div>
        )
      }
    }

    watch(() => [props.show, props.forbidClick], toggleClickable)

    watch(
      () => [props.show, props.type, props.message, props.duration],
      () => {
        clearTimer()
        if (props.show && props.duration > 0) {
          timer = setTimeout(() => {
            updateShow(false)
          }, props.duration)
        }
      }
    )

    onMounted(toggleClickable)
    onUnmounted(toggleClickable)

    const lastOffset = computed(() => {
      if (props.id) {
        return getLastOffset(props.id)
      }
      return { top: 0, bottom: 0 }
    })

    const offset = computed(() => props.offset + lastOffset.value.bottom)

    const offsetBottom = computed(() => lastOffset.value.top - props.offset)

    const customStyle = computed<CSSProperties>(() => ({
      top: props.position === 'top' ? `${offset.value}px` : 'auto',
      bottom:
        props.position === 'bottom'
          ? offsetBottom.value > 0
            ? `calc(100vh - ${offsetBottom.value}px)`
            : `${props.offset}px`
          : 'auto'
    }))

    return () => (
      <Popup
        class={[
          bem([
            props.position,
            props.wordBreak === 'normal' ? 'break-normal' : props.wordBreak,
            { [props.type]: !props.icon }
          ]),
          props.className
        ]}
        id={props.id}
        customStyle={
          props.position === 'top' || props.position === 'bottom'
            ? customStyle.value
            : {}
        }
        lockScroll={false}
        onClick={onClick}
        onClosed={clearTimer}
        onUpdate:show={updateShow}
        {...pick(props, popupInheritProps)}
      >
        {renderIcon()}
        {renderMessage()}
      </Popup>
    )
  }
})
