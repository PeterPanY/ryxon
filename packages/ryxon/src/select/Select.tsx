// @ts-nocheck
import {
  h,
  unref,
  toRefs,
  provide,
  nextTick,
  reactive,
  computed,
  onMounted,
  Transition,
  defineComponent,
  type PropType,
  type TeleportProps,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  isString,
  iconPropType,
  makeStringProp,
  ComponentSize,
  createNamespace,
  isValidComponentSize
} from '../utils'
import { useSelect, useSelectStates } from './useSelect'
import { selectKey, type SelectContext } from './token'
import { useResizeObserver } from '@vueuse/core'

import { ArrowDown, CircleClose } from '@ryxon/icons'

// Components
import { Tooltip } from '../tooltip'
import { Input } from '../input'
import { Icon } from '../icon'
import RSelectMenu from './SelectDropdown'
import { Scrollbar } from '../scrollbar'
import { Option } from '../option'
import { Tag, type TagType } from '../tag'
import { useCustomInputValue } from '@ryxon/use'

// Types
import { SelectTheme, SelectPlacement } from './types'

const [, bem, t, isBem] = createNamespace('select')
const [, bemInput] = createNamespace('input')
const [, bemDropdown] = createNamespace('select-dropdown')

// select传值
export const selectProps = {
  id: String,
  // 选中项绑定值
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined
  },
  multiple: Boolean, // 是否多选
  disabled: Boolean, // 是否禁用
  valueKey: { type: String, default: 'value' }, // 作为 value 唯一标识的键名，绑定值为对象类型时必填
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
    validator: isValidComponentSize
  },
  clearable: Boolean, // 是否可以清空选项
  collapseTags: Boolean, // 多选时是否将选中值按文字的形式展示
  collapseTagsTooltip: { type: Boolean, default: false }, // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
  multipleLimit: { type: Number, default: 0 }, // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
  name: String, // Select 输入框的原生 name 属性
  theme: makeStringProp<SelectTheme>('light'),
  autocomplete: { type: String, default: 'off' }, // Select 输入框的原生 autocomplete 属性
  placeholder: String, // 占位符
  filterable: Boolean, // Select 组件是否可筛选
  allowCreate: Boolean, // 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
  filterMethod: Function, // 自定义筛选方法
  remote: Boolean, // 其中的选项是否从服务器远程加载
  remoteMethod: Function, // 自定义远程搜索方法
  remoteShowSuffix: { type: Boolean, default: false }, // 远程搜索方法显示后缀图标
  loading: Boolean, // 是否正在从远程获取数据
  loadingText: String, // 从服务器加载内容时显示的文本
  noMatchText: String, // 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置
  noDataText: String, // 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容
  popperClass: { type: String, default: '' }, // 选择器下拉菜单的自定义类名
  reserveKeyword: { type: Boolean, default: true },
  defaultFirstOption: Boolean, // 是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },
  automaticDropdown: Boolean, // 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单
  clearIcon: { type: iconPropType, default: CircleClose }, // 自定义清除图标
  fitInputWidth: { type: Boolean, default: false }, // 下拉框的宽度是否与输入框相同
  suffixIcon: { type: iconPropType, default: ArrowDown }, // 自定义后缀图标组件
  suffixTransition: { type: Boolean, default: true }, // 下拉菜单显示/消失时后缀图标的动画
  tagType: makeStringProp<TagType>('info'),
  placement: makeStringProp<SelectPlacement>('bottom')
}

// Select传参数据类型
export type SelectProps = ExtractPropTypes<typeof selectProps>

