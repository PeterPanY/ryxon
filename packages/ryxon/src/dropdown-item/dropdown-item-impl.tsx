// @ts-nocheck
import { h, inject, computed, defineComponent } from 'vue'
import {
  extend,
  isString,
  composeRefs,
  composeEventHandlers
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import { dropdownItemProps } from './props'
import { EVENT_CODE } from '../constants'
import { Icon } from '../icon'
import {
  DROPDOWN_INJECTION_KEY,
  DROPDOWN_COLLECTION_ITEM_INJECTION_KEY
} from '../dropdown/types'
import {
  ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY,
  ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY
} from '../roving-focus-group'
import { COLLECTION_ITEM_SIGN } from '../collection'

const [, bem, , isBem] = createNamespace('dropdown-menu-item')

export default defineComponent({
  name: 'RDropdownItemImpl',
  props: dropdownItemProps,
  emits: ['pointermove', 'pointerleave', 'click', 'clickimpl'],
  setup(props, { slots, emit, attrs }) {
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, undefined)!

    const { collectionItemRef: dropdownCollectionItemRef } = inject(
      DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
      undefined
    )!

    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(
      ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
      undefined
    )!

    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, undefined)!

    const itemRef = composeRefs(
      dropdownCollectionItemRef,
      rovingFocusCollectionItemRef,
      rovingFocusGroupItemRef
    )

    const role = computed<string>(() => {
      if (menuRole.value === 'menu') {
        return 'menuitem'
      }
      if (menuRole.value === 'navigation') {
        return 'link'
      }
      return 'button'
    })

    const handleKeydown = composeEventHandlers((e: KeyboardEvent) => {
      const { code } = e
      if (code === EVENT_CODE.enter || code === EVENT_CODE.space) {
        e.preventDefault()
        e.stopImmediatePropagation()
        emit('clickimpl', e)
        return true
      }
    }, handleItemKeydown)

    const dataset = {
      [COLLECTION_ITEM_SIGN]: ''
    }

    return () => (
      <>
        {props.divided && (
          <li role="separator" class={bem('divided')} {...attrs}></li>
        )}
        <li
          ref={itemRef}
          {...extend({}, dataset, attrs)}
          aria-disabled={props.disabled}
          class={[bem(), isBem('disabled', props.disabled)]}
          tabindex={tabIndex.value}
          role={role.value}
          onClick={(e) => emit('clickimpl', e)}
          onFocus={handleFocus}
          onKeydown={handleKeydown}
          onMousedown={handleMousedown}
          onPointermove={(e) => emit('pointermove', e)}
          onPointerleave={(e) => emit('pointerleave', e)}
        >
          {props.icon && (
            <Icon name={isString(props.icon) ? props.icon : ''}>
              {!isString(props.icon) && h(props.icon)}
            </Icon>
          )}
          {slots.default?.()}
        </li>
      </>
    )
  }
})
