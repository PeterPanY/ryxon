import { ref, computed, onBeforeUnmount, type ExtractPropTypes } from 'vue'
import { on, off } from 'evtd'
import { truthProp, isTouchEvent } from '../utils'
import { getPreciseEventTarget } from '../carousel/utils'

export type TouchDirection = '' | 'horizontal' | 'vertical'

export const touchProps = {
  touchable: truthProp,
  draggable: truthProp,
  mousewheel: Boolean
}

export type TouchProps = ExtractPropTypes<typeof touchProps>

export function useDragTouch(
  props: TouchProps,
  onStart: () => void,
  onMove: (offset: number) => void,
  onEnd: () => void,
  onMousewheel?: () => void
) {
  const direction = ref<TouchDirection>('')

  const slidesElRef = ref<HTMLDivElement | null>(null)
  const verticalRef = computed(() => direction.value === 'vertical')

  // 只允许一个全局触发触摸
  let globalDragging = false

  let dragStartX = 0
  let dragStartY = 0
  let dragging = false

  const handleTouchmove = (event: MouseEvent | TouchEvent): void => {
    const { value: vertical } = verticalRef
    const touchEvent = isTouchEvent(event) ? event.touches[0] : event

    const offset = vertical
      ? touchEvent.clientY - dragStartY
      : touchEvent.clientX - dragStartX

    console.log(event.cancelable)

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
    dragging = true
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

    onStart()

    if (props.touchable) {
      on('touchmove', document, handleTouchmove, { passive: true } as any)
      on('touchend', document, handleTouchend)
      on('touchcancel', document, handleTouchend)
    }
    if (props.draggable) {
      on('mousemove', document, handleTouchmove)
      on('mouseup', document, handleTouchend)
    }
  }

  const resetDragStatus = (): void => {
    if (dragging) {
      globalDragging = false
    }

    dragging = false
    dragStartX = 0
    dragStartY = 0

    off('touchmove', document, handleTouchmove)
    off('touchend', document, handleTouchend)
    off('touchcancel', document, handleTouchend)
    off('mousemove', document, handleTouchmove)
    off('mouseup', document, handleTouchend)
  }

  onBeforeUnmount(() => {
    resetDragStatus()
  })

  // 鼠标滚轮事件
  const handleMousewheel = () => {
    onMousewheel?.()
  }

  const controlListeners = computed(() => ({
    onTouchstartPassive: props.touchable ? handleTouchstart : undefined,
    onMousedown: props.draggable ? handleTouchstart : undefined,
    onWheel: props.mousewheel ? handleMousewheel : undefined
  }))

  return {
    direction,
    slidesElRef,
    controlListeners
  }
}
