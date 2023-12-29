// @ts-nocheck
import { computed, getCurrentInstance, inject, toRaw, unref, watch } from 'vue'
import { get } from 'lodash-unified'
import { escapeStringRegexp } from '@ryxon/utils'
import { selectGroupKey, selectKey } from './token'

import type { Ref } from 'vue'
import type { QueryChangeCtx } from './token'

export function useOption(props, states) {
  // inject
  const select = inject(selectKey)
  const selectGroup = inject(selectGroupKey, { disabled: false })

  // computed
  const isObject = computed(
    () =>
      Object.prototype.toString.call(props.value).toLowerCase() ===
      '[object object]'
  )

  const isEqual = (a: unknown, b: unknown) => {
    if (!isObject.value) {
      return a === b
    }
    const { valueKey } = select.props
    return get(a, valueKey) === get(b, valueKey)
  }

  // eslint-disable-next-line default-param-last
  const contains = (arr = [], target) => {
    if (!isObject.value) {
      return arr && arr.includes(target)
    }
    const { valueKey } = select.props
    return (
      arr &&
      arr.some((item) => toRaw(get(item, valueKey)) === get(target, valueKey))
    )
  }

  const itemSelected = computed(() => {
    if (!select.props.multiple) {
      return isEqual(props.value, select.props.modelValue)
    }
    return contains(select.props.modelValue as unknown[], props.value)
  })

  const limitReached = computed(() => {
    if (select.props.multiple) {
      const modelValue = (select.props.modelValue || []) as unknown[]
      return (
        !itemSelected.value &&
        modelValue.length >= select.props.multipleLimit &&
        select.props.multipleLimit > 0
      )
    }
    return false
  })

  // 当前显示的label
  const currentLabel = computed(
    () => props.label || (isObject.value ? '' : props.value)
  )

  // 当前选中项的value
  const currentValue = computed(() => props.value || props.label || '')

  // 判断当前项是否禁用
  const isDisabled = computed(
    () => props.disabled || states.groupDisabled || limitReached.value
  )

  const instance = getCurrentInstance()

  // 鼠标当前所在选项的index值
  const hoverItem = () => {
    if (!props.disabled && !selectGroup.disabled) {
      select.hoverIndex = select.optionsArray.indexOf(instance.proxy)
    }
  }

  watch(
    () => currentLabel.value,
    () => {
      if (!props.created && !select.props.remote) select.setSelected()
    }
  )

  watch(
    () => props.value,
    (val, oldVal) => {
      const { remote, valueKey } = select.props

      if (!Object.is(val, oldVal)) {
        select.onOptionDestroy(oldVal, instance.proxy)
        select.onOptionCreate(instance.proxy)
      }

      if (!props.created && !remote) {
        if (
          valueKey &&
          typeof val === 'object' &&
          typeof oldVal === 'object' &&
          val[valueKey] === oldVal[valueKey]
        ) {
          return
        }
        select.setSelected()
      }
    }
  )

  watch(
    () => selectGroup.disabled,
    () => {
      states.groupDisabled = selectGroup.disabled
    },
    { immediate: true }
  )

  const { queryChange } = toRaw(select)
  watch(queryChange, (changes: Ref<QueryChangeCtx>) => {
    const { query } = unref(changes)

    const regexp = new RegExp(escapeStringRegexp(query), 'i')
    states.visible = regexp.test(currentLabel.value) || props.created
    if (!states.visible) {
      select.filteredOptionsCount--
    }
  })

  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem
  }
}
