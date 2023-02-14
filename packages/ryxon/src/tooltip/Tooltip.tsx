import {
  ref,
  toRef,
  unref,
  watch,
  computed,
  nextTick,
  onDeactivated,
  defineComponent,
  type PropType,
  type CSSProperties,
  type TeleportProps,
  type ExtractPropTypes
} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Instance, createPopper, offsetModifier } from '@ryxon/popperjs'
import {
  tooltipEmits,
  useTooltipModelToggle,
  whenTrigger
} from './tooltip-utils'
import { useDelayedToggle } from '../composables/use-delayed-toggle'

// Utils
import {
  pick,
  extend,
  isBoolean,
  truthProp,
  numericProp,
  unknownProp,
  makeStringProp,
  definePropType,
  createNamespace,
  composeEventHandlers,
  type ComponentInstance
} from '../utils'

// Composables
import { useClickAway } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Components
import { Popup } from '../popup'

// Types
import { TooltipTheme, TooltipTrigger, TooltipPlacement } from './types'

const [, bem] = createNamespace('tooltip')

const popupProps = [
  'overlay',
  'duration',
  'teleport',
  'overlayStyle',
  'overlayClass',
  'popperClass',
  'popperStyle',
  'closeOnClickOverlay'
] as const

export const tooltipProps = {
  /**
   * 因为模型切换属性是动态生成的,因此typescript无法将类型评估为类型：
   */
  visible: { type: definePropType<boolean | null>(Boolean), default: null }, // Tooltip 组件可见性
  content: { type: String, default: '' }, // 显示的内容
  rawContent: { type: Boolean, default: false }, // content 中的内容是否作为 HTML 字符串处理
  disabled: { type: Boolean }, // Tooltip 组件是否禁用
  theme: makeStringProp<TooltipTheme>('dark'), // Tooltip 主题
  trigger: makeStringProp<TooltipTrigger>('hover'),
  // 当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => ['Enter', 'Space']
  },
  showArrow: truthProp,
  placement: makeStringProp<TooltipPlacement>('bottom'), // Tooltip 组件出现的位置
  iconPrefix: String,
  // 出现位置的偏移量
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 8]
  },
  showAfter: { type: Number, default: 0 }, // 在触发后多久显示内容，单位毫秒
  hideAfter: { type: Number, default: 200 }, // 延迟关闭，单位毫秒
  transition: { type: String, default: 'r-tooltip-zoom' }, // 动画名称
  enterable: { type: Boolean, default: true }, // 鼠标是否可进入到 tooltip 中
  overlay: Boolean,
  duration: numericProp,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  popperClass: unknownProp,
  popperStyle: Object as PropType<CSSProperties>,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  }
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

