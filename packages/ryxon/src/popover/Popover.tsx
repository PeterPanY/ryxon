import {
  h,
  ref,
  computed,
  defineComponent,
  type PropType,
  type CSSProperties,
  type TeleportProps,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  pick,
  extend,
  addUnit,
  truthProp,
  unknownProp,
  BORDER_RIGHT,
  BORDER_BOTTOM,
  makeArrayProp,
  definePropType,
  makeStringProp,
  createNamespace
} from '../utils'

// Composables
import { useScopeId } from '../composables/use-scope-id'
import { useExpose } from '../composables/use-expose'

// Components
import { Icon } from '../icon'
import { Tooltip } from '../tooltip'

// Types
import type { Options } from '@popperjs/core'
import {
  PopoverTheme,
  PopoverAction,
  PopoverActionsDirection,
  PopoverTrigger,
  PopoverPlacement
} from './types'

const [name, bem] = createNamespace('popover')

const popupProps = [
  'theme',
  'offset',
  'trigger',
  'teleport',
  'disabled',
  'showArrow',
  'placement',
  'showAfter',
  'hideAfter',
  'autoClose',
  'enterable',
  'persistent',
  'popperOptions',
  'closeOnClickOutside'
] as const

export const popoverProps = {
  visible: { type: definePropType<boolean | null>(Boolean), default: null },
  theme: makeStringProp<PopoverTheme>('light'),
  actions: makeArrayProp<PopoverAction>(),
  actionsDirection: makeStringProp<PopoverActionsDirection>('vertical'),
  trigger: makeStringProp<PopoverTrigger>('click'),
  showArrow: truthProp,
  placement: makeStringProp<PopoverPlacement>('bottom'),
  iconPrefix: String,
  width: { type: [String, Number], default: 150 },
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 8]
  },
  showAfter: { type: Number, default: 0 },
  hideAfter: { type: Number, default: 200 },
  autoClose: { type: Number, default: 0 },
  enterable: truthProp,
  closeOnClickOutside: truthProp,
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },
  disabled: { type: Boolean }, // Tooltip 组件是否禁用
  popperClass: unknownProp,
  popperStyle: Object as PropType<CSSProperties>,
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({})
  },
  persistent: truthProp,
  'onUpdate:visible': {
    type: Function as PropType<(visible: boolean) => void>
  }
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export default defineComponent({
  name,

  props: popoverProps,

  emits: [
    'select',
    'update:visible',
    'before-enter',
    'before-leave',
    'after-enter',
    'after-leave'
  ],

  setup(props, { emit, slots, attrs }) {
    const onClickAction = (action: PopoverAction, index: number) => {
      if (action.disabled) {
        return
      }

      emit('select', action, index)
    }

    const renderActionContent = (action: PopoverAction, index: number) => {
      if (slots.action) {
        return slots.action({ action, index })
      }

      const isString = typeof action.icon === 'string'

      return [
        action.icon && (
          <Icon
            name={isString ? action.icon : ''}
            classPrefix={props.iconPrefix}
            class={bem('action-icon')}
          >
            {!isString && h(action.icon)}
          </Icon>
        ),
        <div
          class={[
            bem('action-text'),
            { [BORDER_BOTTOM]: props.actionsDirection === 'vertical' }
          ]}
        >
          {action.text}
        </div>
      ]
    }

    const renderAction = (action: PopoverAction, index: number) => {
      const { icon, color, disabled, className } = action
      return (
        <div
          role="menuitem"
          class={[
            bem('action', { disabled, 'with-icon': icon }),
            { [BORDER_RIGHT]: props.actionsDirection === 'horizontal' },
            className
          ]}
          style={{ color }}
          tabindex={disabled ? undefined : 0}
          aria-disabled={disabled || undefined}
          onClick={() => onClickAction(action, index)}
        >
          {renderActionContent(action, index)}
        </div>
      )
    }

    const rendercontentontent = {
      content: () => (
        <div role="menu" class={bem('content', props.actionsDirection)}>
          {slots.default ? slots.default() : props.actions.map(renderAction)}
        </div>
      ),
      default: () => slots.reference?.()
    }

    const kls = computed(() => {
      return [
        bem({
          plain: props.actions && props.actions.length > 0
        }),
        props.popperClass!
      ]
    })

    const style = computed(() =>
      extend({}, { width: addUnit(props.width) }, props.popperStyle!)
    )

    const beforeEnter = () => {
      emit('before-enter')
    }

    const beforeLeave = () => {
      emit('before-leave')
    }

    const afterEnter = () => {
      emit('after-enter')
    }

    const afterLeave = () => {
      emit('update:visible', false)
      emit('after-leave')
    }

    const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null)

    const hide = () => {
      tooltipRef.value?.hide()
    }

    useExpose({
      hide,
      contentRef: tooltipRef
    })

    const updateEventKeyRaw = `onUpdate:visible` as const
    const onUpdateVisible = computed(() => {
      return props[updateEventKeyRaw]
    })

    return () => (
      <Tooltip
        ref={tooltipRef}
        v-slots={rendercontentontent}
        {...attrs}
        {...useScopeId()}
        visible={props.visible}
        transition="r-popover-zoom"
        popperClass={kls.value}
        popperStyle={style.value}
        {...pick(props, popupProps)}
        onBeforeShow={beforeEnter}
        onBeforeHide={beforeLeave}
        onHide={afterLeave}
        onShow={afterEnter}
        onUpdate:visible={onUpdateVisible.value}
      ></Tooltip>
    )
  }
})
