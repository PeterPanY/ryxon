import {
  ref,
  watch,
  reactive,
  computed,
  onMounted,
  Transition,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  defineComponent,
  nextTick,
  type ExtractPropTypes,
  type CSSProperties,
  type InjectionKey
} from 'vue'

// Utils
import {
  clamp,
  isHidden,
  truthProp,
  numericProp,
  windowWidth,
  windowHeight,
  preventDefault,
  createNamespace,
  makeNumericProp
} from '../utils'

// Composables
import {
  doubleRaf,
  useChildren,
  useEventListener,
  usePageVisibility
} from '@ryxon/use'
import { useTouch } from '../composables/use-touch'
import { useExpose } from '../composables/use-expose'
import { onPopupReopen } from '../composables/on-popup-reopen'

import { Icon } from '../icon'
import { ArrowLeft, ArrowRight } from '@ryxon/icons'

// Types
import { SwipeState, SwipeExpose, SwipeProvide, SwipeToOptions } from './types'

const [name, bem] = createNamespace('swipe')

export const swipeProps = {
  loop: truthProp,
  width: numericProp,
  height: numericProp,
  vertical: Boolean,
  autoplay: makeNumericProp(0),
  duration: makeNumericProp(500),
  touchable: truthProp,
  lazyRender: Boolean,
  initialSwipe: makeNumericProp(0),
  indicatorColor: String,
  stopPropagation: truthProp,
  trigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover'
  },
  arrow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'hover'
  },
  pauseOnHover: { type: Boolean, default: true },
  indicatorPosition: {
    type: String,
    values: ['', 'none'],
    default: ''
  }
}

export type SwipeProps = ExtractPropTypes<typeof swipeProps>

export const SWIPE_KEY: InjectionKey<SwipeProvide> = Symbol(name)

