import {
  watch,
  inject,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  type WatchStopHandle,
  type ExtractPropTypes
} from 'vue'

// Utils
import { unrefElement } from '@vueuse/core'
import { isNil } from 'lodash-unified'
import { isElement, definePropType } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { POPPER_INJECTION_KEY } from './types'
import { useExpose } from '../composables/use-expose'

// Composables
import { OnlyChild } from './only-child'
import { useForwardRef } from '../composables/use-forward-ref'

// Components
import type { Measurable } from './types'

export const popperTriggerProps = {
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
  },
  id: String,
  open: Boolean
}

export type PopperTriggerProps = ExtractPropTypes<typeof popperTriggerProps>

const [name] = createNamespace('popper-trigger')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: popperTriggerProps,

  setup(props, { attrs, slots }) {
    const { role, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!

    useForwardRef(triggerRef)

    const ariaControls = computed<string | undefined>(() => {
      return ariaHaspopup.value ? props.id : undefined
    })

    const ariaDescribedby = computed<string | undefined>(() => {
      if (role && role.value === 'tooltip') {
        return props.open && props.id ? props.id : undefined
      }
      return undefined
    })

    const ariaHaspopup = computed<string | undefined>(() => {
      if (role && role.value !== 'tooltip') {
        return role.value
      }
      return undefined
    })

    const ariaExpanded = computed<string | undefined>(() => {
      return ariaHaspopup.value ? `${props.open}` : undefined
    })

    let virtualTriggerAriaStopWatch: WatchStopHandle | undefined = undefined

    onMounted(() => {
      watch(
        () => props.virtualRef,
        (virtualEl) => {
          if (virtualEl) {
            triggerRef.value = unrefElement(virtualEl as HTMLElement)
          }
        },
        {
          immediate: true
        }
      )

      watch(
        triggerRef,
        (el, prevEl) => {
          virtualTriggerAriaStopWatch?.()
          virtualTriggerAriaStopWatch = undefined
          if (isElement(el)) {
            ;(
              [
                'onMouseenter',
                'onMouseleave',
                'onClick',
                'onKeydown',
                'onFocus',
                'onBlur',
                'onContextmenu'
              ] as const
            ).forEach((eventName) => {
              const handler = props[eventName]
              if (handler) {
                ;(el as HTMLElement).addEventListener(
                  eventName.slice(2).toLowerCase(),
                  handler
                )
                ;(prevEl as HTMLElement)?.removeEventListener?.(
                  eventName.slice(2).toLowerCase(),
                  handler
                )
              }
            })
            virtualTriggerAriaStopWatch = watch(
              [ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded],
              (watches) => {
                ;[
                  'aria-controls',
                  'aria-describedby',
                  'aria-haspopup',
                  'aria-expanded'
                ].forEach((key, idx) => {
                  isNil(watches[idx])
                    ? el.removeAttribute(key)
                    : el.setAttribute(key, watches[idx]!)
                })
              },
              { immediate: true }
            )
          }
          if (isElement(prevEl)) {
            ;[
              'aria-controls',
              'aria-describedby',
              'aria-haspopup',
              'aria-expanded'
            ].forEach((key) => prevEl.removeAttribute(key))
          }
        },
        {
          immediate: true
        }
      )
    })

    onBeforeUnmount(() => {
      virtualTriggerAriaStopWatch?.()
      virtualTriggerAriaStopWatch = undefined
    })

    useExpose({
      triggerRef
    })

    return () =>
      !props.virtualTriggering && (
        <OnlyChild
          {...attrs}
          aria-controls={ariaControls.value}
          aria-describedby={ariaDescribedby.value}
          aria-expanded={ariaExpanded.value}
          aria-haspopup={ariaHaspopup.value}
        >
          {slots.default?.()}
        </OnlyChild>
      )
  }
})
