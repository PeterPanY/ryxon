<template>
  <r-tooltip
    ref="popperRef"
    :visible="suggestionVisible"
    :placement="placement"
    :fallback-placements="['bottom-start', 'top-start']"
    :popper-class="[bem('popper'), popperClass]"
    :teleport="teleport"
    :gpu-acceleration="false"
    :show-arrow="showArrow"
    pure
    manual-mode
    theme="light"
    trigger="click"
    transition="r-zoom-in-top"
    persistent
    @before-show="onSuggestionShow"
    @show="onShow"
    @hide="onHide"
  >
    <div
      ref="listboxRef"
      :class="[bem(), $attrs.class]"
      :style="styles"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="suggestionVisible"
      :aria-owns="listboxId"
    >
      <r-input
        ref="inputRef"
        v-bind="attrs"
        :model-value="modelValue"
        :clear-icon="clearIcon"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @keydown.up.prevent="highlight(highlightedIndex - 1)"
        @keydown.down.prevent="highlight(highlightedIndex + 1)"
        @keydown.enter="handleKeyEnter"
        @keydown.tab="close"
        @keydown.esc="handleKeyEscape"
        @mousedown="handleMouseDown"
      >
        <template v-if="$slots['left-icon']" #left-icon>
          <slot name="left-icon" />
        </template>
        <template v-if="$slots['right-icon']" #right-icon>
          <slot name="right-icon" />
        </template>
      </r-input>
    </div>
    <template #content>
      <div
        ref="regionRef"
        :class="[bem('suggestion'), isBem('loading', suggestionLoading)]"
        :style="{
          [fitInputWidth ? 'width' : 'minWidth']: dropdownWidth,
          outline: 'none'
        }"
        role="region"
      >
        <r-scrollbar
          :id="listboxId"
          tag="ul"
          :wrap-class="bem('suggestion-wrap')"
          :view-class="bem('suggestion-list')"
          role="listbox"
        >
          <li v-if="suggestionLoading">
            <r-icon :class="isBem('loading')"><Loading /></r-icon>
          </li>
          <template v-else>
            <li
              v-for="(item, index) in suggestions"
              :id="`${listboxId}-item-${index}`"
              :key="index"
              :class="{ highlighted: highlightedIndex === index }"
              role="option"
              :aria-selected="highlightedIndex === index"
              @click="handleSelect(item)"
            >
              <slot :item="item">{{ item[valueKey] }}</slot>
            </li>
          </template>
        </r-scrollbar>
      </div>
    </template>
  </r-tooltip>
</template>

<script lang="ts">
// @ts-nocheck
import {
  ref,
  computed,
  nextTick,
  onMounted,
  defineComponent,
  useAttrs as useRawAttrs,
  type StyleValue
} from 'vue'
import { debounce } from 'lodash-unified'
import { useCustomInputValue } from '@ryxon/use'
import { Loading } from '@ryxon/icons'
import { onClickOutside } from '@vueuse/core'
import { isArray, generateId } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { Tooltip } from '../tooltip'
import { Input } from '../input'
import { Scrollbar } from '../scrollbar'
import { Icon } from '../icon'
import { useAttrs } from '../composables/use-attrs'
import { useExpose } from '../composables/use-expose'
import { autocompleteEmits, autocompleteProps } from './types'
import type { AutocompleteData } from './types'

const [name, bem, , isBem] = createNamespace('autocomplete')

