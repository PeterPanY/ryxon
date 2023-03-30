<template>
  <div
    ref="selectWrapper"
    :class="wrapperKls"
    v-click-outside:[popperRef]="handleClose"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="toggleMenu"
  >
    <r-tooltip
      ref="tooltipRef"
      :visible="dropMenuVisible"
      :placement="placement"
      :teleport="teleport"
      :popper-class="[bem('popper'), popperClass]"
      :lazy-render="false"
      :persistent="true"
      :theme="theme"
      trigger="click"
      @show="handleMenuEnter"
    >
      <template #default>
        <div
          class="select-trigger"
          @mouseenter="inputHovering = true"
          @mouseleave="inputHovering = false"
        >
          <div
            v-if="multiple"
            ref="tags"
            :class="bem('tags')"
            :style="selectTagsStyle"
          >
            <span
              v-if="collapseTags && selected.length"
              :class="[
                bem('tags-wrapper'),
                { 'has-prefix': prefixWidth && selected.length }
              ]"
            >
              <r-tag
                :closeable="!selectDisabled && !selected[0].isDisabled"
                :size="collapseTagSize"
                :hit="selected[0].hitState"
                :type="tagType"
                disable-transitions
                @close="deleteTag($event, selected[0])"
              >
                <span :class="bem('tags-text')" :style="tagTextStyle">
                  {{ selected[0].currentLabel }}</span
                >
              </r-tag>
              <r-tag
                v-if="selected.length > 1"
                :closeable="false"
                :size="collapseTagSize"
                :type="tagType"
                disable-transitions
              >
                <r-tooltip
                  v-if="collapseTagsTooltip"
                  :disabled="dropMenuVisible"
                  :fallback-placements="['bottom', 'top', 'right', 'left']"
                  :theme="theme"
                  placement="bottom"
                  :teleport="teleport"
                >
                  <template #default>
                    <span :class="bem('tags-text')"
                      >+ {{ selected.length - 1 }}</span
                    >
                  </template>
                  <template #content>
                    <div :class="bem('collapse-tags')">
                      <div
                        v-for="(item, idx) in selected.slice(1)"
                        :key="idx"
                        :class="bem('collapse-tag')"
                      >
                        <r-tag
                          :key="getValueKey(item)"
                          class="in-tooltip"
                          :closeable="!selectDisabled && !item.isDisabled"
                          :size="collapseTagSize"
                          :hit="item.hitState"
                          :type="tagType"
                          disable-transitions
                          :style="{ margin: '2px' }"
                          @close="deleteTag($event, item)"
                        >
                          <span
                            :class="bem('tags-text')"
                            :style="{
                              maxWidth: inputWidth - 75 + 'px'
                            }"
                            >{{ item.currentLabel }}</span
                          >
                        </r-tag>
                      </div>
                    </div>
                  </template>
                </r-tooltip>
                <span v-else :class="bem('tags-text')"
                  >+ {{ selected.length - 1 }}</span
                >
              </r-tag>
            </span>
            <transition v-if="!collapseTags" @after-leave="resetInputHeight">
              <span
                :class="[
                  bem('tags-wrapper'),
                  { 'has-prefix': prefixWidth && selected.length }
                ]"
              >
                <r-tag
                  v-for="item in selected"
                  :key="getValueKey(item)"
                  :closeable="!selectDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :hit="item.hitState"
                  :type="tagType"
                  disable-transitions
                  @close="deleteTag($event, item)"
                >
                  <span
                    :class="bem('tags-text')"
                    :style="{ maxWidth: inputWidth - 75 + 'px' }"
                    >{{ item.currentLabel }}</span
                  >
                </r-tag>
              </span>
            </transition>

            <input
              v-if="filterable"
              ref="input"
              v-model="query"
              type="text"
              :class="[bem('input'), isBem(selectSize)]"
              :disabled="selectDisabled"
              :autocomplete="autocomplete"
              :style="{
                marginLeft:
                  (prefixWidth && !selected.length) || tagInMultiLine
                    ? `${prefixWidth}px`
                    : '',
                flexGrow: 1,
                width: `${inputLength / (inputWidth - 32)}%`,
                maxWidth: `${inputWidth - 42}px`
              }"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.esc="handleKeydownEscape"
              @keydown.enter.stop.prevent="selectOption"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @input="debouncedQueryChange"
            />
          </div>
          <r-input
            :id="id"
            ref="reference"
            v-model="selectedLabel"
            type="text"
            :placeholder="currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="[isBem('focus', visible)]"
            :tabindex="multiple && filterable ? -1 : undefined"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc="handleKeydownEscape"
            @keydown.tab="visible = false"
          >
            <template v-if="$slots.prefix" #left-icon>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <slot name="prefix" />
              </div>
            </template>
            <template #right-icon>
              <r-icon
                v-if="iconComponent && !showClose"
                :name="isString(iconComponent) ? iconComponent : ''"
                :class="[bem('caret'), bem('icon'), iconReverse]"
              >
                <component
                  v-if="!isString(iconComponent)"
                  :is="iconComponent"
                />
              </r-icon>
              <r-icon
                v-if="showClose && clearIcon"
                :name="isString(clearIcon) ? clearIcon : ''"
                :class="[bem('caret'), bem('icon')]"
                @click="handleClearClick"
              >
                <component v-if="!isString(clearIcon)" :is="clearIcon" />
              </r-icon>
            </template>
          </r-input>
        </div>
      </template>
      <template #content>
        <r-select-menu>
          <r-scrollbar
            v-show="options.size > 0 && !loading"
            ref="scrollbar"
            tag="ul"
            :wrap-class="bemDropdown('wrap')"
            :view-class="bemDropdown('list')"
            :class="[
              isBem(
                'empty',
                !allowCreate && Boolean(query) && filteredOptionsCount === 0
              )
            ]"
          >
            <r-option v-if="showNewOption" :value="query" :created="true" />
            <slot />
          </r-scrollbar>
          <template
            v-if="
              emptyText &&
              (!allowCreate || loading || (allowCreate && options.size === 0))
            "
          >
            <slot v-if="$slots.empty" name="empty" />
            <p v-else :class="bemDropdown('empty')">
              {{ emptyText }}
            </p>
          </template>
        </r-select-menu>
      </template>
    </r-tooltip>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import {
  unref,
  toRefs,
  provide,
  nextTick,
  reactive,
  computed,
  onMounted,
  defineComponent
} from 'vue'
import { Tooltip } from '../tooltip'
import { Input } from '../input'
import { Icon } from '../icon'
import RSelectMenu from './SelectDropdown.vue'
import { Scrollbar } from '../scrollbar'
import { Option } from '../option'
import { Tag } from '../tag'
import ClickOutside from '../composables/use-click-outside'
import { selectProps } from './select-props'
import { isString, createNamespace } from '../utils'
import { useSelect, useSelectStates } from './useSelect'
import { useFocus } from '../composables/use-focus'
import { useResizeObserver } from '@vueuse/core'
import { selectKey, type SelectContext } from './token'
import { useCustomInputValue } from '@ryxon/use'

