// @ts-nocheck
import {
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  watchEffect,
  defineComponent,
  type PropType,
  type TeleportProps,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { isNumber, onClickOutside } from '@vueuse/core'
import { useCustomInputValue } from '@ryxon/use'
import {
  isArray,
  isString,
  makeStringProp,
  unknownProp,
  createNamespace
} from '../utils'
import { useExpose } from '../composables/use-expose'

// Components
import { Tooltip } from '../tooltip'
import { Scrollbar } from '../scrollbar'
import { Loading } from '../loading'
import type { TooltipPlacement, TooltipTheme } from '../tooltip'
import type { MentionOption } from './types'

const [name, bem] = createNamespace('mention')

export const mentionProps = {
  text: { type: String, default: '' },
  html: { type: String, default: '' },
  autoFocus: Boolean,
  targetClassName: String,
  options: { type: Array as PropType<MentionOption[]>, default: [] },
  prefix: {
    type: [String, Array] as PropType<string | string[]>,
    default: '@'
  },
  separator: {
    type: String,
    validator: (separator: string) => {
      if (separator.length !== 1) {
        console.warn('mention', "`separator`'s length must be 1.")
        return false
      }
      return true
    },
    default: ' '
  },
  placeholder: String,
  disabled: Boolean,
  loading: Boolean,
  theme: makeStringProp<TooltipTheme>('light'),
  placement: makeStringProp<TooltipPlacement>('bottom-start'), // Tooltip 组件出现的位置
  transition: { type: String, default: 'r-tooltip-zoom' }, // 动画名称
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },
  popperClass: unknownProp
}

export type MentionProps = ExtractPropTypes<typeof mentionProps>

