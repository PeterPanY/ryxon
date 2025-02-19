import {
  ref,
  watch,
  computed,
  nextTick,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Utils
import { cellSharedProps } from '../cell/Cell'
import { pick, extend } from '@ryxon/utils'
import { createNamespace } from '../utils'

// Composables
import { raf, doubleRaf } from '@ryxon/use'
import { useLazyRender } from '../composables/use-lazy-render'

// Components
import { Cell } from '../cell'
import type { CollapseSsrItem } from './types'

const [name] = createNamespace('collapse-item-ssr')
const [, bem] = createNamespace('collapse-item')

const CELL_SLOTS = ['icon', 'title', 'value', 'label', 'right-icon'] as const

export const collapseItemProps = {
  item: {
    type: Object as PropType<CollapseSsrItem>,
    default: () => null
  },
  index: Number,
  isExpanded: { type: Function, default: () => {} },
  toggle: { type: Function, default: () => {} }
}

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export default defineComponent({
  name,

  props: collapseItemProps,

  setup(props, { slots }) {
    const wrapperRef = ref<HTMLElement>()
    const contentRef = ref<HTMLElement>()

    const itemProps = extend(
      {},
      { border: true, isLink: true, lazyRender: true },
      props.item
    )

    const name = computed(() => itemProps.name ?? props.index)
    const expanded = computed(() => props.isExpanded(name.value))

    const show = ref(expanded.value)
    const lazyRender = useLazyRender(() => show.value || !itemProps.lazyRender)

    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false
      } else if (wrapperRef.value) {
        wrapperRef.value.style.height = ''
      }
    }

    watch(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return
      }

      if (value) {
        show.value = true
      }

      // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`
      const tick = value ? nextTick : raf

      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return
        }

        const { offsetHeight } = contentRef.value
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`
          wrapperRef.value.style.height = value ? '0' : contentHeight

          // use double raf to ensure animation can start
          doubleRaf(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.height = value ? contentHeight : '0'
            }
          })
        } else {
          onTransitionEnd()
        }
      })
    })

    const toggle = (newValue = !expanded.value) => {
      props.toggle(name.value, newValue)
    }

    const onClickTitle = () => {
      if (!itemProps.disabled && !itemProps.readonly) {
        toggle()
      }
    }

    const renderTitle = () => {
      const { border, disabled, readonly } = itemProps

      const attrs = pick(itemProps, Object.keys(cellSharedProps))

      if (readonly) {
        attrs.isLink = false
      }
      if (disabled || readonly) {
        attrs.clickable = false
      }

      return (
        <Cell
          v-slots={pick(slots, CELL_SLOTS)}
          role="button"
          class={bem('title', {
            disabled,
            expanded: expanded.value,
            borderless: !border
          })}
          aria-expanded={String(expanded.value)}
          onClick={onClickTitle}
          {...attrs}
        />
      )
    }

    const renderContent = lazyRender(() => (
      <div
        v-show={show.value}
        ref={wrapperRef}
        class={bem('wrapper')}
        onTransitionend={onTransitionEnd}
      >
        <div ref={contentRef} class={bem('content')}>
          {slots.default ? slots.default() : itemProps.content}
        </div>
      </div>
    ))

    return () => (
      <div class={[bem({ border: props.index && itemProps.border })]}>
        {renderTitle()}
        {renderContent()}
      </div>
    )
  }
})