export default defineComponent({
  name: 'RTooltip',
  props: tooltipProps,
  emits: [...tooltipEmits],
  setup(props, { emit, slots, attrs }) {
    let popper: Instance | null

    const wrapperRef = ref<HTMLElement>()
    const contentRef = ref<ComponentInstance>()

    const open = ref(false)
    const toggleReason = ref<Event>()

    // 创建Tooltip模型切换
    const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
      indicator: open,
      toggleReason
    })

    // 延时切换
    const { onOpen, onClose } = useDelayedToggle({
      showAfter: toRef(props, 'showAfter'),
      hideAfter: toRef(props, 'hideAfter'),
      open: show,
      close: hide
    })

    // 显示切换
    const onToggle = (event?: Event) => {
      unref(open) ? onClose(event) : onOpen(event)
    }

    // 是否显示弹窗
    const shouldShow = computed(() => (props.disabled ? false : unref(open)))

    // 判断是不是受控组件
    const controlled = computed(
      () => isBoolean(props.visible) && !hasUpdateHandler.value
    )

    // 元素是否聚焦
    const isFocusInsideContent = () => {
      const popperContent: HTMLElement | undefined =
        contentRef.value?.popupRef.value

      return popperContent && popperContent.contains(document.activeElement)
    }

    // 获取Tooltip的配置信息
    const getTooltipOptions = () => ({
      placement: props.placement,
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        },
        extend({}, offsetModifier, {
          options: {
            offset: props.offset
          }
        })
      ]
    })

    // 创建Popper实例
    const createPopperInstance = () => {
      if (wrapperRef.value && contentRef.value) {
        return createPopper(
          wrapperRef.value,
          contentRef.value.popupRef.value,
          getTooltipOptions()
        )
      }
      return null
    }

    // 更新Popper实例
    const updatePopper = () => {
      nextTick(() => {
        if (!open.value) {
          return
        }

        if (!popper) {
          popper = createPopperInstance()
        } else {
          popper.setOptions(getTooltipOptions())
        }
      })
    }

    // 受控或禁用时停止
    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true
      }
    }

    const trigger = toRef(props, 'trigger')

    // 点击事件
    const onClickWrapper = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'click', (e) => {
        if ((e as MouseEvent).button === 0) {
          onToggle(e)
        }
      })
    )

    // 鼠标移入
    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onOpen)
    )

    // 鼠标移出
    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onClose)
    )

    // 获得焦点
    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onOpen)
    )

    // 失去焦点
    const onBlur = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onClose)
    )

    const onContextMenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'contextmenu', (e: Event) => {
        e.preventDefault()
        onToggle(e)
      })
    )

    const onKeydown = composeEventHandlers(
      stopWhenControlledOrDisabled,
      (e: KeyboardEvent) => {
        const { code } = e
        if (props.triggerKeys.includes(code)) {
          e.preventDefault()
          onToggle(e)
        }
      }
    )

    const stopWhenControlled = () => {
      if (unref(controlled)) return true
    }

    // 鼠标是否可进入到 tooltip 中
    const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && unref(trigger) === 'hover') {
        onOpen()
      }
    })

    const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
      if (unref(trigger) === 'hover') {
        onClose()
      }
    })

    const onTransitionLeave = () => {
      emit('hide', toggleReason.value)
    }

    const onBeforeEnter = () => {
      updatePopper()
      emit('before-show', toggleReason.value)
    }

    let stopHandle: ReturnType<typeof onClickOutside>

    const onAfterShow = () => {
      emit('show', toggleReason.value)
      stopHandle = onClickOutside(
        computed(() => contentRef.value?.popupRef),
        () => {
          if (unref(controlled)) return
          const $trigger = unref(trigger)
          if ($trigger !== 'hover') {
            onClose()
          }
        }
      )
    }

    watch(
      () => unref(open),
      (val) => {
        if (!val) stopHandle?.()
      },
      { flush: 'post' }
    )

    const onBeforeLeave = () => {
      emit('before-hide', toggleReason.value)
    }

    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled && open.value) {
          open.value = false
        }
      }
    )

    const onClickAway = () => {
      const flag = stopWhenControlledOrDisabled()
      if (
        open.value &&
        props.closeOnClickOutside &&
        (!props.overlay || props.closeOnClickOverlay) &&
        !flag
      ) {
        open.value = false
      }
    }

    useExpose({
      contentRef,
      isFocusInsideContent,
      updatePopper, //  更新组件实例
      onOpen,
      onClose,
      hide
    })

    // 从 A 组件，切换到 B 组件，A 组件消失时执行；
    onDeactivated(() => open.value && hide())

    // 属性值发生变化时，更新实例
    watch(
      () => [open.value, props.offset, props.content, props.placement],
      updatePopper
    )

    // 监听点击元素外部的事件。
    useClickAway([wrapperRef], onClickAway, { eventName: 'click' })

    return () => (
      <>
        <span
          ref={wrapperRef}
          class={bem('wrapper')}
          onClick={onClickWrapper}
          onMouseenter={onMouseenter}
          onMouseleave={onMouseleave}
          onFocus={onFocus}
          onBlur={onBlur}
          onContextmenu={onContextMenu}
          onKeydown={onKeydown}
        >
          {slots.default?.()}
        </span>
        <Popup
          ref={contentRef}
          show={shouldShow.value}
          class={bem([props.theme])}
          position={''}
          transition={props.transition}
          lockScroll={false}
          {...attrs}
          {...pick(props, popupProps)}
          onAfterLeave={onTransitionLeave}
          onBeforeEnter={onBeforeEnter}
          onAfterEnter={onAfterShow}
          onBeforeLeave={onBeforeLeave}
          onMouseenter={onContentEnter}
          onMouseleave={onContentLeave}
        >
          {props.showArrow && <div class={bem('arrow')} />}
          <div role="menu" class={bem('content')}>
            {slots.content ? (
              slots.content()
            ) : props.rawContent ? (
              <span innerHTML={String(props.content)}></span>
            ) : (
              <span>{props.content}</span>
            )}
          </div>
        </Popup>
      </>
    )
  }
})
