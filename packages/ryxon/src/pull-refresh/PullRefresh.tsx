import {
  ref,
  watch,
  reactive,
  nextTick,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  pick,
  extend,
  numericProp,
  createNamespace,
  makeNumericProp
} from '../utils'

// Composables
import { touchProps, useDragTouch } from './use-touch'

// Components
import { Loading } from '../loading'

const [name, bem, t] = createNamespace('pull-refresh')

const DEFAULT_HEAD_HEIGHT = 50
const TEXT_STATUS = ['pulling', 'loosing', 'success']

type PullRefreshStatus =
  | 'normal'
  | 'loading'
  | 'loosing'
  | 'pulling'
  | 'success'

export const pullRefreshProps = extend({}, touchProps, {
  disabled: Boolean,
  modelValue: Boolean,
  headHeight: makeNumericProp(DEFAULT_HEAD_HEIGHT),
  successText: String,
  pullingText: String,
  loosingText: String,
  loadingText: String,
  pullDistance: numericProp,
  successDuration: makeNumericProp(500),
  animationDuration: makeNumericProp(300)
})

export type PullRefreshProps = ExtractPropTypes<typeof pullRefreshProps>

export default defineComponent({
  name,
  props: pullRefreshProps,
  emits: ['change', 'refresh', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const state = reactive({
      status: 'normal' as PullRefreshStatus,
      distance: 0,
      duration: 0
    })

    // 判断是不是可拖拽
    const isTouchable = () =>
      state.status !== 'loading' &&
      state.status !== 'success' &&
      !props.disabled

    const ease = (distance: number) => {
      const pullDistance = +(props.pullDistance || props.headHeight)

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
        }
      }

      return Math.round(distance)
    }

    const setStatus = (distance: number, isLoading?: boolean) => {
      const pullDistance = +(props.pullDistance || props.headHeight)
      state.distance = distance

      if (isLoading) {
        state.status = 'loading'
      } else if (distance === 0) {
        state.status = 'normal'
      } else if (distance < pullDistance) {
        state.status = 'pulling'
      } else {
        state.status = 'loosing'
      }

      emit('change', {
        status: state.status,
        distance
      })
    }

    const deltaY = ref(0)

    const onStart = () => {
      if (isTouchable()) {
        state.duration = 0
      }
    }

    const onMove = (offset: number) => {
      if (isTouchable()) {
        deltaY.value = offset

        if (offset >= 0) {
          setStatus(ease(offset))
        }
      }
    }

    const onEnd = () => {
      if (deltaY.value && isTouchable()) {
        state.duration = +props.animationDuration

        if (state.status === 'loosing') {
          setStatus(+props.headHeight, true)
          emit('update:modelValue', true)

          // ensure value change can be watched
          nextTick(() => emit('refresh'))
        } else {
          setStatus(0)
        }
      }
    }

    const { direction, slidesElRef, controlListeners } = useDragTouch(
      // eslint-disable-next-line no-restricted-syntax
      { ...pick(props, ['touchable', 'draggable', 'mousewheel']) },
      onStart,
      onMove,
      onEnd
    )
    direction.value = 'vertical' // 设定拖拽方式

    const getHeadStyle = () => {
      if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: `${props.headHeight}px`
        }
      }
    }

    const getStatusText = () => {
      const { status } = state
      if (status === 'normal') {
        return ''
      }
      return props[`${status}Text` as const] || t(status)
    }

    const renderStatus = () => {
      const { status, distance } = state

      if (slots[status]) {
        return slots[status]!({ distance })
      }

      const nodes: JSX.Element[] = []

      if (TEXT_STATUS.includes(status)) {
        nodes.push(<div class={bem('text')}>{getStatusText()}</div>)
      }
      if (status === 'loading') {
        nodes.push(
          <Loading
            v-slots={{ default: getStatusText }}
            class={bem('loading')}
          />
        )
      }

      return nodes
    }

    const showSuccessTip = () => {
      state.status = 'success'

      setTimeout(() => {
        setStatus(0)
      }, +props.successDuration)
    }

    watch(
      () => props.modelValue,
      (value) => {
        state.duration = +props.animationDuration

        if (value) {
          setStatus(+props.headHeight, true)
        } else if (slots.success || props.successText) {
          showSuccessTip()
        } else {
          setStatus(0, false)
        }
      }
    )

    return () => {
      const trackStyle = {
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ''
      }

      return (
        <div class={bem()} {...controlListeners.value}>
          <div ref={slidesElRef} class={bem('track')} style={trackStyle}>
            <div class={bem('head')} style={getHeadStyle()}>
              {renderStatus()}
            </div>
            {slots.default?.()}
          </div>
        </div>
      )
    }
  }
})
