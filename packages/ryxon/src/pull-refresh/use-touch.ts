import { ref, computed, onBeforeUnmount, type ExtractPropTypes } from 'vue'
import { useEventListener } from '@vueuse/core'
import { truthProp, isTouchEvent } from '@ryxon/utils'
import { getPreciseEventTarget } from '../carousel/utils'

export type TouchDirection = '' | 'horizontal' | 'vertical'

export const touchProps = {
  touchable: truthProp,
  draggable: truthProp,
  mousewheel: Boolean
}

export type TouchProps = ExtractPropTypes<typeof touchProps>

// 只允许一个全局触发触摸
let globalDragging = false

export function useDragTouch(
  props: TouchProps,
  onStart: () => void,
  onMove: (offset: number) => void,
  onEnd: () => void,
  onReset?: () => void,
  onMousewheel?: (event: WheelEvent) => void
) {
  const direction = ref<TouchDirection>('')

  const slidesElRef = ref<HTMLDivElement | null>(null)
  const verticalRef = computed(() => direction.value === 'vertical')

  let dragStartX = 0
  let dragStartY = 0
  const dragging = ref(false)

  let cleanTouchmove: () => void
  let cleanTouchend: () => void
  let cleanTouchcancel: () => void
  let cleanMousemove: () => void
  let cleanMouseup: () => void

  const handleTouchmove = (event: MouseEvent | TouchEvent): void => {
    const { value: vertical } = verticalRef
    const touchEvent = isTouchEvent(event) ? event.touches[0] : event

    const offset = vertical
      ? touchEvent.clientY - dragStartY
      : touchEvent.clientX - dragStartX

    if (event.cancelable) {
      event.preventDefault()
    }

    onMove(offset)
  }

  const handleTouchend = () => {
    onEnd()
    resetDragStatus()
  }

  const handleTouchstart = (event: MouseEvent | TouchEvent): void => {
    if (globalDragging) return
    if (
      !slidesElRef.value?.contains(getPreciseEventTarget(event) as Node | null)
    ) {
      return
    }
    globalDragging = true
    dragging.value = true

    onStart()

    if (
      event.type !== 'touchstart' &&
      !(event.target as HTMLElement).isContentEditable
    ) {
      event.preventDefault()
    }
    const touchEvent = isTouchEvent(event) ? event.touches[0] : event
    if (verticalRef.value) {
      dragStartY = touchEvent.clientY
    } else {
      dragStartX = touchEvent.clientX
    }

    if (props.touchable) {
      cleanTouchmove = useEventListener(
        slidesElRef,
        'touchmove',
        handleTouchmove,
        { passive: true }
      )
      cleanTouchend = useEventListener(slidesElRef, 'touchend', handleTouchend)
      cleanTouchcancel = useEventListener(
        slidesElRef,
        'touchcancel',
        handleTouchend
      )
    }
    if (props.draggable) {
      cleanMousemove = useEventListener(
        slidesElRef,
        'mousemove',
        handleTouchmove
      )
      cleanMouseup = useEventListener(slidesElRef, 'mouseup', handleTouchend)
    }
  }

  const resetDragStatus = (): void => {
    if (dragging.value) {
      globalDragging = false
    }

    dragging.value = false
    dragStartX = 0
    dragStartY = 0

    onReset?.()

    cleanTouchmove && cleanTouchmove()
    cleanTouchend && cleanTouchend()
    cleanTouchcancel && cleanTouchcancel()
    cleanMousemove && cleanMousemove()
    cleanMouseup && cleanMouseup()
  }

  onBeforeUnmount(() => {
    resetDragStatus()
  })

  // 鼠标滚轮事件
  const handleMousewheel = (event: WheelEvent): void => {
    onMousewheel?.(event)
  }

  const controlListeners = computed(() => ({
    onTouchstartPassive: props.touchable ? handleTouchstart : undefined,
    onMousedown: props.draggable ? handleTouchstart : undefined,
    onWheel: props.mousewheel ? handleMousewheel : undefined
  }))

  return {
    dragging,
    direction,
    slidesElRef,
    controlListeners
  }
}