export default defineComponent({
  name,
  components: {
    RTooltip: Tooltip,
    RInput: Input,
    RScrollbar: Scrollbar,
    RIcon: Icon,
    Loading
  },
  inheritAttrs: false,
  props: autocompleteProps,
  emits: autocompleteEmits,
  setup(props, { emit }) {
    const attrs = useAttrs()
    const rawAttrs = useRawAttrs()
    const disabled = computed(() => props.disabled)

    const inputRef = ref<typeof Input>()
    const regionRef = ref<HTMLElement>()
    const popperRef = ref<typeof Tooltip>()
    const listboxRef = ref<HTMLElement>()

    let readonly = false
    let ignoreFocusEvent = false
    const suggestions = ref<AutocompleteData>([])
    const highlightedIndex = ref(-1)
    const dropdownWidth = ref('')
    const activated = ref(false)
    const suggestionDisabled = ref(false)
    const loading = ref(false)

    const listboxId = computed(() => bem(String(generateId())))
    const styles = computed(() => rawAttrs.style as StyleValue)

    const suggestionVisible = computed(() => {
      const isValidData = suggestions.value.length > 0
      return (isValidData || loading.value) && activated.value
    })

    const suggestionLoading = computed(
      () => !props.hideLoading && loading.value
    )

    const refInput = computed<HTMLInputElement[]>(() => {
      if (inputRef.value) {
        return Array.from<HTMLInputElement>(
          inputRef.value.$el.querySelectorAll('input')
        )
      }
      return []
    })

    const onSuggestionShow = async () => {
      await nextTick()
      if (suggestionVisible.value) {
        dropdownWidth.value = `${inputRef.value!.$el.offsetWidth}px`
      }
    }

    const onShow = () => {
      ignoreFocusEvent = true
    }

    const onHide = () => {
      ignoreFocusEvent = false
      highlightedIndex.value = -1
    }

    const getData = async (queryString: string) => {
      if (suggestionDisabled.value) return

      const cb = (suggestionList: AutocompleteData) => {
        loading.value = false
        if (suggestionDisabled.value) return

        if (isArray(suggestionList)) {
          suggestions.value = suggestionList
          highlightedIndex.value = props.highlightFirstItem ? 0 : -1
        } else {
          console.error(name, 'autocomplete suggestions must be an array')
        }
      }

      loading.value = true
      if (isArray(props.fetchSuggestions)) {
        cb(props.fetchSuggestions)
      } else {
        const result = await props.fetchSuggestions(queryString, cb)
        if (isArray(result)) cb(result)
      }
    }

    const debouncedGetData = debounce(getData, props.debounce)

    const handleInput = (value: string) => {
      const valuePresented = !!value

      emit('input', value)
      emit('update:modelValue', value)

      suggestionDisabled.value = false
      activated.value ||= valuePresented

      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.value = true
        suggestions.value = []
        return
      }

      debouncedGetData(value)
    }

    const handleChange = (value: string) => {
      emit('change', value)
    }

    const handleFocus = (evt: FocusEvent) => {
      if (ignoreFocusEvent) return

      activated.value = true
      emit('focus', evt)
      // fix https://github.com/element-plus/element-plus/issues/8278
      if (props.triggerOnFocus && !readonly) {
        debouncedGetData(String(props.modelValue))
      }
    }

    const handleBlur = (evt: FocusEvent) => {
      if (ignoreFocusEvent) return
      emit('blur', evt)
    }

    const handleClear = () => {
      activated.value = false
      emit('update:modelValue', '')
      emit('clear')
    }

    const handleSelect = async (item: any) => {
      emit('input', item[props.valueKey])
      emit('update:modelValue', item[props.valueKey])
      emit('select', item)
      suggestions.value = []
      highlightedIndex.value = -1
    }

    const handleKeyEnter = async () => {
      if (
        suggestionVisible.value &&
        highlightedIndex.value >= 0 &&
        highlightedIndex.value < suggestions.value.length
      ) {
        handleSelect(suggestions.value[highlightedIndex.value])
      } else if (props.selectWhenUnmatched) {
        emit('select', { value: props.modelValue })
        suggestions.value = []
        highlightedIndex.value = -1
      }
    }

    const highlight = (index: number) => {
      if (!suggestionVisible.value || loading.value) return

      if (index < 0) {
        highlightedIndex.value = -1
        return
      }

      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1
      }
      const suggestion = regionRef.value!.querySelector(
        `.${bem('suggestion-wrap')}`
      )!
      const suggestionList = suggestion.querySelectorAll<HTMLElement>(
        `.${bem('suggestion-list')} li`
      )!
      const highlightItem = suggestionList[index]
      const { scrollTop } = suggestion
      const { offsetTop, scrollHeight } = highlightItem

      if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += scrollHeight
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= scrollHeight
      }
      highlightedIndex.value = index
      // TODO: use Volar generate dts to fix it.
      ;(inputRef.value as any).ref!.setAttribute(
        'aria-activedescendant',
        `${listboxId.value}-item-${highlightedIndex.value}`
      )
    }

    const close = () => {
      activated.value = false
    }

    const focus = () => {
      inputRef.value?.focus()
    }

    const blur = () => {
      inputRef.value?.blur()
    }

    const handleKeyEscape = (evt: Event) => {
      if (suggestionVisible.value) {
        evt.preventDefault()
        evt.stopPropagation()
        close()
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (disabled.value) return
      if (
        (event.target as HTMLElement)?.tagName !== 'INPUT' ||
        refInput.value.includes(document.activeElement as HTMLInputElement)
      ) {
        activated.value = true
      }
    }

    onClickOutside(listboxRef, () => {
      suggestionVisible.value && close()
    })

    onMounted(() => {
      // TODO: use Volar generate dts to fix it.
      ;(inputRef.value as any).ref.value.setAttribute('role', 'textbox')
      ;(inputRef.value as any).ref.value.setAttribute(
        'aria-autocomplete',
        'list'
      )
      ;(inputRef.value as any).ref.value.setAttribute('aria-controls', 'id')
      ;(inputRef.value as any).ref.value.setAttribute(
        'aria-activedescendant',
        `${listboxId.value}-item-${highlightedIndex.value}`
      )
      // get readonly attr
      readonly = (inputRef.value as any).ref.value.hasAttribute('readonly')
    })

    useExpose({
      /** @description the index of the currently highlighted item */
      highlightedIndex,
      /** @description autocomplete whether activated */
      activated,
      /** @description remote search loading status */
      loading,
      /** @description r-input component instance */
      inputRef,
      /** @description r-tooltip component instance */
      popperRef,
      /** @description fetch suggestions result */
      suggestions,
      /** @description triggers when a suggestion is clicked */
      handleSelect,
      /** @description handle keyboard enter event */
      handleKeyEnter,
      /** @description focus the input element */
      focus,
      /** @description blur the input element */
      blur,
      /** @description close suggestion */
      close,
      /** @description highlight an item in a suggestion */
      highlight
    })

    useCustomInputValue(() => props.modelValue)

    return {
      bem,
      isBem,
      popperRef,
      inputRef,
      regionRef,
      listboxRef,
      listboxId,
      styles,
      attrs,
      suggestionVisible,
      highlightedIndex,
      suggestionLoading,
      dropdownWidth,
      suggestions,
      onSuggestionShow,
      onShow,
      onHide,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      handleKeyEnter,
      handleSelect,
      highlight,
      close,
      focus,
      blur,
      handleKeyEscape,
      handleMouseDown
    }
  }
})
</script>
