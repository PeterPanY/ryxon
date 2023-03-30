// @ts-nocheck
import {
  ref,
  watch,
  toRaw,
  computed,
  nextTick,
  reactive,
  shallowRef,
  triggerRef,
  type ComponentPublicInstance
} from 'vue'
import { SelectProps } from './Select'
import { useParent } from '@ryxon/use'
import { get, isEqual, debounce as lodashDebounce } from 'lodash-unified'
import { isNumber, isClient } from '@vueuse/core'
import {
  FORM_KEY,
  isObject,
  isString,
  isKorean,
  toRawType,
  isFunction,
  scrollIntoView,
  createNamespace,
  getComponentSize
} from '../utils'
import { Tooltip } from '../tooltip'

import type { QueryChangeCtx, SelectOptionProxy } from './token'

const [, bem, t, isBem] = createNamespace('select')

export function useSelectStates(props: SelectProps) {
  return reactive({
    options: new Map(),
    cachedOptions: new Map(),
    createdLabel: null,
    createdSelected: false,
    selected: props.multiple ? [] : ({} as any),
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: false,
    softFocus: false,
    selectedLabel: '',
    hoverIndex: -1,
    query: '',
    previousQuery: null,
    inputHovering: false,
    cachedPlaceHolder: '',
    currentPlaceholder: t('placeholder'),
    menuVisibleOnFocus: false,
    isOnComposition: false,
    isSilentBlur: false,
    prefixWidth: 11,
    tagInMultiLine: false,
    mouseEnter: false
  })
}

type States = ReturnType<typeof useSelectStates>