export default defineComponent({
  name,
  props: mentionProps,
  emits: [
    'update:text',
    'update:html',
    'keyup',
    'keydown',
    'change',
    'search',
    'select',
    'paste'
  ],
  setup(props, { emit, slots }) {
    const activeNumber = ref<number>(0)
    const keyRef = ref<string>()
    const rangeRef = ref<Range>()
    const mentionElementRef = ref<HTMLElement>()

    const setCursorToNode = (targetElement: Node) => {
      const range = document.createRange()
      const selection = window.getSelection()
      range.setStartAfter(targetElement)
      range.setEndAfter(targetElement)
      // 清除之前的选区，并将新选区设置为当前选区
      selection?.removeAllRanges()
      selection?.addRange(range)
    }

    const setRangeRef = () => {
      const selection = document.getSelection()
      if (!selection) {
        return null
      }
      const range = selection.getRangeAt(0)
      rangeRef.value = range
    }

    const checkBlankSpaceNode = (node: HTMLElement) => {
      if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
        node = node.parentElement
      }
      const TARGET_CLASS_NAME = 'r-mention-blank-space'
      if (
        node &&
        node?.className === TARGET_CLASS_NAME &&
        node?.getAttribute('data-blank-space') === 'true'
      ) {
        return true
      }
      return false
    }

    const checkMentionTarget = (node: HTMLElement) => {
      const TARGET_CLASS_NAME = 'r-mention__target'

      if (
        node &&
        node.nodeType === Node.ELEMENT_NODE &&
        node.className &&
        node.className.includes(TARGET_CLASS_NAME)
      ) {
        return true
      }
      return false
    }

    const scrollbarRef = ref<HTMLElement | null>(null)
    const itemRef = ref(null)
    const scrollTop = (index?: number) => {
      if (!itemRef.value) return

      const { height } = getComputedStyle(itemRef.value)
      const y = isNumber(index)
        ? index
        : activeNumber.value * parseFloat(height)

      const { height: wrapHeight } = getComputedStyle(
        scrollbarRef.value?.wrapRef.value
      )

      const contentHeight = parseFloat(wrapHeight) - parseFloat(height)

      if (y > contentHeight) {
        scrollbarRef.value?.scrollTo(0, y - contentHeight)
      } else {
        scrollbarRef.value?.scrollTo(0, 0)
      }
    }

    // 弹窗出现的位置
    const root = ref<HTMLElement>()
    const positionStyle = ref({
      position: 'absolute',
      width: '0px',
      height: '0px',
      left: '0px',
      top: '0px'
    })
    const handleAddMention = () => {
      if (!rangeRef.value) return

      const range = rangeRef.value // 是用于管理选择范围的通用对象
      const rect = range.getBoundingClientRect() // 择一些文本并将获得所选文本的范围
      const inputRect = root.value?.getBoundingClientRect()

      positionStyle.value.left = (rect?.x || 0) - (inputRect?.x || 0) + 'px'

      let y = (rect?.y || 0) - (inputRect?.y || 0)
      if (['bottom', 'bottom-start', 'bottom-end'].includes(props.placement)) {
        y = y + (rect?.height || 0)
      }
      positionStyle.value.top = y + 'px'
    }

    const isMentionMode = ref(false)
    const partialPatternRef = ref<string>('')
    const filteredOptions = computed(() => {
      const { value: pattern } = partialPatternRef

      const filterOptions = props.options.filter((option) => {
        if (!pattern) return true
        if (isString(option.label)) {
          return option.label.startsWith(pattern)
        }
        if (isString(option.value)) {
          return option.value.startsWith(pattern)
        }
        return false
      })

      if (filterOptions.length === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        isMentionMode.value = false
      }

      return filterOptions
    })

    watch(isMentionMode, (value) => {
      if (value) {
        activeNumber.value = 0
        scrollTop()
      } else {
        cachedPrefix = null
      }
    })

    // 监听是否点击在弹窗上
    const tooltipRef = ref()
    onClickOutside(
      computed(() => tooltipRef.value?.contentRef.value?.popupRef.value),
      () => {
        isMentionMode.value = false
      }
    )

    const searchValueRef = ref<string | null>(null)
    const getSearchValue = () => {
      const range = rangeRef.value
      if (!range || !range?.startContainer || props.disabled) {
        isMentionMode.value = false
        return ''
      }
      const targetNode = range?.startContainer
      const cursorOffset = range?.startOffset
      // 获取的数据中出现ASCII值32和160两种情况(空格的ASCII值是32，而ASCII值为160的空格是不间断空格) 先替换成32的在计算
      const nodeValue = (targetNode.nodeValue ?? '').replaceAll(
        '\u00A0',
        '\u0020'
      )

      const { separator, prefix } = props
      const prefixArray = isString(prefix) ? [prefix] : prefix
      for (let i = cursorOffset - 1; i >= 0; --i) {
        const char = nodeValue?.[i]

        if (char === separator || char === '\n' || char === '\r') {
          isMentionMode.value = false
          return
        }

        if (prefixArray.includes(char)) {
          const partialPattern = nodeValue.slice(i + 1, cursorOffset)
          cachedPrefix = char
          isMentionMode.value = true

          // 如果数据重复就不再继续触发该事件了
          if (searchValueRef.value !== partialPattern) {
            emit('search', partialPattern, char)
            partialPatternRef.value = partialPattern
          }
          searchValueRef.value = partialPattern

          return
        }
      }

      isMentionMode.value = false
    }

    // 更新文本值
    const handleInput = () => {
      emit('update:html', mentionElementRef.value?.innerHTML)
      emit('update:text', mentionElementRef.value?.innerText)
      emit('change', mentionElementRef.value?.innerText)
    }

    useCustomInputValue(() => props.text)

    // 在光标位置插入内容
    const insertContent = (
      content: HTMLSpanElement | Array<HTMLSpanElement>,
      isPrefix?: boolean
    ) => {
      const range = rangeRef.value
      if (!range?.startContainer) return

      const targetNode = range.startContainer
      const cursorOffset = range.startOffset
      let targetIndex
      // 获取的数据中出现ASCII值32和160两种情况(空格的ASCII值是32，而ASCII值为160的空格是不间断空格) 先替换成32的在计算
      const nodeValue = (targetNode.nodeValue ?? '').replaceAll(
        '\u00A0',
        '\u0020'
      )

      // 判断是不是需要删除prefix字段
      if (isPrefix) {
        const { prefix } = props
        const prefixArray = isString(prefix) ? [prefix] : prefix
        for (let i = cursorOffset; i >= 0; i--) {
          if (prefixArray.includes(nodeValue?.[i])) {
            targetIndex = i
            break
          }
        }
      } else {
        targetIndex = cursorOffset
      }

      if (!isNumber(targetIndex)) return

      const fragment = document.createDocumentFragment()
      const preTextNode = document.createTextNode(
        nodeValue.slice(0, targetIndex)
      )
      const blankNode = document.createTextNode('\u200B')
      const postTextNode = document.createTextNode(
        nodeValue.slice(cursorOffset)
      )

      fragment.appendChild(preTextNode)
      const arrHtml = isArray(content) ? content : [content]
      arrHtml.forEach((fragmentHtml) => {
        fragment.appendChild(fragmentHtml)
      })
      fragment.appendChild(blankNode)
      fragment.appendChild(postTextNode)

      if (targetNode.nodeType === Node.TEXT_NODE && targetNode.parentElement) {
        targetNode.parentElement.replaceChild(fragment, targetNode)
      } else {
        targetNode.replaceChild(fragment, targetNode.childNodes[0])
      }

      // 创建一个只包含空格的元素节点，存放焦点信息
      setCursorToNode(blankNode)

      handleInput()
    }

    // 创建一个选区，选中当前<span>标签，删除时，可以一并删除。
    const onAddRange = (event: MouseEvent) => {
      const { target } = event
      if (!target) return
      const selection = document.getSelection()
      const range = document.createRange()
      range.setStart(target, 0)
      range.setEnd(target.nextSibling, target?.nextSibling?.childNodes?.length)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }

    // 选中数据
    let cachedPrefix: string | null = null
    const handleSelect = (item: MentionOption) => {
      const { separator, targetClassName } = props

      // 当前选项被禁用了
      if (item.disabled) return

      const spanElement = document.createElement('span')
      spanElement.className = `r-mention__target ${targetClassName || ''}`
      spanElement.innerText = `${cachedPrefix}${item.label}`
      spanElement.contentEditable = 'false'
      spanElement.addEventListener('click', onAddRange)
      const blankSpanNode = document.createElement('span')
      blankSpanNode.innerHTML = separator
      blankSpanNode.setAttribute('data-blank-space', 'true')
      blankSpanNode.className = 'r-mention-blank-space'

      insertContent([spanElement, blankSpanNode], true)

      isMentionMode.value = false

      emit('select', item)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      keyRef.value = key
      const BACKSPACE_KEY = 'Backspace'

      if (
        (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') &&
        isMentionMode.value
      ) {
        event.preventDefault()

        if (key === 'ArrowUp') {
          activeNumber.value =
            activeNumber.value <= 0
              ? filteredOptions.value.length - 1
              : activeNumber.value - 1
          scrollTop()
        } else if (key === 'ArrowDown') {
          activeNumber.value =
            activeNumber.value >= filteredOptions.value.length - 1
              ? 0
              : activeNumber.value + 1
          scrollTop()
        } else {
          // Enter
          const pendingOptionTmNode = filteredOptions.value[activeNumber.value]
          if (pendingOptionTmNode) {
            handleSelect(pendingOptionTmNode)
          } else {
            isMentionMode.value = false
          }
        }
      }

      emit('keydown')

      const selection = document.getSelection()
      const range = selection?.getRangeAt(0)
      const startContainer = range?.startContainer

      if (key === BACKSPACE_KEY && checkMentionTarget(startContainer)) {
        event.preventDefault()
      }
    }

    const handleKeyUp = () => {
      const key = keyRef.value
      const BACKSPACE_KEY = 'Backspace'
      const selection = document.getSelection()
      const range = selection?.getRangeAt(0)
      const startContainer = range?.startContainer
      const previousSibling = startContainer?.parentElement?.previousSibling
      const nextSibling = startContainer?.nextSibling

      // 选中删除，需要重设光标为删除节点之前的位置，否则将保留样式
      if (key === BACKSPACE_KEY && checkMentionTarget(startContainer)) {
        const beforeStartContainer = startContainer?.previousSibling
        startContainer?.remove()
        if (nextSibling && checkBlankSpaceNode(nextSibling)) {
          nextSibling.remove()
        }
        setCursorToNode(beforeStartContainer)
      }

      // 删除，当前是空占位节点 & 空占位节点前一个节点是目标节点
      if (
        key === BACKSPACE_KEY &&
        checkBlankSpaceNode(startContainer) &&
        checkMentionTarget(previousSibling)
      ) {
        if (startContainer?.nodeType === Node.TEXT_NODE) {
          startContainer?.parentElement?.remove()
        } else {
          startContainer?.remove()
        }
        previousSibling?.remove()
      }

      emit('keyup', startContainer, previousSibling)

      setRangeRef()

      handleAddMention()
      getSearchValue()
    }

    const handlePaste = (e) => {
      emit('paste', e)
    }

    // 初始化显示
    onMounted(() => {
      if (mentionElementRef.value) {
        if (props.html) {
          mentionElementRef.value.innerHTML = props.html
        } else {
          mentionElementRef.value.innerText = props.text
        }
      }
    })

    // 自动聚焦
    watchEffect(() => {
      if (props.autoFocus && !props.disabled) {
        nextTick(() => {
          mentionElementRef?.value?.focus()
        })
      }
    })

    useExpose({
      focus: () => {
        mentionElementRef?.value?.focus()
      },
      blur: () => {
        mentionElementRef?.value?.blur()
      },
      onAddRange,
      insertContent
    })

    return () => (
      <div ref={root} class={bem({ disabled: props.disabled })}>
        <Scrollbar class={bem('content')}>
          <div
            ref={mentionElementRef}
            contenteditable
            class={bem('editor', { disabled: props.disabled })}
            placeholder={props.placeholder}
            onKeydown={handleKeyDown}
            onKeyup={handleKeyUp}
            onPaste={handlePaste}
            onInput={handleInput}
          ></div>
          {slots.default?.()}
        </Scrollbar>

        <Tooltip
          ref={tooltipRef}
          visible={isMentionMode.value}
          popperClass={[bem('popup'), props.popperClass!]}
          placement={props.placement}
          showArrow={false}
          theme={props.theme}
          teleport={props.teleport}
          transition={props.transition}
        >
          {{
            default: () => (
              <div style={positionStyle.value as CSSProperties}></div>
            ),
            content: () => (
              <Scrollbar ref={scrollbarRef} tag="div">
                {props.loading ? (
                  slots.loading ? (
                    slots.loading()
                  ) : (
                    <Loading></Loading>
                  )
                ) : (
                  filteredOptions.value.map((item, i) => (
                    <div
                      ref={itemRef}
                      class={[
                        bem('item'),
                        item.class,
                        {
                          disabled: item.disabled,
                          active: i === activeNumber.value
                        }
                      ]}
                      style={item.style}
                      onClick={() => handleSelect(item)}
                    >
                      {slots.item
                        ? slots.item({ row: item, index: i })
                        : item.label}
                    </div>
                  ))
                )}
              </Scrollbar>
            )
          }}
        </Tooltip>
      </div>
    )
  }
})
