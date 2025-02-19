import {
  defineComponent,
  type PropType,
  type InjectionKey,
  type ExtractPropTypes
} from 'vue'
import { truthProp, type Numeric } from '@ryxon/utils'
import { createNamespace, BORDER_TOP_BOTTOM } from '../utils'
import { useChildren } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'
import { validateModelValue } from './utils'
import type { CollapseProvide, CollapseToggleAllOptions } from './types'

const [name, bem] = createNamespace('collapse')

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol(name)

export const collapseProps = {
  border: truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array] as PropType<Numeric | Numeric[]>,
    default: ''
  }
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export default defineComponent({
  name,

  props: collapseProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { linkChildren, children } = useChildren(COLLAPSE_KEY)

    const updateName = (name: Numeric | Numeric[]) => {
      emit('change', name)
      emit('update:modelValue', name)
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
      const expandedChildren = children.filter((item: any) => {
        if (item.disabled && skipDisabled) {
          return item.expanded.value
        }
        return expanded ?? !item.expanded.value
      })

      const names = expandedChildren.map((item) => item.itemName.value)
      updateName(names)
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
    useExpose({ toggleAll })
    linkChildren({ toggle, isExpanded })

    return () => (
      <div class={[bem(), { [BORDER_TOP_BOTTOM]: props.border }]}>
        {slots.default?.()}
      </div>
    )
  }
})
