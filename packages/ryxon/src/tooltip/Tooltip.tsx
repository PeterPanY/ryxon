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
  useTooltipModelToggleProps
} from './tooltip-utils'
import {
  useDelayedToggleProps,
  useDelayedToggle
} from '../composables/use-delayed-toggle'
import { useId } from '../composables/use-id'

// Utils
import {
  pick,
  extend,
  isBoolean,
  truthProp,
  makeStringProp,
  definePropType,
  composeEventHandlers,
  type ComponentInstance
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import { popupSharedProps } from '../popup/shared'
import { POPPER_INJECTION_KEY } from '../popup/types'

// Composables
import { useExpose } from '../composables/use-expose'
import {
  buildPopperOptions,
  eventListenerModifier,
  arrowModifier,
  usePopper
} from './use-popper'

// Components
import { Popup } from '../popup'
import RTooltipTrigger from './trigger'

// Types
import { TooltipTheme, TooltipTrigger, TooltipPlacement } from './types'
import type { TooltipProvide } from './types'
import type { Measurable, RoleTypes } from '../popup/types'
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
    virtualRef: {
      type: definePropType<Measurable>(Object)
    },
    virtualTriggering: Boolean,
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
    enterable: truthProp, // 鼠标是否可进入到 tooltip 中
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
    gpuAcceleration: { type: Boolean, default: false },
    role: makeStringProp<RoleTypes>('tooltip')
  }
)

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

export default defineComponent({
  name: 'RTooltip',
  props: tooltipProps,
  emits: [...tooltipEmits],
  setup(props, { emit, slots, attrs }) {
    let popper: Instance | null

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
    const triggerRef = ref<HTMLElement>()
    const updatePopper = () => {
      nextTick(() => {
        if (!open.value) {
          return
        }

        if (!popper) {
          // 创建Popper实例
          popper = createPopperInstance(
            triggerRef,
            contentRef.value?.popupRef,
            options.value
          )
        } else {
          popper.setOptions(options.value)
        }
      })
    }

    const trigger = toRef(props, 'trigger')

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
        computed(() => contentRef.value?.popupRef.value),
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

    const popperInstanceRef = ref<Instance>()
    const referenceRef = ref<HTMLElement>()
    const role = computed(() => props.role)

    provide(POPPER_INJECTION_KEY, {
      triggerRef,
      popperInstanceRef,
      contentRef: contentRef.value?.popupRef,
      referenceRef,
      role
    })

    const id = useId()

    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      id: computed(() => id),
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
      () => [
        open.value,
        props.offset,
        props.content,
        props.placement,
        triggerRef.value
      ],
      updatePopper,
      { deep: true }
    )

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
        <RTooltipTrigger
          disabled={props.disabled}
          trigger={props.trigger}
          trigger-keys={props.triggerKeys}
          virtual-ref={props.virtualRef}
          virtual-triggering={props.virtualTriggering}
        >
          {slots.default?.()}
        </RTooltipTrigger>
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