export const useSelect = (props: SelectProps, states: States, ctx: any) => {
  const reference = ref<ComponentPublicInstance<{
    focus: () => void
    blur: () => void
    input: HTMLInputElement
  }> | null>(null)
  const input = ref<HTMLInputElement | null>(null)
  const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null)
  const tags = ref<HTMLElement | null>(null)
  const selectWrapper = ref<HTMLElement | null>(null)
  const scrollbar = ref<{ handleScroll: () => void } | null>(null)
  const hoverOption = ref(-1)
  const queryChange = shallowRef<QueryChangeCtx>({ query: '' })
  const groupQueryChange = shallowRef('')

  // 获取父级组件form
  const { parent: form } = useParent(FORM_KEY)

  const readonly = computed(
    () => !props.filterable || props.multiple || !states.visible
  )

  const selectDisabled = computed(() => props.disabled || form?.props.disabled)

  // 判断是否显示清空按钮
  const showClose = computed(() => {
    const hasValue = props.multiple
      ? Array.isArray(props.modelValue) && props.modelValue.length > 0
      : props.modelValue !== undefined &&
        props.modelValue !== null &&
        props.modelValue !== ''

    const criteria =
      props.clearable &&
      !selectDisabled.value &&
      states.inputHovering &&
      hasValue
    return criteria
  })

  // 判断输入框中的下三角是否显示
  const iconComponent = computed(() =>
    props.remote && props.filterable && !props.remoteShowSuffix
      ? ''
      : props.suffixIcon
  )

  // 右侧下三角是否旋转180°
  const iconReverse = computed(() =>
    isBem(
      'reverse',
      iconComponent.value && states.visible && props.suffixTransition
    )
  )

  const debounce = computed(() => (props.remote ? 300 : 0))

  // 无数据时候的文本
  const emptyText = computed(() => {
    if (props.loading) {
      return props.loadingText || t('loading')
    }
    if (props.remote && states.query === '' && states.options.size === 0)
      return false
    if (
      props.filterable &&
      states.query &&
      states.options.size > 0 &&
      states.filteredOptionsCount === 0
    ) {
      return props.noMatchText || t('noMatch')
    }
    if (states.options.size === 0) {
      return props.noDataText || t('noData')
    }

    return null
  })

  const optionsArray = computed(() => Array.from(states.options.values()))

  // 缓存选项数组
  const cachedOptionsArray = computed(() =>
    Array.from(states.cachedOptions.values())
  )

  const showNewOption = computed(() => {
    const hasExistingOption = optionsArray.value
      .filter((option) => !option.created)
      .some((option) => option.currentLabel === states.query)
    return (
      props.filterable &&
      props.allowCreate &&
      states.query !== '' &&
      !hasExistingOption
    )
  })

  const selectSize = ref(props.size)

  const collapseTagSize = computed(() =>
    ['small'].includes(selectSize.value) ? 'small' : 'default'
  )

  const dropMenuVisible = computed({
    get() {
      return states.visible && emptyText.value !== false
    },
    set(val: boolean) {
      states.visible = val
    }
  })

  const resetInputHeight = () => {
    if (props.collapseTags && !props.filterable) return
    nextTick(() => {
      if (!reference.value) return
      const input = reference.value.$el.querySelector(
        'input'
      ) as HTMLInputElement
      const _tags = tags.value

      const sizeInMap = getComponentSize(selectSize.value)
      // it's an inner input so reduce it by 2px.
      input.style.height = `${
        (states.selected.length === 0
          ? sizeInMap
          : Math.max(
              _tags
                ? _tags.clientHeight + (_tags.clientHeight > sizeInMap ? 6 : 0)
                : 0,
              sizeInMap
            )) - 2
      }px`

      states.tagInMultiLine = Number.parseFloat(input.style.height) >= sizeInMap

      if (states.visible && emptyText.value !== false) {
        tooltipRef.value?.updatePopper?.()
      }
    })
  }

  // 获取value的标识的键名
  const getValueKey = (item: any) =>
    isObject(item.value) ? get(item.value, props.valueKey) : item.value

  const resetHoverIndex = () => {
    setTimeout(() => {
      const { valueKey } = props
      if (!props.multiple) {
        states.hoverIndex = optionsArray.value.findIndex(
          (item) => getValueKey(item) === getValueKey(states.selected)
        )
      } else if (states.selected.length > 0) {
        states.hoverIndex = Math.min.apply(
          null,
          states.selected.map((selected: any) =>
            optionsArray.value.findIndex(
              (item) => get(item, valueKey) === get(selected, valueKey)
            )
          )
        )
      } else {
        states.hoverIndex = -1
      }
    }, 300)
  }

  // watch
  watch([() => selectDisabled.value, () => selectSize.value], () => {
    nextTick(() => {
      resetInputHeight()
    })
  })

  watch(
    () => props.placeholder,
    (val) => {
      // eslint-disable-next-line no-multi-assign
      states.cachedPlaceHolder = states.currentPlaceholder = val
    }
  )

  const managePlaceholder = () => {
    if (states.currentPlaceholder !== '') {
      states.currentPlaceholder = input.value!.value
        ? ''
        : states.cachedPlaceHolder
    }
  }

  const getValueIndex = (value: any, arr: any[] = []) => {
    if (!isObject(value)) return arr.indexOf(value)

    const { valueKey } = props
    let index = -1
    arr.some((item, i) => {
      if (toRaw(get(item, valueKey)) === get(value, valueKey)) {
        index = i
        return true
      }
      return false
    })
    return index
  }

  /**
   * 查找并突出显示默认选中的第一个选项
   * @remark
   * - 如果下拉列表中的第一个选项是用户创建的，它将在选项阵列的末尾,所以找到它并设置悬停。
   *   (注意：在带有查询的下拉列表中只能有一个用户创建的选项)
   * - 如果列表中没有用户创建的选项，只需照常查找第一个选项
   *   (注意：排除禁用或禁用组中的选项)
   */
  const checkDefaultFirstOption = () => {
    const optionsInDropdown = optionsArray.value.filter(
      (n) => n.visible && !n.disabled && !n.states.groupDisabled
    )
    const userCreatedOption = optionsInDropdown.find((n) => n.created)
    const firstOriginOption = optionsInDropdown[0]
    states.hoverIndex = getValueIndex(
      userCreatedOption || firstOriginOption,
      optionsArray.value
    )
  }

  const handleQueryChange = async (val: any) => {
    if (states.previousQuery === val || states.isOnComposition) return
    if (
      states.previousQuery === null &&
      (isFunction(props.filterMethod) || isFunction(props.remoteMethod))
    ) {
      states.previousQuery = val
      return
    }
    states.previousQuery = val
    nextTick(() => {
      if (states.visible) tooltipRef.value?.updatePopper?.()
    })
    states.hoverIndex = -1
    if (props.multiple && props.filterable) {
      nextTick(() => {
        const length = input.value!.value.length * 15 + 20
        states.inputLength = props.collapseTags ? Math.min(50, length) : length
        managePlaceholder()
        resetInputHeight()
      })
    }
    if (props.remote && isFunction(props.remoteMethod)) {
      states.hoverIndex = -1
      props.remoteMethod(val)
    } else if (isFunction(props.filterMethod)) {
      props.filterMethod(val)
      triggerRef(groupQueryChange)
    } else {
      states.filteredOptionsCount = states.optionsCount
      queryChange.value.query = val

      triggerRef(queryChange)
      triggerRef(groupQueryChange)
    }
    if (
      props.defaultFirstOption &&
      (props.filterable || props.remote) &&
      states.filteredOptionsCount
    ) {
      await nextTick()
      checkDefaultFirstOption()
    }
  }

  // 获取对应的option选项对象
  const getOption = (value: any) => {
    let option
    const isObjectValue = toRawType(value).toLowerCase() === 'object'
    const isNull = toRawType(value).toLowerCase() === 'null'
    const isUndefined = toRawType(value).toLowerCase() === 'undefined'

    for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsArray.value[i]

      const isEqualValue = isObjectValue
        ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey)
        : cachedOption.value === value

      if (isEqualValue) {
        option = {
          value,
          currentLabel: cachedOption.currentLabel,
          isDisabled: cachedOption.isDisabled
        }
        break
      }
    }
    if (option) return option
    const label = isObjectValue
      ? value.label
      : !isNull && !isUndefined
      ? value
      : ''
    const newOption = {
      value,
      currentLabel: label
    }
    if (props.multiple) {
      ;(newOption as any).hitState = false
    }

    return newOption
  }

  // 设置选中项
  const setSelected = () => {
    if (!props.multiple) {
      const option = getOption(props.modelValue)
      if (option.props?.created) {
        states.createdLabel = option.props.value
        states.createdSelected = true
      } else {
        states.createdSelected = false
      }
      states.selectedLabel = option.currentLabel
      states.selected = option
      if (props.filterable) states.query = states.selectedLabel
      return
    }
    states.selectedLabel = ''

    const result: any[] = []
    if (Array.isArray(props.modelValue)) {
      props.modelValue.forEach((value) => {
        result.push(getOption(value))
      })
    }
    states.selected = result
    nextTick(() => {
      resetInputHeight()
    })
  }

  // 监听modelValue值的变化
  watch(
    () => props.modelValue,
    (val) => {
      if (props.multiple) {
        resetInputHeight()
        if ((val && val.length > 0) || (input.value && states.query !== '')) {
          states.currentPlaceholder = ''
        } else {
          states.currentPlaceholder = states.cachedPlaceHolder
        }
        if (props.filterable && !props.reserveKeyword) {
          states.query = ''
          handleQueryChange(states.query)
        }
      }
      setSelected()

      if (props.filterable && !props.multiple) {
        states.inputLength = 20
      }
      // if (!isEqual(val, oldVal) && props.validateEvent) {
      //   formItem?.validate('change').catch((err) => debugWarn(err))
      // }
    },
    {
      flush: 'post',
      deep: true
    }
  )

  watch(
    () => states.visible,
    (val) => {
      if (!val) {
        if (props.filterable) {
          if (isFunction(props.filterMethod)) {
            props.filterMethod('')
          }
          if (isFunction(props.remoteMethod)) {
            props.remoteMethod('')
          }
        }
        input.value && input.value.blur()
        states.query = ''
        states.previousQuery = null
        states.selectedLabel = ''
        states.inputLength = 20
        states.menuVisibleOnFocus = false
        resetHoverIndex()
        nextTick(() => {
          if (
            input.value &&
            input.value.value === '' &&
            states.selected.length === 0
          ) {
            states.currentPlaceholder = states.cachedPlaceHolder
          }
        })

        if (!props.multiple) {
          if (states.selected) {
            if (
              props.filterable &&
              props.allowCreate &&
              states.createdSelected &&
              states.createdLabel
            ) {
              states.selectedLabel = states.createdLabel
            } else {
              states.selectedLabel = states.selected.currentLabel
            }
            if (props.filterable) states.query = states.selectedLabel
          }

          if (props.filterable) {
            states.currentPlaceholder = states.cachedPlaceHolder
          }
        }
      } else {
        tooltipRef.value?.updatePopper?.()

        if (props.filterable) {
          states.filteredOptionsCount = states.optionsCount
          states.query = props.remote ? '' : states.selectedLabel
          if (props.multiple) {
            input.value?.focus()
          } else if (states.selectedLabel) {
            states.currentPlaceholder = `${states.selectedLabel}`
            states.selectedLabel = ''
          }
          handleQueryChange(states.query)
          if (!props.multiple && !props.remote) {
            queryChange.value.query = ''

            triggerRef(queryChange)
            triggerRef(groupQueryChange)
          }
        }
      }
      ctx.emit('visible-change', val)
    }
  )

  watch(
    // fix `Array.prototype.push/splice/..` cannot trigger non-deep watcher
    // https://github.com/vuejs/vue-next/issues/2116
    () => states.options.entries(),
    () => {
      if (!isClient) return
      tooltipRef.value?.updatePopper?.()
      if (props.multiple) {
        resetInputHeight()
      }
      const inputs = selectWrapper.value?.querySelectorAll('input') || []
      if (
        !Array.from(inputs).includes(document.activeElement as HTMLInputElement)
      ) {
        setSelected()
      }
      if (
        props.defaultFirstOption &&
        (props.filterable || props.remote) &&
        states.filteredOptionsCount
      ) {
        checkDefaultFirstOption()
      }
    },
    {
      flush: 'post'
    }
  )

  watch(
    () => states.hoverIndex,
    (val) => {
      if (isNumber(val) && val > -1) {
        hoverOption.value = optionsArray.value[val] || {}
      } else {
        hoverOption.value = {}
      }
      optionsArray.value.forEach((option) => {
        option.hover = hoverOption.value === option
      })
    }
  )

  // methods
  const emitChange = (val: any) => {
    if (!isEqual(props.modelValue, val)) {
      ctx.emit('change', val)
    }
  }

  const toggleLastOptionHitState = (hit?: boolean) => {
    if (!Array.isArray(states.selected)) return
    const option = states.selected[states.selected.length - 1]
    if (!option) return

    if (hit === true || hit === false) {
      option.hitState = hit
      return hit
    }

    option.hitState = !option.hitState
    return option.hitState
  }

  const resetInputState = (e: KeyboardEvent) => {
    if (e.code !== 'Backspace') toggleLastOptionHitState(false)
    states.inputLength = input.value!.value.length * 15 + 20
    resetInputHeight()
  }

  const handleComposition = (event: any) => {
    const text = event.target.value
    if (event.type === 'compositionend') {
      states.isOnComposition = false
      nextTick(() => handleQueryChange(text))
    } else {
      const lastCharacter = text[text.length - 1] || ''
      states.isOnComposition = !isKorean(lastCharacter)
    }
  }

  const scrollToOption = (option: any) => {
    const targetOption = Array.isArray(option) ? option[0] : option
    let target = null

    if (targetOption?.value) {
      const options = optionsArray.value.filter(
        (item) => item.value === targetOption.value
      )
      if (options.length > 0) {
        target = options[0].$el
      }
    }

    if (tooltipRef.value && target) {
      const menu = tooltipRef.value?.contentRef?.popupRef?.querySelector?.(
        `.${bem('dropdown', 'wrap')}`
      )
      if (menu) {
        scrollIntoView(menu as HTMLElement, target)
      }
    }
    scrollbar.value?.handleScroll()
  }

  const handleMenuEnter = () => {
    nextTick(() => scrollToOption(states.selected))
  }

  // 输入框获得聚焦
  const handleFocus = (event: FocusEvent) => {
    if (!states.softFocus) {
      if (props.automaticDropdown || props.filterable) {
        if (props.filterable && !states.visible) {
          states.menuVisibleOnFocus = true
        }
        states.visible = true
      }
      ctx.emit('focus', event)
    } else {
      states.softFocus = false
    }
  }

  const blur = () => {
    states.visible = false
    reference.value?.blur()
  }

  // 输入框失去聚焦
  const handleBlur = (event: FocusEvent) => {
    nextTick(() => {
      if (states.isSilentBlur) {
        states.isSilentBlur = false
      } else {
        ctx.emit('blur', event)
      }
    })
    states.softFocus = false
  }

  const handleKeydownEscape = (event: KeyboardEvent) => {
    if (states.visible) {
      event.preventDefault()
      event.stopPropagation()
      states.visible = false
    }
  }

  const toggleMenu = (e?: PointerEvent) => {
    if (e && !states.mouseEnter) {
      return
    }
    if (!selectDisabled.value) {
      if (states.menuVisibleOnFocus) {
        states.menuVisibleOnFocus = false
      } else if (
        !tooltipRef.value ||
        !tooltipRef.value.isFocusInsideContent()
      ) {
        states.visible = !states.visible
      }
      if (states.visible) {
        ;(input.value || reference.value)?.focus()
      }
    }
  }

  const setSoftFocus = () => {
    states.softFocus = true
    const _input = input.value || reference.value
    if (_input) {
      _input?.focus()
    }
  }

  // 点击选中后调用此方法
  const handleOptionSelect = (option: any, byClick: any) => {
    if (props.multiple) {
      const value = (props.modelValue || []).slice()
      const optionIndex = getValueIndex(option.value, value)
      if (optionIndex > -1) {
        value.splice(optionIndex, 1)
      } else if (
        props.multipleLimit <= 0 ||
        value.length < props.multipleLimit
      ) {
        value.push(option.value)
      }
      ctx.emit('update:modelValue', value)
      emitChange(value)
      if (option.created) {
        states.query = ''
        handleQueryChange('')
        states.inputLength = 20
      }
      if (props.filterable) input.value?.focus()
    } else {
      // 更新v-model的值
      ctx.emit('update:modelValue', option.value)
      // 触发change事件
      emitChange(option.value)
      // 关闭弹窗
      states.visible = false
    }
    states.isSilentBlur = byClick
    setSoftFocus()
    if (states.visible) return
    nextTick(() => {
      scrollToOption(option)
    })
  }

  // 选择Option
  const selectOption = () => {
    if (!states.visible) {
      toggleMenu()
    } else if (optionsArray.value[states.hoverIndex]) {
      handleOptionSelect(optionsArray.value[states.hoverIndex], undefined)
    }
  }

  const resetInputWidth = () => {
    states.inputWidth = reference.value?.$el.getBoundingClientRect().width
  }

  const handleResize = () => {
    resetInputWidth()
    tooltipRef.value?.updatePopper?.()
    if (props.multiple && !props.filterable) resetInputHeight()
  }

  const onInputChange = () => {
    if (props.filterable && states.query !== states.selectedLabel) {
      states.query = states.selectedLabel
      handleQueryChange(states.query)
    }
  }

  const debouncedOnInputChange = lodashDebounce(() => {
    onInputChange()
  }, debounce.value)

  const debouncedQueryChange = lodashDebounce((e) => {
    handleQueryChange(e.target.value)
  }, debounce.value)

  const deletePrevTag = (e) => {
    if (e.target.value.length <= 0 && !toggleLastOptionHitState()) {
      const value = props.modelValue.slice()
      value.pop()
      ctx.emit('update:modelValue', value)
      emitChange(value)
    }

    if (e.target.value.length === 1 && props.modelValue.length === 0) {
      states.currentPlaceholder = states.cachedPlaceHolder
    }
  }

  // Tag中删除按钮触发--删除多选项
  const deleteTag = (event: Event, tag: any) => {
    const index = states.selected.indexOf(tag)
    if (index > -1 && !selectDisabled.value) {
      const value = props.modelValue.slice()
      value.splice(index, 1)
      ctx.emit('update:modelValue', value)
      emitChange(value)
      ctx.emit('remove-tag', tag.value)
    }
    event.stopPropagation()
  }

  // 删除select选中项
  const deleteSelected = (event: Event) => {
    event.stopPropagation()
    const value: string | any[] = props.multiple ? [] : ''
    if (!isString(value)) {
      for (const item of states.selected) {
        if (item.isDisabled) value.push(item.value)
      }
    }
    ctx.emit('update:modelValue', value)
    emitChange(value)
    states.hoverIndex = -1
    states.visible = false
    ctx.emit('clear')
  }

  // 点击清空选项
  const handleClearClick = (event: Event) => {
    deleteSelected(event)
  }

  const handleClose = () => {
    states.visible = false
  }

  const optionsAllDisabled = computed(() =>
    optionsArray.value
      .filter((option) => option.visible)
      .every((option) => option.disabled)
  )

  // 键盘上下键选择选项操作
  const navigateOptions = (direction) => {
    if (!states.visible) {
      states.visible = true
      return
    }
    if (states.options.size === 0 || states.filteredOptionsCount === 0) return
    if (states.isOnComposition) return

    if (!optionsAllDisabled.value) {
      if (direction === 'next') {
        states.hoverIndex++
        if (states.hoverIndex === states.options.size) {
          states.hoverIndex = 0
        }
      } else if (direction === 'prev') {
        states.hoverIndex--
        if (states.hoverIndex < 0) {
          states.hoverIndex = states.options.size - 1
        }
      }
      const option = optionsArray.value[states.hoverIndex]
      if (
        option.disabled === true ||
        option.states.groupDisabled === true ||
        !option.visible
      ) {
        navigateOptions(direction)
      }
      nextTick(() => scrollToOption(hoverOption.value))
    }
  }

  // 选项创建时
  const onOptionCreate = (vm: SelectOptionProxy) => {
    states.optionsCount++
    states.filteredOptionsCount++
    states.options.set(vm.value, vm)
    states.cachedOptions.set(vm.value, vm)
  }

  // 选项销毁时
  const onOptionDestroy = (key: any, vm: SelectOptionProxy) => {
    if (states.options.get(key) === vm) {
      states.optionsCount--
      states.filteredOptionsCount--
      states.options.delete(key)
    }
  }

  const handleMouseEnter = () => {
    states.mouseEnter = true
  }

  const handleMouseLeave = () => {
    states.mouseEnter = false
  }

  return {
    optionsArray,
    selectSize,
    handleResize,
    debouncedOnInputChange,
    debouncedQueryChange,
    deletePrevTag,
    deleteTag,
    deleteSelected,
    handleOptionSelect,
    scrollToOption,
    readonly,
    resetInputHeight,
    showClose,
    iconComponent,
    iconReverse,
    showNewOption,
    collapseTagSize,
    setSelected,
    managePlaceholder,
    selectDisabled,
    emptyText,
    toggleLastOptionHitState,
    resetInputState,
    handleComposition,
    onOptionCreate,
    onOptionDestroy,
    handleMenuEnter,
    handleFocus,
    blur,
    handleBlur,
    handleClearClick,
    handleClose,
    handleKeydownEscape,
    toggleMenu,
    selectOption,
    getValueKey,
    navigateOptions,
    dropMenuVisible,
    queryChange,
    groupQueryChange,

    // DOM ref
    reference,
    input,
    tooltipRef,
    tags,
    selectWrapper,
    scrollbar,

    // Mouser Event
    handleMouseEnter,
    handleMouseLeave
  }
}
