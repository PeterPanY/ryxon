// @ts-nocheck
import {
  inject,
  unref,
  computed,
  defineComponent,
  type ExtractPropTypes
} from 'vue'
import {
  composeRefs,
  definePropType,
  createNamespace,
  composeEventHandlers
} from '../utils'
import { useDropdown } from '../dropdown/use-dropdown'
import { EVENT_CODE } from '../constants'
import {
  LAST_KEYS,
  FIRST_LAST_KEYS,
  DROPDOWN_INJECTION_KEY,
  DROPDOWN_COLLECTION_INJECTION_KEY
} from '../dropdown/types'
import {
  ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  ROVING_FOCUS_GROUP_INJECTION_KEY,
  focusFirst
} from '../roving-focus-group'

const [name, bem] = createNamespace('dropdown-menu')

export const dropdownMenuProps = {
  onKeydown: { type: definePropType<(e: KeyboardEvent) => void>(Function) }
}

export type DropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>

export default defineComponent({
  name,

  props: dropdownMenuProps,

  setup(props, { slots }) {
    const { _rDropdownSize } = useDropdown()
    const size = _rDropdownSize.value

    const { contentRef, role, triggerId } = inject(
      DROPDOWN_INJECTION_KEY,
      undefined
    )!

    const { collectionRef: dropdownCollectionRef, getItems } = inject(
      DROPDOWN_COLLECTION_INJECTION_KEY,
      undefined
    )!

    const {
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      tabIndex,
      onBlur,
      onFocus,
      onMousedown
    } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, undefined)!

    const { collectionRef: rovingFocusGroupCollectionRef } = inject(
      ROVING_FOCUS_COLLECTION_INJECTION_KEY,
      undefined
    )!

    const dropdownListWrapperRef = composeRefs(
      contentRef,
      dropdownCollectionRef,
      //   focusTrapRef,
      rovingFocusGroupRef,
      rovingFocusGroupCollectionRef
    )

    const dropdownKls = computed(() => [bem(), bem(`${size?.value}`)])

    const composedKeydown = composeEventHandlers(
      (e: KeyboardEvent) => {
        props.onKeydown?.(e)
      },
      (e) => {
        const { currentTarget, code, target } = e
        const isKeydownContained = (currentTarget as Node).contains(
          target as Node
        )

        if (isKeydownContained) {
          // TODO: implement typeahead search
        }

        if (EVENT_CODE.tab === code) {
          e.stopImmediatePropagation()
        }

        e.preventDefault()

        if (target !== unref(contentRef)) return
        if (!FIRST_LAST_KEYS.includes(code)) return
        const items = getItems<{ disabled: boolean }>().filter(
          (item) => !item.disabled
        )
        const targets = items.map((item) => item.ref!)
        if (LAST_KEYS.includes(code)) {
          targets.reverse()
        }
        focusFirst(targets)
      }
    )

    const handleKeydown = (e: KeyboardEvent) => {
      composedKeydown(e)
      // onKeydown(e)
    }

    return () => (
      <ul
        ref={dropdownListWrapperRef}
        class={dropdownKls.value}
        style={rovingFocusGroupRootStyle.value}
        tabindex={tabIndex.value}
        role={role.value}
        aria-labelledby={triggerId.value}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeydown={handleKeydown}
        onMousedown={onMousedown}
      >
        {slots.default?.()}
      </ul>
    )
  }
})
