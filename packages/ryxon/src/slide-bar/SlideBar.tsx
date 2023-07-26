// @ts-nocheck
import {
  ref,
  watch,
  reactive,
  onMounted,
  Transition,
  watchEffect,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

import {
  truthProp,
  makeArrayProp,
  makeStringProp,
  makeNumberProp,
  createNamespace
} from '../utils'

import { Icon } from '../icon'
import { ArrowLeft, ArrowRight } from '@ryxon/icons'

const [name, bem] = createNamespace('slide-bar')

export const slideBarProps = {
  modelValue: makeNumberProp(-1),
  initBlocks: makeNumberProp(4),
  wheel: truthProp,
  wheelBlocks: makeNumberProp(1),
  actions: makeArrayProp<unknown>(),
  tag: makeStringProp<keyof HTMLElementTagNameMap>('ul'),
  subTag: makeStringProp<keyof HTMLElementTagNameMap>('li')
}

export type SlideBarProps = ExtractPropTypes<typeof slideBarProps>

export default defineComponent({
  name,
  props: slideBarProps,
  emits: ['click', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const state = reactive({
      leftLength: 0,
      blockWidth: 0,
      blockMargin: 0,
      showLeft: false,
      showRight: false,
      blockWrapper: 0,
      wrapperWidth: 0,
      currentIndex: -1,
      offsetWidth: 0
    })

    watch(
      () => props.modelValue,
      (value) => {
        state.currentIndex = value
      },
      { immediate: true }
    )

    const changeState = () => {
      const contentWidth = state.blockWrapper

      state.showLeft = !(parseInt(String(state.leftLength), 10) >= 0)
      state.showRight =
        contentWidth <= Math.abs(state.leftLength) + state.wrapperWidth
    }

    const wrapper = ref(null)

    onMounted(() => {
      watchEffect(() => {
        state.wrapperWidth = wrapper.value?.offsetWidth
        state.blockWidth = parseInt(
          String(
            ((1 - (props.initBlocks - 1) * 0.02) / props.initBlocks) *
              state.wrapperWidth
          ),
          10
        )
        state.blockMargin = parseInt(String(state.wrapperWidth * 0.02), 10)
        state.blockWrapper =
          props.actions.length * state.blockWidth +
          (props.actions.length - 1) * state.blockMargin
      })
    })

    const leftClick = () => {
      if (state.leftLength >= 0) {
        return
      }

      state.leftLength =
        state.leftLength +
        (state.blockWidth + state.blockMargin) * props.wheelBlocks

      changeState()
    }
    const rightClick = () => {
      if (
        state.blockWrapper <
        Math.abs(state.leftLength) + state.wrapperWidth
      ) {
        return
      }

      state.leftLength =
        state.leftLength -
        (state.blockWidth + state.blockMargin) * props.wheelBlocks

      changeState()
    }

    const mouseEvent = (e: {
      preventDefault: () => void
      wheelDelta: number
    }) => {
      if (props.wheel) {
        e.preventDefault()
        if (e.wheelDelta >= 0) {
          if (state.leftLength < 0) {
            leftClick()
          }
        } else {
          if (
            state.blockWrapper >
            Math.abs(state.leftLength) + state.wrapperWidth
          ) {
            rightClick()
          }
        }
      }
    }

    const insider = ref(null)
    const blockClick = (item: any, index: number) => {
      emit('update:modelValue', index)
      emit('click', item, index)
    }

    const rederSubTag = (item: any, key: number) => {
      return (
        <props.subTag
          key={key}
          class={[state.currentIndex === key ? bem('active') : '']}
          style={{
            width: state.blockWidth + 'px',
            'margin-left': key === 0 ? 0 : state.blockMargin + 'px'
          }}
          onClick={() => blockClick(item, key)}
        >
          {slots.default?.(item)}
        </props.subTag>
      )
    }

    return () => (
      <div ref={wrapper} class={bem()} onMousewheel={mouseEvent}>
        <Icon
          class={[bem('left'), state.showLeft ? '' : bem('disabled')]}
          onClick={leftClick}
        >
          <ArrowLeft></ArrowLeft>
        </Icon>
        <div class={bem('content')}>
          <Transition>
            <props.tag
              ref={insider}
              class={[bem('list')]}
              style={{
                width: state.blockWrapper + 'px',
                'transition-duration': '0ms',
                transform: `translate3d(${state.leftLength}px, 0px, 0px)`
              }}
            >
              {props.actions?.map(rederSubTag)}
            </props.tag>
          </Transition>
        </div>
        <Icon
          class={[bem('right'), state.showRight ? bem('disabled') : '']}
          onClick={rightClick}
        >
          <ArrowRight></ArrowRight>
        </Icon>
      </div>
    )
  }
})
