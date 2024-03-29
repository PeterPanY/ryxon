import {
  watch,
  defineComponent,
  type InjectionKey,
  type ExtractPropTypes
} from 'vue'

// Utils
import { numericProp, makeArrayProp, makeStringProp } from '@ryxon/utils'
import { createNamespace } from '../utils'

// Composables
import { useChildren, useCustomInputValue } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Types
import type {
  CheckboxGroupExpose,
  CheckboxGroupProvide,
  CheckboxGroupToggleAllOptions
} from './types'
import { CheckboxSize } from '../checkbox/types'

const [name, bem] = createNamespace('checkbox-group')

export const checkboxGroupProps = {
  max: numericProp,
  min: numericProp,
  size: makeStringProp<CheckboxSize>(''),
  disabled: Boolean,
  iconSize: numericProp,
  modelValue: makeArrayProp<unknown>(),
  checkedColor: String
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupProvide> =
  Symbol(name)

export default defineComponent({
  name,

  props: checkboxGroupProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { children, linkChildren } = useChildren(CHECKBOX_GROUP_KEY)

    const updateValue = (value: unknown[]) => emit('update:modelValue', value)

    // 切换所有多选框
    const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
      if (typeof options === 'boolean') {
        options = { checked: options }
      }

      const { checked, skipDisabled } = options

      const checkedChildren = children.filter((item: any) => {
        if (!item.props.bindGroup) {
          return false
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value
        }
        return checked ?? !item.checked.value
      })

      const names = checkedChildren.map((item: any) => item.name)
      updateValue(names)
    }

    watch(
      () => props.modelValue,
      (value) => emit('change', value)
    )

    useExpose<CheckboxGroupExpose>({ toggleAll })
    useCustomInputValue(() => props.modelValue)
    linkChildren({
      props,
      updateValue
    })

    return () => <div class={bem()}>{slots.default?.()}</div>
  }
})
