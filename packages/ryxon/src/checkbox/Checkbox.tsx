import { computed, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { createNamespace, extend, pick, truthProp } from '../utils'
import { CHECKBOX_GROUP_KEY } from '../checkbox-group/CheckboxGroup'

// Composables
import { useParent, useCustomInputValue } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Components
import Checker, { checkerProps } from './Checker'

// Types
import type { CheckboxExpose } from './types'

const [, bem] = createNamespace('checkbox')

export const checkboxProps = extend({}, checkerProps, {
  bindGroup: truthProp
})

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export default defineComponent({
  name: 'RCheckbox',
  props: checkboxProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const { parent } = useParent(CHECKBOX_GROUP_KEY)

    // 设置复选框组的值
    const setParentValue = (checked: boolean) => {
      const { name } = props
      const { modelValue } = parent!.props
      const value = modelValue.slice()

      if (checked) {
        if (!value.includes(name)) {
          value.push(name)

          // 更新值
          if (props.bindGroup) parent!.updateValue(value)
        }
      } else {
        const index = value.indexOf(name)

        if (index !== -1) {
          value.splice(index, 1)
          // 更新值
          if (props.bindGroup) parent!.updateValue(value)
        }
      }
    }

    const checked = computed(() => {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1
      }
      return !!props.modelValue
    })

    // 选项点击事件
    const toggle = (newValue = !checked.value) => {
      // 判断是不是与复选框组绑定
      if (parent && props.bindGroup) {
        setParentValue(newValue)
      } else {
        emit('update:modelValue', newValue)
        emit('change', newValue)
      }
    }

    useExpose<CheckboxExpose>({ toggle, props, checked })
    useCustomInputValue(() => props.modelValue)

    return () => (
      <Checker
        v-slots={pick(slots, ['default', 'icon'])}
        bem={bem}
        role="checkbox"
        parent={parent}
        checked={checked.value}
        onToggle={toggle}
        {...props}
      />
    )
  }
})
