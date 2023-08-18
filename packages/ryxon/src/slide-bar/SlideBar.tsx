// @ts-nocheck
import {
  ref,
  reactive,
  computed,
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
  createNamespace,
  makeNumericProp
} from '../utils'

import { Icon } from '../icon'
import { ArrowLeft, ArrowRight } from '@ryxon/icons'

const [name, bem] = createNamespace('slide-bar')

export const slideBarProps = {
  initBlocks: makeNumberProp(4),
  wheel: truthProp,
  wheelBlocks: makeNumberProp(1),
  actions: makeArrayProp<unknown>(),
  tag: makeStringProp<keyof HTMLElementTagNameMap>('ul'),
  subTag: makeStringProp<keyof HTMLElementTagNameMap>('li'),
  lazyRender: truthProp,
  duration: makeNumericProp(0.3)
}

export type SlideBarProps = ExtractPropTypes<typeof slideBarProps>

export default defineComponent({
  name,
  props: slideBarProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    // 初始化actions数据
    const showActions = (showNum: number) => {
      props.actions.forEach((item: any, index) => {
        item.show = index < showNum
      })
    }

    let initShowNum = props.initBlocks + props.wheelBlocks // 初始化显示的个数
    showActions(initShowNum)

    const state = reactive({
      leftLength: 0, // transform偏移
      blockWidth: 0, // 单元格宽度
      blockMargin: 0, // 单元格margin-left
      showLeft: false, // 禁用左箭头
      showRight: false, // 禁用右箭头
      blockWrapper: 0, // list大小
      wrapperWidth: 0,
      offsetWidth: 0,
      swiping: true // 判断是不是第一次进来
    })

    const changeState = () => {
      state.swiping = false

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

      initShowNum += props.wheelBlocks // 显示的总数
      showActions(initShowNum)

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
      emit('click', item, index)
    }

    const rederSubTag = (item: any, key: number) => {
      return (
        <props.subTag
          key={key}
          style={{
            width: state.blockWidth + 'px',
            'margin-left': key === 0 ? 0 : state.blockMargin + 'px'
          }}
          onClick={() => blockClick(item, key)}
        >
          {item.show && slots.default?.(item)}
        </props.subTag>
      )
    }

    // 判断是否显示箭头   滚动块列表>  初始时需要显示的块数
    const isShowIcon = computed(() => props.actions.length > props.initBlocks)
    const trackStyle = computed(() => ({
      transitionDuration: `${state.swiping ? 0 : props.duration}s`,
      width: state.blockWrapper + 'px',
      transform: `translate3d(${state.leftLength}px, 0px, 0px)`
    }))

    return () => (
      <div ref={wrapper} class={bem()} onMousewheel={mouseEvent}>
        {isShowIcon.value && (
          <Icon
            class={[bem('left'), state.showLeft ? '' : bem('disabled')]}
            onClick={leftClick}
          >
            <ArrowLeft></ArrowLeft>
          </Icon>
        )}
        <div class={bem('content')}>
          <Transition>
            <props.tag
              ref={insider}
              class={[bem('list')]}
              style={trackStyle.value}
            >
              {props.actions?.map(rederSubTag)}
            </props.tag>
          </Transition>
        </div>
        {isShowIcon.value && (
          <Icon
            class={[bem('right'), state.showRight ? bem('disabled') : '']}
            onClick={rightClick}
          >
            <ArrowRight></ArrowRight>
          </Icon>
        )}
      </div>
    )
  }
})
