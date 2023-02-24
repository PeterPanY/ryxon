import {
  watch,
  defineComponent,
  type InjectionKey,
  type ExtractPropTypes
} from 'vue'
import {
  unknownProp,
  numericProp,
  makeStringProp,
  createNamespace
} from '../utils'
import { useChildren, useCustomInputValue } from '@ryxon/use'
import { CheckboxSize } from '../checkbox/types'

const [name, bem] = createNamespace('radio-group')

export const radioGroupProps = {
  disabled: Boolean,
  iconSize: numericProp,
  modelValue: unknownProp,
  checkedColor: String,
  size: makeStringProp<CheckboxSize>('')
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export type RadioGroupProvide = {
  props: RadioGroupProps
  updateValue: (value: unknown) => void
}

export const RADIO_KEY: InjectionKey<RadioGroupProvide> = Symbol(name)

export default defineComponent({
  name,

  props: radioGroupProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(RADIO_KEY)

    const updateValue = (value: unknown) => emit('update:modelValue', value)

    watch(
      () => props.modelValue,
      (value) => emit('change', value)
    )

    linkChildren({
      props,
      updateValue
    })

    useCustomInputValue(() => props.modelValue)

    return () => (
      <div class={bem()} role="radiogroup">
        {slots.default?.()}
      </div>
    )
  }
})