export default defineComponent({
  name: 'RSelect',
  props: selectProps,
  emits: [
    'blur',
    'focus',
    'clear',
    'change',
    'remove-tag',
    'visible-change',
    'update:modelValue'
  ],
  setup(props, ctx) {
    const { emit, slots } = ctx

    const states = useSelectStates(props)
    const {
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deleteTag,
      handleOptionSelect,
      setSelected,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      handleComposition,
      onOptionCreate,
      onOptionDestroy,
      handleMenuEnter,
      handleFocus,
      handleBlur,
      handleClearClick,
      handleClose,
      toggleMenu,
      handleKeydown,
      getValueKey,
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

    const {
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      options,
      cachedOptions,
      optionsCount,
      prefixWidth,
      tagInMultiLine
    } = toRefs(states)

    // 监听点击元素外部的事件。
    const clickss = (event) => {
      const isClickOut =
        tooltipRef.value?.contentRef.value?.popupRef.value?.contains(
          event.target
        )

      const isSelectOut = selectWrapper.value?.contains(event.target)

      if (!isSelectOut && !isClickOut) {
        handleClose()
      }
    }

    window.addEventListener('click', clickss)

    const wrapperKls = computed(() => {
      const classList = [bem()]

      // 大小
      const _selectSize = unref(selectSize)
      if (_selectSize !== 'default') {
        classList.push(bem(_selectSize))
      }
      // 是否禁用
      if (props.disabled) {
        classList.push(bem('disabled'))
      }
      return classList
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

    // 鼠标进入触发元素
    const defaultMouseenter = () => {
      inputHovering.value = true
    }

    // 鼠标进入离开元素
    const defaultMouseleave = () => {
      inputHovering.value = false
    }

    onMounted(() => {
      currentPlaceholder.value = props.placeholder || t('rSelect.placeholder')
      states.cachedPlaceHolder = currentPlaceholder.value

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

      // 初始化选中项
      setSelected()
    })

    if (props.multiple && !Array.isArray(props.modelValue)) {
      emit('update:modelValue', [])
    }

    if (!props.multiple && Array.isArray(props.modelValue)) {
      emit('update:modelValue', '')
    }

    // 多选
    const multipleHtml = () => {
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

      // 选中值不折叠标签
      const renderSelected = (item: any) => {
        const { isDisabled, hitState, currentLabel } = item
        return (
          <Tag
            key={getValueKey(item)}
            closeable={!selectDisabled.value && !isDisabled}
            size={collapseTagSize.value}
            hit={hitState}
            type={props.tagType}
            disable-transitions={true}
            onClose={(event) => deleteTag(event, item)}
          >
            <span
              class={bem('tags-text')}
              style={{ maxWidth: inputWidth.value - 75 + 'px' }}
            >
              {currentLabel}
            </span>
          </Tag>
        )
      }

      // 选中不折叠下tooltip详情展示
      const renderSelectedTooltip = (item: any, index: number) => {
        const { isDisabled, hitState, currentLabel } = item
        return (
          <div key={index} class={bem('collapse-tag')}>
            <Tag
              key={getValueKey(item)}
              class="in-tooltip"
              closeable={!selectDisabled.value && !isDisabled}
              size={collapseTagSize.value}
              hit={hitState}
              type={props.tagType}
              disable-transitions={true}
              style={{ margin: '2px' }}
              onClose={(event) => deleteTag(event, item)}
            >
              <span
                class={bem('tags-text')}
                style={{ maxWidth: inputWidth.value - 75 + 'px' }}
              >
                {currentLabel}
              </span>
            </Tag>
          </div>
        )
      }

      // 折叠标签下详情提示插槽
      const tagsTooltipSlot = {
        default: () => (
          <span class={bem('tags-text')}>+ {selected.value.length - 1}</span>
        ),
        content: () => (
          <div class={bem('collapse-tags')}>
            {selected.value.slice(1).map(renderSelectedTooltip)}
          </div>
        )
      }

      return (
        <div ref={tags} class={bem('tags')} style={selectTagsStyle.value}>
          {/* 选中值折叠 */}
          {props.collapseTags && selected.value.length > 0 && (
            <span
              class={[
                bem('tags-wrapper'),
                { 'has-prefix': prefixWidth.value && selected.value.length }
              ]}
            >
              <Tag
                closeable={
                  !selectDisabled.value && !selected.value[0].isDisabled
                }
                size={collapseTagSize.value}
                hit={selected.value[0].hitState}
                type={props.tagType}
                disable-transitions={true}
                onClose={(event) => deleteTag(event, selected.value[0])}
              >
                <span class={bem('tags-text')} style={tagTextStyle.value}>
                  {selected.value[0].currentLabel}
                </span>
              </Tag>

              {selected.value.length > 1 && (
                <Tag
                  closeable={false}
                  size={collapseTagSize.value}
                  type={props.tagType}
                  disable-transitions={true}
                >
                  {props.collapseTagsTooltip ? (
                    <Tooltip
                      lazyRender={false}
                      disabled={dropMenuVisible.value}
                      theme={props.theme}
                      placement="bottom"
                      teleport={props.teleport}
                      v-slots={tagsTooltipSlot}
                    ></Tooltip>
                  ) : (
                    <span class={bem('tags-text')}>
                      + {selected.value.length - 1}
                    </span>
                  )}
                </Tag>
              )}
            </span>
          )}

          {/* 选中值不折叠 */}
          {!props.collapseTags && (
            <Transition onAfterLeave={resetInputHeight}>
              <span
                class={[
                  bem('tags-wrapper'),
                  { 'has-prefix': prefixWidth.value && selected.value.length }
                ]}
              >
                {selected.value.map(renderSelected)}
              </span>
            </Transition>
          )}

          {/* 搜索框 */}
          {props.filterable && (
            <input
              ref={input}
              v-model={query.value}
              type="text"
              class={[bem('input'), isBem(selectSize.value)]}
              disabled={selectDisabled.value}
              autocomplete={props.autocomplete}
              style={{
                marginLeft:
                  (prefixWidth.value && !selected.value.length) ||
                  tagInMultiLine.value
                    ? `${prefixWidth.value}px`
                    : '',
                flexGrow: 1,
                width: `${inputLength.value / (inputWidth.value - 32)}%`,
                maxWidth: `${inputWidth.value - 42}px`
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyup={managePlaceholder}
              onCompositionstart={handleComposition}
              onCompositionupdate={handleComposition}
              onCompositionend={handleComposition}
              onInput={debouncedQueryChange}
              onKeydown={handleKeydown}
            ></input>
          )}
        </div>
      )
    }

    const inputSlots = {
      'left-icon': () => (
        <>
          {slots.prefix && (
            <div style="height: 100%;display: flex;justify-content: center;align-items: center;">
              {slots.prefix()}
            </div>
          )}
        </>
      ),
      'right-icon': () => (
        <>
          {iconComponent.value && !showClose.value && (
            <Icon
              name={isString(iconComponent.value) ? iconComponent.value : ''}
              class={[bem('caret'), bem('icon'), iconReverse.value]}
            >
              {!isString(iconComponent.value) && h(iconComponent.value)}
            </Icon>
          )}
          {showClose.value && props.clearIcon && (
            <Icon
              name={isString(props.clearIcon) ? props.clearIcon : ''}
              class={[bem('caret'), bem('icon')]}
              onClick={handleClearClick}
            >
              {!isString(props.clearIcon) && h(props.clearIcon)}
            </Icon>
          )}
        </>
      )
    }

    const inputFocus = computed(() => (visible.value ? 'is-focus' : ''))
    const inputTabindex = computed(() =>
      props.multiple && props.filterable ? -1 : undefined
    )

    const tooltipSlots = {
      default: () => (
        <div
          class="select-trigger"
          onMouseenter={defaultMouseenter}
          onMouseleave={defaultMouseleave}
        >
          {/* 多选展示 */}
          {props.multiple && multipleHtml()}
          {/* 选项框 */}
          <Input
            id={props.id}
            type="text"
            ref={reference}
            v-model={selectedLabel.value}
            v-slots={inputSlots}
            placeholder={currentPlaceholder.value}
            autocomplete={props.autocomplete}
            disabled={selectDisabled.value}
            readonly={readonly.value}
            class={inputFocus.value}
            tabindex={inputTabindex.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={debouncedOnInputChange}
            onPaste={debouncedOnInputChange}
            onCompositionstart={handleComposition}
            onCompositionupdate={handleComposition}
            onCompositionend={handleComposition}
            onKeydown={handleKeydown}
          ></Input>
        </div>
      ),
      content: () => (
        <RSelectMenu>
          <Scrollbar
            v-show={options.value.size > 0 && !props.loading}
            ref={scrollbar}
            tag="ul"
            wrap-class={bemDropdown('wrap')}
            view-class={bemDropdown('list')}
            class={[
              !props.allowCreate &&
              Boolean(query.value) &&
              filteredOptionsCount.value === 0
                ? 'is-empty'
                : ''
            ]}
          >
            {showNewOption.value && (
              <Option value={query.value} created={true}></Option>
            )}
            {slots.default?.()}
          </Scrollbar>
          {/* 数据为空时的提示 */}
          {emptyText.value &&
            (!props.allowCreate ||
              props.loading ||
              (props.allowCreate && options.value.size === 0)) &&
            (slots.empty ? (
              slots.empty()
            ) : (
              <p class={bemDropdown('empty')}>{emptyText.value}</p>
            ))}
        </RSelectMenu>
      )
    }

    useCustomInputValue(() => props.modelValue)

    return () => (
      <div
        ref={selectWrapper}
        class={wrapperKls.value}
        onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
        onClick={toggleMenu}
      >
        <Tooltip
          ref={tooltipRef}
          visible={dropMenuVisible.value}
          lazyRender={false}
          theme={props.theme}
          trigger="click"
          placement={props.placement}
          teleport={props.teleport}
          popper-class={[bem('popper'), props.popperClass]}
          v-slots={tooltipSlots}
          onShow={handleMenuEnter}
        ></Tooltip>
      </div>
    )
  }
})
