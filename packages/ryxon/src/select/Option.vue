<template>
  <li
    v-show="visible"
    :class="[
      bem('item'),
      isBem('disabled', isDisabled),
      {
        selected: itemSelected,
        hover
      }
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script lang="ts">
// @ts-nocheck
import {
  toRefs,
  nextTick,
  reactive,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance
} from 'vue'
import { createNamespace } from '../utils'
import { useOption } from './useOption'
import { optionProps } from './option'
import type { SelectOptionProxy } from './token'

export default defineComponent({
  name: 'ROption',
  componentName: 'ROption',
  props: optionProps,
  setup(props) {
    const [, bem, , isBem] = createNamespace('select-dropdown')

    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    })

    const { currentLabel, itemSelected, isDisabled, select, hoverItem } =
      useOption(props, states)

    const { visible, hover } = toRefs(states)

    const vm = getCurrentInstance()?.proxy

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

    function selectOptionClick() {
      if (props.disabled !== true && states.groupDisabled !== true) {
        select.handleOptionSelect(vm, true)
      }
    }

    return {
      bem,
      isBem,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      visible,
      hover,
      selectOptionClick,
      states
    }
  }
})
</script>