const COMPONENT_NAME = 'RSelect'
export default defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    RInput: Input,
    RSelectMenu,
    ROption: Option,
    RTag: Tag,
    RScrollbar: Scrollbar,
    RTooltip: Tooltip,
    RIcon: Icon
  },
  directives: { ClickOutside },
  props: selectProps,
  emits: [
    'blur',
    'clear',
    'focus',
    'change',
    'remove-tag',
    'visible-change',
    'update:modelValue'
  ],
  setup(props, ctx) {
    const [, bem, t, isBem] = createNamespace('select')
    const [, bemInput] = createNamespace('input')
    const [, bemDropdown] = createNamespace('select-dropdown')

    const states = useSelectStates(props)
    const {
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      setSelected,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
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

      reference,
      input,
      tooltipRef,
      tags,
      selectWrapper,
      scrollbar,
      queryChange,
      groupQueryChange,
      handleMouseEnter,
      handleMouseLeave
    } = useSelect(props, states, ctx)

    const { focus } = useFocus(reference)

    const {
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      cachedOptions,
      optionsCount,
      prefixWidth,
      tagInMultiLine
    } = toRefs(states)

    const wrapperKls = computed(() => {
      const classList = [bem()]
      const _selectSize = unref(selectSize)
      if (_selectSize) {
        classList.push(bem(_selectSize))
      }
      if (props.disabled) {
        classList.push(bem('disabled'))
      }
      return classList
    })

    const selectTagsStyle = computed(() => ({
      maxWidth: `${unref(inputWidth) - 32}px`,
      width: '100%'
    }))

    const tagTextStyle = computed(() => {
      const maxWidth =
        unref(inputWidth) > 123
          ? unref(inputWidth) - 123
          : unref(inputWidth) - 75
      return { maxWidth: `${maxWidth}px` }
    })

    provide(
      selectKey,
      reactive({
        props,
        options,
        optionsArray,
        cachedOptions,
        optionsCount,
        filteredOptionsCount,
        hoverIndex,
        handleOptionSelect,
        onOptionCreate,
        onOptionDestroy,
        selectWrapper,
        selected,
        setSelected,
        queryChange,
        groupQueryChange
      }) as unknown as SelectContext
    )

    onMounted(() => {
      // eslint-disable-next-line no-multi-assign
      states.cachedPlaceHolder = currentPlaceholder.value =
        props.placeholder || t('placeholder')
      if (
        props.multiple &&
        Array.isArray(props.modelValue) &&
        props.modelValue.length > 0
      ) {
        currentPlaceholder.value = ''
      }
      useResizeObserver(selectWrapper, handleResize)
      if (props.remote && props.multiple) {
        resetInputHeight()
      }
      nextTick(() => {
        const refEl = reference.value && reference.value.$el
        if (!refEl) return
        inputWidth.value = refEl.getBoundingClientRect().width

        if (ctx.slots.prefix) {
          const prefix = refEl.querySelector(`.${bemInput('prefix')}`)
          prefixWidth.value = Math.max(
            prefix.getBoundingClientRect().width + 5,
            30
          )
        }
      })
      setSelected()
    })

    if (props.multiple && !Array.isArray(props.modelValue)) {
      ctx.emit('update:modelValue', [])
    }
    if (!props.multiple && Array.isArray(props.modelValue)) {
      ctx.emit('update:modelValue', '')
    }

    const popperRef = computed(
      () => tooltipRef.value?.contentRef.value?.popupRef.value
    )

    useCustomInputValue(() => props.modelValue)

    return {
      isBem,
      bemInput,
      bemDropdown,
      tagInMultiLine,
      prefixWidth,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
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
      focus,

      reference,
      input,
      tooltipRef,
      popperRef,
      tags,
      selectWrapper,
      scrollbar,

      wrapperKls,
      selectTagsStyle,
      bem,
      tagTextStyle,
      handleMouseEnter,
      handleMouseLeave,
      isString
    }
  }
})
</script>