export default defineComponent({
  name,
  props: swipeProps,
  emits: ['change', 'dragStart', 'dragEnd'],
  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>()
    const track = ref<HTMLElement>()
    const state = reactive<SwipeState>({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false
    })

    // Whether the user is dragging the swipe
    let dragging = false

    const touch = useTouch()
    const { children, linkChildren } = useChildren(SWIPE_KEY)

    const count = computed(() => children.length)

    const size = computed(() => state[props.vertical ? 'height' : 'width'])

    const delta = computed(() =>
      props.vertical ? touch.deltaY.value : touch.deltaX.value
    )

    const minOffset = computed(() => {
      if (state.rect) {
        const base = props.vertical ? state.rect.height : state.rect.width
        return base - size.value * count.value
      }
      return 0
    })

    const maxCount = computed(() =>
      size.value
        ? Math.ceil(Math.abs(minOffset.value) / size.value)
        : count.value
    )

    const trackSize = computed(() => count.value * size.value)

    const activeIndicator = computed(
      () => (state.active + count.value) % count.value
    )

    const isCorrectDirection = computed(() => {
      const expect = props.vertical ? 'vertical' : 'horizontal'
      return touch.direction.value === expect
    })

    const trackStyle = computed(() => {
      const style: CSSProperties = {
        transitionDuration: `${state.swiping ? 0 : props.duration}ms`,
        transform: `translate${props.vertical ? 'Y' : 'X'}(${state.offset}px)`
      }

      if (size.value) {
        const mainAxis = props.vertical ? 'height' : 'width'
        const crossAxis = props.vertical ? 'width' : 'height'
        style[mainAxis] = `${trackSize.value}px`
        style[crossAxis] = props[crossAxis] ? `${props[crossAxis]}px` : ''
      }

      return style
    })

    const getTargetActive = (pace: number) => {
      const { active } = state

      if (pace) {
        if (props.loop) {
          return clamp(active + pace, -1, count.value)
        }
        return clamp(active + pace, 0, maxCount.value)
      }
      return active
    }

    const getTargetOffset = (targetActive: number, offset = 0) => {
      let currentPosition = targetActive * size.value
      if (!props.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value)
      }

      let targetOffset = offset - currentPosition
      if (!props.loop) {
        targetOffset = clamp(targetOffset, minOffset.value, 0)
      }

      return targetOffset
    }

    const move = ({
      pace = 0,
      offset = 0,
      emitChange
    }: {
      pace?: number
      offset?: number
      emitChange?: boolean
    }) => {
      if (count.value <= 1) {
        return
      }

      const { active } = state
      const targetActive = getTargetActive(pace)
      const targetOffset = getTargetOffset(targetActive, offset)

      // 在循环模式下自动移动第一次和最后一次滑动
      if (props.loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          const outRightBound = targetOffset < minOffset.value
          children[0].setOffset(outRightBound ? trackSize.value : 0)
        }

        if (children[count.value - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0
          children[count.value - 1].setOffset(
            outLeftBound ? -trackSize.value : 0
          )
        }
      }

      state.active = targetActive
      state.offset = targetOffset

      if (emitChange && targetActive !== active) {
        emit('change', activeIndicator.value)
      }
    }

    const correctPosition = () => {
      state.swiping = true

      if (state.active <= -1) {
        move({ pace: count.value })
      } else if (state.active >= count.value) {
        move({ pace: -count.value })
      }
    }

    // 滑动到上一项
    const prev = () => {
      correctPosition()
      touch.reset()

      doubleRaf(() => {
        state.swiping = false
        move({ pace: -1, emitChange: true })
      })
    }

    // 滑动到下一项
    const next = () => {
      correctPosition()
      touch.reset()

      doubleRaf(() => {
        state.swiping = false
        move({ pace: 1, emitChange: true })
      })
    }

    let autoplayTimer: ReturnType<typeof setTimeout>

    // 停止自动轮播
    const stopAutoplay = () => clearTimeout(autoplayTimer)

    // 自动轮播
    const autoplay = () => {
      stopAutoplay()
      if (props.autoplay > 0 && count.value > 1) {
        autoplayTimer = setTimeout(() => {
          next()
          autoplay()
        }, +props.autoplay)
      }
    }

    // 初始化滑动位置
    const initialize = (active = +props.initialSwipe) => {
      if (!root.value) {
        return
      }

      const cb = () => {
        if (!isHidden(root)) {
          const rect = {
            width: root.value!.offsetWidth,
            height: root.value!.offsetHeight
          }
          state.rect = rect
          state.width = +(props.width ?? rect.width)
          state.height = +(props.height ?? rect.height)
        }

        if (count.value) {
          active = Math.min(count.value - 1, active)

          if (active === -1) {
            active = count.value - 1
          }
        }

        state.active = active
        state.swiping = true
        state.offset = getTargetOffset(active)
        children.forEach((swipe) => {
          swipe.setOffset(0)
        })

        autoplay()
      }

      if (isHidden(root)) {
        nextTick().then(cb)
      } else {
        cb()
      }
    }

    // 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘
    const resize = () => initialize(state.active)

    let touchStartTime: number

    const onTouchStart = (event: TouchEvent) => {
      if (
        !props.touchable ||
        // 避免在多指触摸时重置位置
        event.touches.length > 1
      )
        return

      touch.start(event)

      dragging = false
      touchStartTime = Date.now()

      stopAutoplay()
      correctPosition()
    }

    const onTouchMove = (event: TouchEvent) => {
      if (props.touchable && state.swiping) {
        touch.move(event)

        if (isCorrectDirection.value) {
          const isEdgeTouch =
            !props.loop &&
            ((state.active === 0 && delta.value > 0) ||
              (state.active === count.value - 1 && delta.value < 0))

          if (!isEdgeTouch) {
            preventDefault(event, props.stopPropagation)
            move({ offset: delta.value })

            if (!dragging) {
              emit('dragStart')
              dragging = true
            }
          }
        }
      }
    }

    const onTouchEnd = () => {
      if (!props.touchable || !state.swiping) {
        return
      }

      const duration = Date.now() - touchStartTime
      const speed = delta.value / duration
      const shouldSwipe =
        Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2

      if (shouldSwipe && isCorrectDirection.value) {
        const offset = props.vertical
          ? touch.offsetY.value
          : touch.offsetX.value

        let pace = 0

        if (props.loop) {
          pace = offset > 0 ? (delta.value > 0 ? -1 : 1) : 0
        } else {
          pace = -Math[delta.value > 0 ? 'ceil' : 'floor'](
            delta.value / size.value
          )
        }

        move({ pace, emitChange: true })
      } else if (delta.value) {
        move({ pace: 0 })
      }

      dragging = false
      state.swiping = false

      emit('dragEnd')
      autoplay()
    }

    // 切换到指定位置
    const swipeTo = (index: number, options: SwipeToOptions = {}) => {
      correctPosition()
      touch.reset()

      doubleRaf(() => {
        let targetIndex
        if (props.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index
        } else {
          targetIndex = index % count.value
        }

        if (options.immediate) {
          doubleRaf(() => {
            state.swiping = false
          })
        } else {
          state.swiping = false
        }

        move({ pace: targetIndex - state.active, emitChange: true })
      })
    }

    // 鼠标点击指示器
    const handleIndicatorClick = (index: number) => {
      if (index !== activeIndicator.value) {
        swipeTo(index)
      }
    }

    // 鼠标移入指示器
    const throttledIndicatorHover = (index: number) => {
      if (props.trigger === 'hover' && index !== activeIndicator.value) {
        swipeTo(index)
      }
    }

    // 指示器-点
    const renderDot = (_: number, index: number) => {
      const active = index === activeIndicator.value
      const style = active
        ? {
            backgroundColor: props.indicatorColor
          }
        : undefined

      return (
        <i
          style={style}
          class={bem('indicator', { active })}
          onClick={() => {
            handleIndicatorClick(index)
          }}
          onMouseenter={() => {
            throttledIndicatorHover(index)
          }}
        />
      )
    }

    // 指示器
    const renderIndicator = () => {
      // 自定义指示器
      if (slots.indicator) {
        return slots.indicator({
          active: activeIndicator.value,
          total: count.value
        })
      }
      // 显示指示器并且数量大于1
      if (count.value > 1) {
        return (
          <div class={bem('indicators', { vertical: props.vertical })}>
            {Array(count.value).fill('').map(renderDot)}
          </div>
        )
      }
    }

    // 箭头是否显示
    const arrowDisplay = computed(
      () => props.arrow !== 'never' && !props.vertical
    )

    // 判断是否进入轮播图
    const hover = ref(false)

    // 箭头
    const renderArrow = () => (
      <>
        {arrowDisplay.value && (
          <Transition name="swipe-arrow-left">
            <button
              v-show={
                (props.arrow === 'always' || hover.value) &&
                (props.loop || activeIndicator.value > 0)
              }
              type="button"
              class={[bem('arrow'), bem('arrow-left')]}
              onClick={prev}
            >
              <Icon>
                <ArrowLeft></ArrowLeft>
              </Icon>
            </button>
          </Transition>
        )}
        {arrowDisplay.value && (
          <Transition name="swipe-arrow-right">
            <button
              v-show={
                (props.arrow === 'always' || hover.value) &&
                (props.loop || activeIndicator.value < count.value - 1)
              }
              type="button"
              class={[bem('arrow'), bem('arrow-right')]}
              onClick={next}
            >
              <Icon>
                <ArrowRight></ArrowRight>
              </Icon>
            </button>
          </Transition>
        )}
      </>
    )

    useExpose<SwipeExpose>({
      prev,
      next,
      state,
      resize,
      swipeTo
    })

    linkChildren({
      size,
      props,
      count,
      activeIndicator
    })

    watch(
      () => props.initialSwipe,
      (value) => initialize(+value)
    )

    watch(count, () => initialize(state.active))
    watch(() => props.autoplay, autoplay)
    watch([windowWidth, windowHeight], resize)
    watch(usePageVisibility(), (visible) => {
      if (visible === 'visible') {
        autoplay()
      } else {
        stopAutoplay()
      }
    })

    onMounted(initialize)
    onActivated(() => initialize(state.active))
    onPopupReopen(() => initialize(state.active))
    onDeactivated(stopAutoplay)
    onBeforeUnmount(stopAutoplay)

    // useEventListener将被动设置为“false”以消除Chrome的警告
    useEventListener('touchmove', onTouchMove, {
      target: track
    })

    // 鼠标进入轮播图
    const handleMouseEnter = () => {
      hover.value = true

      // 判断鼠标悬浮时暂停自动切换
      if (props.pauseOnHover) {
        stopAutoplay()
      }
    }

    // 鼠标离开轮播图
    const handleMouseLeave = () => {
      hover.value = false
      // 开始轮播
      autoplay()
    }

    return () => (
      <div
        ref={root}
        class={bem()}
        onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
      >
        <div
          ref={track}
          style={trackStyle.value}
          class={bem('track', { vertical: props.vertical })}
          onTouchstartPassive={onTouchStart}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          {slots.default?.()}
        </div>
        {renderArrow()}
        {props.indicatorPosition !== 'none' && renderIndicator()}
      </div>
    )
  }
})
