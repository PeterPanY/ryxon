<template>
  <r-roving-focus-collection-item
    :id="id"
    :focusable="focusable"
    :active="active"
  >
    <slot />
  </r-roving-focus-collection-item>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  provide,
  ref,
  unref
} from 'vue'
import { useId } from '../composables/use-id'
import { composeEventHandlers } from '../utils'
import { EVENT_CODE } from '../constants'
import {
  RCollectionItem as RRovingFocusCollectionItem,
  ROVING_FOCUS_COLLECTION_INJECTION_KEY
} from './types'
import {
  ROVING_FOCUS_GROUP_INJECTION_KEY,
  ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY
} from './tokens'
import { focusFirst, getFocusIntent, reorderArray } from './utils'

export default defineComponent({
  components: {
    RRovingFocusCollectionItem
  },
  props: {
    focusable: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['mousedown', 'focus', 'keydown'],
  setup(props, { emit }) {
    const { currentTabbedId, loop, onItemFocus, onItemShiftTab } = inject(
      ROVING_FOCUS_GROUP_INJECTION_KEY,
      undefined
    )!

    const { getItems } = inject(
      ROVING_FOCUS_COLLECTION_INJECTION_KEY,
      undefined
    )!

    const id = useId()
    const rovingFocusGroupItemRef = ref<HTMLElement | null>(null)

    const handleMousedown = composeEventHandlers(
      (e: Event) => {
        emit('mousedown', e)
      },
      (e) => {
        if (!props.focusable) {
          e.preventDefault()
        } else {
          onItemFocus(unref(id))
        }
      }
    )

    const handleFocus = composeEventHandlers(
      (e: Event) => {
        emit('focus', e)
      },
      () => {
        onItemFocus(unref(id))
      }
    )

    const handleKeydown = composeEventHandlers(
      (e: Event) => {
        emit('keydown', e)
      },
      (e) => {
        const { key, shiftKey, target, currentTarget } = e as KeyboardEvent
        if (key === EVENT_CODE.tab && shiftKey) {
          onItemShiftTab()
          return
        }
        if (target !== currentTarget) return
        const focusIntent = getFocusIntent(e as KeyboardEvent)

        if (focusIntent) {
          e.preventDefault()
          const items = getItems<typeof props>().filter(
            (item) => item.focusable
          )

          let elements = items.map((item) => item.ref!)

          switch (focusIntent) {
            case 'last': {
              elements.reverse()
              break
            }
            case 'prev':
            case 'next': {
              if (focusIntent === 'prev') {
                elements.reverse()
              }
              const currentIdx = elements.indexOf(currentTarget as HTMLElement)
              elements = loop.value
                ? reorderArray(elements, currentIdx + 1)
                : elements.slice(currentIdx + 1)
              break
            }
            default: {
              break
            }
          }

          nextTick(() => {
            focusFirst(elements)
          })
        }
      }
    )

    const isCurrentTab = computed(() => currentTabbedId.value === unref(id))

    provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: computed(() => (unref(isCurrentTab) ? 0 : -1)),
      handleMousedown,
      handleFocus,
      handleKeydown
    })

    return {
      id,
      handleKeydown,
      handleFocus,
      handleMousedown
    }
  }
})
</script>