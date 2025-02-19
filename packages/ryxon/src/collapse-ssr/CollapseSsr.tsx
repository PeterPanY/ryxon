import { defineComponent, type ExtractPropTypes } from 'vue'
import { extend, makeArrayProp, type Numeric } from '@ryxon/utils'
import { createNamespace, BORDER_TOP_BOTTOM } from '../utils'
import { useExpose } from '../composables/use-expose'
import CollapseItemSsr from './CollapseItemSsr'
import { collapseProps } from '../collapse'
import { validateModelValue } from '../collapse/utils'
import type { CollapseToggleAllOptions } from '../collapse'
import type { CollapseSsrItem } from './types'

const [name] = createNamespace('collapse-ssr')
const [, bem] = createNamespace('collapse')

export const collapseSsrProps = extend({}, collapseProps, {
  items: makeArrayProp<CollapseSsrItem>()
})

export type CollapseSsrProps = ExtractPropTypes<typeof collapseSsrProps>

export default defineComponent({
  name,

  props: collapseSsrProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const updateName = (name: Numeric | Numeric[]) => {
      emit('change', name)
      emit('update:modelValue', name)
    }

    const isExpanded = (name: Numeric) => {
      const { accordion, modelValue } = props

      if (
        process.env.NODE_ENV !== 'production' &&
        !validateModelValue(modelValue, accordion)
      ) {
        return false
      }

      return accordion
        ? modelValue === name
        : (modelValue as Numeric[]).includes(name)
    }

    const toggle = (name: Numeric, expanded: boolean) => {
      const { accordion, modelValue } = props
      if (accordion) {
        updateName(name === modelValue ? '' : name)
      } else if (expanded) {
        updateName((modelValue as Numeric[]).concat(name))
      } else {
        updateName(
          (modelValue as Numeric[]).filter((activeName) => activeName !== name)
        )
      }
    }

    const toggleAll = (options: boolean | CollapseToggleAllOptions = {}) => {
      if (props.accordion) {
        return
      }

      if (typeof options === 'boolean') {
        options = { expanded: options }
      }

      const { expanded, skipDisabled } = options!
      const expandedChildren = props.items.filter(
        (item: any, index: number) => {
          if (item.disabled && skipDisabled) {
            return item.expanded.value
          }
          return expanded ?? !isExpanded(item.name ?? index)
        }
      )

      const names = expandedChildren.map((item, index) => item.name ?? index)
      updateName(names)
    }

    useExpose({ toggle, toggleAll })

    return () => (
      <div class={[bem(), { [BORDER_TOP_BOTTOM]: props.border }]}>
        {props.items.map((item, index) => (
          <CollapseItemSsr
            v-slots={{
              default: slots.default
                ? () => slots.default?.({ item, index })
                : slots[`${item.name ?? index}-content`]
                  ? () =>
                      slots[`${item.name ?? index}-content`]?.({ item, index })
                  : null,
              icon: slots.icon ? () => slots.icon?.({ item, index }) : null,
              title: slots.title ? () => slots.title?.({ item, index }) : null,
              value: slots.value ? () => slots.value?.({ item, index }) : null,
              label: slots.label ? () => slots.label?.({ item, index }) : null,
              'right-icon': slots['right-icon']
                ? () => slots['right-icon']?.({ item, index })
                : null
            }}
            index={index}
            item={item}
            isExpanded={isExpanded}
            toggle={toggle}
          />
        ))}
      </div>
    )
  }
})
