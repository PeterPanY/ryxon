import {
  h,
  ref,
  watch,
  onMounted,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

// Composables
import { useEventListener } from '@ryxon/use'

// Utils
import {
  isString,
  iconPropType,
  makeNumericProp,
  makeStringProp,
  createNamespace
} from '../utils'
import type { TextEllipsisType } from './types'

import { Icon } from '../icon'
import { ArrowDown, ArrowUp } from '@ryxon/icons'

const [name, bem] = createNamespace('text-ellipsis')

export const textEllipsisProps = {
  rows: makeNumericProp(1),
  content: makeStringProp(''),
  expandText: iconPropType || makeStringProp(''),
  collapseText: iconPropType || makeStringProp(''),
  isTextRight: Boolean,
  isHtml: Boolean,
  textType: makeStringProp<TextEllipsisType>('text'),
  defaultExpanded: Boolean
}

export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>

export default defineComponent({
  name,

  props: textEllipsisProps,

  emits: ['clickAction'],

  setup(props, { emit }) {
    const text = ref('')
    const expanded = ref(props.defaultExpanded)
    const hasAction = ref(false)
    const root = ref<HTMLElement>()

    const pxToNum = (value: string | null) => {
      if (!value) return 0
      const match = value.match(/^\d*(\.\d*)?/)
      return match ? Number(match[0]) : 0
    }

    // 计算文本
    const calcEllipsised = () => {
      const cloneContainer = () => {
        if (!root.value) return

        const originStyle = window.getComputedStyle(root.value)
        const container = document.createElement('div')
        const styleNames: string[] = Array.prototype.slice.apply(originStyle)
        styleNames.forEach((name) => {
          container.style.setProperty(name, originStyle.getPropertyValue(name))
        })

        container.style.position = 'fixed'
        container.style.zIndex = '-9999'
        container.style.top = '-9999px'
        container.style.height = 'auto'
        container.style.minHeight = 'auto'
        container.style.maxHeight = 'auto'

        if (props.isHtml) {
          container.innerHTML = props.content
        } else {
          container.innerText = props.content
        }

        document.body.appendChild(container)
        return container
      }

      // 计算显示的文本
      const calcEllipsisText = (
        container: HTMLDivElement,
        maxHeight: number
      ) => {
        const { content, expandText } = props
        const dot = '...'
        let left = 0
        let right = content.length
        let res = -1

        while (left <= right) {
          const mid = Math.floor((left + right) / 2)
          if (props.isHtml) {
            container.innerHTML = content.slice(0, mid) + dot + expandText
          } else {
            container.innerText = content.slice(0, mid) + dot + expandText
          }

          if (container.offsetHeight <= maxHeight) {
            left = mid + 1
            res = mid
          } else {
            right = mid - 1
          }
        }
        return content.slice(0, res)
      }

      const container = cloneContainer()
      if (!container) return

      const { paddingBottom, paddingTop, lineHeight } = container.style
      const maxHeight =
        (Number(props.rows) + 0.5) * pxToNum(lineHeight) +
        pxToNum(paddingTop) +
        pxToNum(paddingBottom)
      if (maxHeight < container.offsetHeight) {
        hasAction.value = true
        text.value = calcEllipsisText(container, maxHeight)
      } else {
        hasAction.value = false
        text.value = props.content
      }

      document.body.removeChild(container)
    }

    const onClickAction = (event: MouseEvent) => {
      expanded.value = !expanded.value
      emit('clickAction', event)
    }

    // 省略时提示
    const collapseText = () => {
      if (props.textType === 'icon') {
        return (
          <Icon name={isString(props.collapseText) ? props.collapseText : ''}>
            {props.collapseText ? (
              !isString(props.collapseText) && h(props.collapseText)
            ) : (
              <ArrowUp></ArrowUp>
            )}
          </Icon>
        )
      }
      return props.collapseText
    }

    // 展示时提示
    const expandText = () => {
      if (props.textType === 'icon') {
        return (
          <Icon name={isString(props.expandText) ? props.expandText : ''}>
            {props.expandText ? (
              !isString(props.expandText) && h(props.expandText)
            ) : (
              <ArrowDown></ArrowDown>
            )}
          </Icon>
        )
      }
      return props.expandText
    }

    const renderAction = () => (
      <span
        class={bem('dot', {
          right: props.isTextRight,
          html: props.isHtml
        })}
      >
        {expanded.value ? '' : '...'}
        <span class={bem('action')} onClick={onClickAction}>
          {expanded.value ? collapseText() : expandText()}
        </span>
      </span>
    )

    onMounted(calcEllipsised)

    watch(() => [props.content, props.rows], calcEllipsised)

    useEventListener('resize', calcEllipsised)

    return () => (
      <div ref={root} class={bem()}>
        {props.isHtml ? (
          <span innerHTML={expanded.value ? props.content : text.value}></span>
        ) : (
          <span>{expanded.value ? props.content : text.value}</span>
        )}
        {hasAction.value ? renderAction() : null}
      </div>
    )
  }
})
