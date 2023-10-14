// @ts-nocheck
import {
  ref,
  unref,
  toRef,
  inject,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  definePropType,
  makeStringProp,
  createNamespace,
  composeEventHandlers
} from '../utils'
import { whenTrigger } from './tooltip-utils'

// Components
import { useExpose } from '../composables/use-expose'
import RPopperTrigger from '../popup/trigger'

import { TooltipTrigger } from './types'
import { TOOLTIP_INJECTION_KEY } from './Tooltip'
import type { Measurable } from '../popup/types'
import type { OnlyChildExpose } from '../popup/only-child'

const [name] = createNamespace('tooltip-trigger')
const [, tooltipBem] = createNamespace('tooltip')

export const tooltipTriggerProps = {
  disabled: Boolean,
  trigger: makeStringProp<TooltipTrigger>('hover'),
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => ['Enter', 'Space']
  },
  virtualRef: {
    type: definePropType<Measurable>(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onMouseleave: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onClick: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onKeydown: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onFocus: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onBlur: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onContextmenu: {
    type: definePropType<(e: Event) => void>(Function)
  }
}

export type TooltipTriggerProps = ExtractPropTypes<typeof tooltipTriggerProps>

export default defineComponent({
  name,
  props: tooltipTriggerProps,
  emits: [],
  setup(props, { slots }) {
    const { controlled, id, open, onOpen, onClose, onToggle } = inject(
      TOOLTIP_INJECTION_KEY,
      undefined
    )!

    const triggerRef = ref<OnlyChildExpose | null>(null)

    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true
      }
    }

    const trigger = toRef(props, 'trigger')

    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onOpen)
    )
    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onClose)
    )
    const onClick = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'click', (e) => {
        // distinguish left click
        if ((e as MouseEvent).button === 0) {
          onToggle(e)
        }
      })
    )

    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onOpen)
    )

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

    useExpose({ triggerRef })

    return () => (
      <RPopperTrigger
        id={id.value}
        virtual-ref={props.virtualRef}
        open={open.value}
        virtualTriggering={props.virtualTriggering}
        class={tooltipBem('wrapper')}
        onBlur={onBlur}
        onClick={onClick}
        onContextmenu={onContextMenu}
        onFocus={onFocus}
        onMouseenter={onMouseenter}
        onMouseleave={onMouseleave}
        onKeydown={onKeydown}
      >
        {slots.default?.()}
      </RPopperTrigger>
    )
  }
})
