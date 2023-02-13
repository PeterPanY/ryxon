import {
  ref,
  toRef,
  inject,
  computed,
  Transition,
  onBeforeUnmount,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

import { createNamespace } from '../utils'
import { scrollbarContextKey } from './token'
import { isClient, useEventListener } from '@vueuse/core'
import { BAR_MAP, renderThumbStyle } from './util'

const [, bem] = createNamespace('scrollbar')

export const scrollbarThumbProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: { type: Number, default: 0, required: true },
  always: Boolean
}

export type ScrollbarThumbProps = ExtractPropTypes<typeof scrollbarThumbProps>

export default defineComponent({
  name: 'RScrollbarThumb',
  props: scrollbarThumbProps,
  emits: ['mousemove', 'mouseleave'],
  setup(props) {
    const scrollbar = inject(scrollbarContextKey)

    if (!scrollbar) {
      return
    }

    const instance = ref<HTMLDivElement>()
    const thumb = ref<HTMLDivElement>()

    const thumbState = ref<Partial<Record<'X' | 'Y', number>>>({})
    const visible = ref(false)

    let cursorDown = false
    let cursorLeave = false
    let originalOnSelectStart:
      | ((this: GlobalEventHandlers, ev: Event) => any)
      | null = isClient ? document.onselectstart : null

    const bar = computed(
      () => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    )

    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    )

    const offsetRatio = computed(
      () =>
        // offsetRatioX = original width of thumb / current width of thumb / ratioX
        // offsetRatioY = original height of thumb / current height of thumb / ratioY
        // instance height = wrap height - GAP
        instance.value![bar.value.offset] ** 2 /
        scrollbar.wrapElement![bar.value.scrollSize] /
        props.ratio /
        thumb.value![bar.value.offset]
    )

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!instance.value || !thumb.value) return
      if (cursorDown === false) return

      const prevPage = thumbState.value[bar.value.axis]
      if (!prevPage) return

      const offset =
        (instance.value.getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]) *
        -1
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100 * offsetRatio.value) /
        instance.value[bar.value.offset]
      scrollbar.wrapElement[bar.value.scroll] =
        (thumbPositionPercentage *
          scrollbar.wrapElement[bar.value.scrollSize]) /
        100
    }

    const restoreOnselectstart = () => {
      if (document.onselectstart !== originalOnSelectStart)
        document.onselectstart = originalOnSelectStart
    }

    const mouseUpDocumentHandler = () => {
      cursorDown = false
      thumbState.value[bar.value.axis] = 0
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
      restoreOnselectstart()
      if (cursorLeave) visible.value = false
    }

    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation()
      cursorDown = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      originalOnSelectStart = document.onselectstart
      document.onselectstart = () => false
    }

    const clickThumbHandler = (e: MouseEvent) => {
      // prevent click event of middle and right button
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) return

      window.getSelection()?.removeAllRanges()
      startDrag(e)

      const el = e.currentTarget as HTMLDivElement
      if (!el) return
      thumbState.value[bar.value.axis] =
        el[bar.value.offset] -
        (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
    }

    const clickTrackHandler = (e: MouseEvent) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement) return

      const offset = Math.abs(
        (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]
      )
      const thumbHalf = thumb.value[bar.value.offset] / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100 * offsetRatio.value) /
        instance.value[bar.value.offset]

      scrollbar.wrapElement[bar.value.scroll] =
        (thumbPositionPercentage *
          scrollbar.wrapElement[bar.value.scrollSize]) /
        100
    }

    // 鼠标移入
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.value = !!props.size
    }

    // 鼠标移出
    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true
      visible.value = cursorDown
    }

    onBeforeUnmount(() => {
      restoreOnselectstart()
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
    })

    useEventListener(
      toRef(scrollbar, 'scrollbarElement'),
      'mousemove',
      mouseMoveScrollbarHandler
    )
    useEventListener(
      toRef(scrollbar, 'scrollbarElement'),
      'mouseleave',
      mouseLeaveScrollbarHandler
    )

    return () => (
      <Transition name="r-scrollbar-fade">
        <div
          v-show={props.always || visible.value}
          ref={instance}
          class={[bem('bar'), `is-${bar.value.key}`]}
          onMousedown={clickTrackHandler}
        >
          <div
            ref={thumb}
            class={bem('thumb')}
            style={thumbStyle.value}
            onMousedown={clickThumbHandler}
          ></div>
        </div>
      </Transition>
    )
  }
})
