// @ts-nocheck
import {
  toRefs,
  reactive,
  nextTick,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance,
  type ExtractPropTypes
} from 'vue'

import { createNamespace } from '../utils'
import { useOption } from './useOption'
import type { SelectOptionProxy } from './token'

const [, bem, , isBem] = createNamespace('select-dropdown')

// 传值
export const optionProps = {
  value: { required: true, type: [String, Number, Boolean, Object] },
  label: [String, Number],
  created: Boolean,
  disabled: { type: Boolean, default: false }
}

// 传参数据类型
export type OptionProps = ExtractPropTypes<typeof optionProps>

export default defineComponent({
  name: 'ROption',
  componentName: 'ROption',
  props: optionProps,
  setup(props, { slots }) {
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    })

    const { currentLabel, itemSelected, isDisabled, select, hoverItem } =
      useOption(props, states)

    const { visible } = toRefs(states)

    const vm = getCurrentInstance()?.proxy
    vm.currentLabel = currentLabel.value
    vm.isDisabled = isDisabled.value

    select.onOptionCreate(vm as unknown as SelectOptionProxy)

    onBeforeUnmount(() => {
      const key = (vm as unknown as SelectOptionProxy).value
      const { selected } = select
      const selectedOptions = select.props.multiple ? selected : [selected]
      const doesSelected = selectedOptions.some(
        (item) => item.value === (vm as unknown as SelectOptionProxy).value
      )
      // if option is not selected, remove it from cache
      nextTick(() => {
        if (select.cachedOptions.get(key) === vm && !doesSelected) {
          select.cachedOptions.delete(key)
        }
      })
      select.onOptionDestroy(key, vm)
    })

    // 选中或者取消选项
    function selectOptionClick() {
      if (props.disabled !== true && states.groupDisabled !== true) {
        select.handleOptionSelect(vm, true)
      }
    }

    return () => (
      <li
        v-show={visible.value}
        class={[
          bem('item'),
          isBem('disabled', isDisabled.value),
          {
            selected: itemSelected.value,
            hover: select.optionsArray.indexOf(vm) === select.hoverIndex
          }
        ]}
        onMouseenter={hoverItem}
        onClick={selectOptionClick}
      >
        {slots.default ? slots.default() : <span>{currentLabel.value}</span>}
      </li>
    )
  }
})
