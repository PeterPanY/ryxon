import {
  ref,
  toRef,
  unref,
  watch,
  provide,
  readonly,
  computed,
  nextTick,
  InjectionKey,
  onDeactivated,
  defineComponent,
  type PropType,
  type TeleportProps,
  type ExtractPropTypes
} from 'vue'
import { onClickOutside } from '@vueuse/core'
import {
  tooltipEmits,
  useTooltipModelToggle,
  useTooltipModelToggleProps,
  whenTrigger
} from './tooltip-utils'
import {
  useDelayedToggleProps,
  useDelayedToggle
} from '../composables/use-delayed-toggle'

// Utils
import {
  pick,
  extend,
  isBoolean,
  truthProp,
  makeStringProp,
  definePropType,
  createNamespace,
  composeEventHandlers,
  type ComponentInstance
} from '../utils'
import { popupSharedProps } from '../popup/shared'

// Composables
import { useClickAway } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'
import {
  buildPopperOptions,
  eventListenerModifier,
  arrowModifier,
  usePopper
} from './use-popper'

// Components
import { Popup } from '../popup'

// Types
import { TooltipTheme, TooltipTrigger, TooltipPlacement } from './types'
import type { TooltipProvide } from './types'
import type {
  Instance,
  Options,
  Placement,
  PositioningStrategy
} from '@popperjs/core'

const [, bem] = createNamespace('tooltip')

export const TOOLTIP_INJECTION_KEY: InjectionKey<TooltipProvide> =
  Symbol('rTooltip')

const popupProps = [
  'duration',
  'teleport',
  'lazyRender',
  'beforeClose',
  'overlayStyle',
  'overlayClass',
  'popperClass',
  'popperStyle',
  'transitionAppear',
  'closeOnClickOverlay'
] as const

export const tooltipProps = extend(
  {},
  popupSharedProps,
  useDelayedToggleProps,
  useTooltipModelToggleProps,
  {
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
    // 出现位置的偏移量
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [0, 8]
    },
    arrowOffset: { type: Number, default: 5 },
    transition: { type: String, default: 'r-tooltip-zoom' }, // 动画名称
    enterable: { type: Boolean, default: true }, // 鼠标是否可进入到 tooltip 中
    closeOnClickOutside: truthProp,
    teleport: {
      type: [String, Object] as PropType<TeleportProps['to']>,
      default: 'body'
    },
    persistent: Boolean,
    popperOptions: {
      type: definePropType<Partial<Options>>(Object),
      default: () => ({})
    },
    strategy: makeStringProp<PositioningStrategy>('absolute'),
    fallbackPlacements: {
      type: definePropType<Placement[]>(Array),
      default: undefined
    },
    gpuAcceleration: { type: Boolean, default: false }
  }
)

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
      autoClose: toRef(props, 'autoClose'),
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

    const { createPopperInstance } = usePopper()
    const arrowRef = ref<HTMLElement>()

    const options = computed(() => {
      return {
        // eslint-disable-next-line no-restricted-syntax
        ...buildPopperOptions(props, [
          arrowModifier.value(arrowRef, props.arrowOffset),
          eventListenerModifier.value(!!props.visible)
        ])
      }
    })

    // 更新Popper实例
    const updatePopper = () => {
      nextTick(() => {
        if (!open.value) {
          return
        }

        if (!popper) {
          // 创建Popper实例
          popper = createPopperInstance(
            wrapperRef,
            contentRef.value?.popupRef,
            options.value
          )
        } else {
          popper.setOptions(options.value)
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

    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      open: readonly(open),
      trigger: toRef(props, 'trigger'),
      onOpen: (event?: Event) => {
        onOpen(event)
      },
      onClose: (event?: Event) => {
        onClose(event)
      },
      onToggle: (event?: Event) => {
        if (unref(open)) {
          onClose(event)
        } else {
          onOpen(event)
        }
      },
      onShow: () => {
        emit('show', toggleReason.value)
      },
      onHide: () => {
        emit('hide', toggleReason.value)
      },
      onBeforeShow: () => {
        emit('before-show', toggleReason.value)
      },
      onBeforeHide: () => {
        emit('before-hide', toggleReason.value)
      },
      updatePopper
    })

    useExpose({
      contentRef,
      isFocusInsideContent,
      updatePopper, //  更新组件实例
      onOpen,
      onToggle,
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

    const persistentRef = computed(() => {
      // For testing, we would always want the content to be rendered
      // to the DOM, so we need to return true here.
      if (process.env.NODE_ENV === 'test') {
        return true
      }
      return props.persistent
    })

    const shouldRender = computed(() =>
      unref(persistentRef) ? true : unref(open)
    )

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
          class={[bem([props.theme])]}
          position={''}
          overlay={false}
          lockScroll={false}
          transition={props.transition}
          {...attrs}
          {...pick(props, popupProps)}
          onAfterLeave={onTransitionLeave}
          onBeforeEnter={onBeforeEnter}
          onAfterEnter={onAfterShow}
          onBeforeLeave={onBeforeLeave}
          onMouseenter={onContentEnter}
          onMouseleave={onContentLeave}
        >
          {shouldRender.value && props.showArrow && (
            <div ref={arrowRef} class={bem('arrow')} />
          )}
          {shouldRender.value && (
            <div role="menu" class={bem('content')}>
              {slots.content ? (
                slots.content()
              ) : props.rawContent ? (
                <span innerHTML={String(props.content)}></span>
              ) : (
                <span>{props.content}</span>
              )}
            </div>
          )}
        </Popup>
      </>
    )
  }
})
