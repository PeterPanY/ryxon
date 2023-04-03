// @ts-nocheck
import {
  ref,
  unref,
  inject,
  computed,
  defineComponent,
  getCurrentInstance
} from 'vue'
import {
  extend,
  whenMouse,
  createNamespace,
  composeEventHandlers
} from '../utils'
import { RRovingFocusItem } from '../roving-focus-group'
import RDropdownItemImpl from './dropdown-item-impl'
import {
  DROPDOWN_INJECTION_KEY,
  RCollectionItem as RDropdownCollectionItem
} from '../dropdown/types'
import { useDropdown } from '../dropdown/use-dropdown'
import { dropdownItemProps } from './props'

const [name] = createNamespace('dropdown-item')

export default defineComponent({
  name,
  props: dropdownItemProps,
  emits: ['pointermove', 'pointerleave', 'click'],
  setup(props, { slots, emit, attrs }) {
    const { rDropdown } = useDropdown()
    const _instance = getCurrentInstance()
    const itemRef = ref<HTMLElement | null>(null)
    const textContent = computed(() => unref(itemRef)?.textContent ?? '')
    const { onItemEnter, onItemLeave } = inject(
      DROPDOWN_INJECTION_KEY,
      undefined
    )!

    // direct usage of v-bind={ ...$props, ...$attrs } causes type errors
    const propsAndAttrs = computed(() => extend({}, props, attrs))

    const handlePointerLeave = composeEventHandlers(
      (e: PointerEvent) => {
        emit('pointerleave', e)
        return e.defaultPrevented
      },
      whenMouse((e) => {
        onItemLeave(e)
      })
    )

    const handlePointerMove = composeEventHandlers(
      (e: PointerEvent) => {
        emit('pointermove', e)
        return e.defaultPrevented
      },
      whenMouse((e) => {
        if (props.disabled) {
          onItemLeave(e)
        } else {
          onItemEnter(e)
          if (!e.defaultPrevented) {
            ;(e.currentTarget as HTMLElement)?.focus()
          }
        }
      })
    )

    const handleClick = composeEventHandlers(
      (e: PointerEvent) => {
        if (props.disabled) {
          return
        }
        emit('click', e)
        return e.type !== 'keydown' && e.defaultPrevented
      },
      (e) => {
        if (props.disabled) {
          e.stopImmediatePropagation()
          return
        }
        if (rDropdown?.hideOnClick?.value) {
          rDropdown.handleClick?.()
        }
        rDropdown.commandHandler?.(props.command, _instance, e)
      }
    )

    return () => (
      <RDropdownCollectionItem
        disabled={props.disabled}
        text-value={props.textValue ?? textContent.value}
      >
        <RRovingFocusItem focusable={!props.disabled}>
          <RDropdownItemImpl
            {...propsAndAttrs.value}
            onPointerleave={handlePointerLeave}
            onPointermove={handlePointerMove}
            onClickimpl={handleClick}
          >
            {slots.default?.()}
          </RDropdownItemImpl>
        </RRovingFocusItem>
      </RDropdownCollectionItem>
    )
  }
})
