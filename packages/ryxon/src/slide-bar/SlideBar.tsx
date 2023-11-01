// @ts-nocheck
import {
  ref,
  unref,
  watch,
  reactive,
  computed,
  nextTick,
  Transition,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

import { useResizeObserver } from '@vueuse/core'
import {
  extend,
  truthProp,
  makeArrayProp,
  makeStringProp,
  makeNumberProp,
  createNamespace,
  makeNumericProp
} from '../utils'
import { useExpose } from '../composables/use-expose'

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
  loadPrevNext: Boolean,
  duration: makeNumericProp(0.3),
  gutter: makeNumericProp(15),
  centered: Boolean,
  blockWidth: makeNumericProp('auto')
}

export type SlideBarProps = ExtractPropTypes<typeof slideBarProps>

export default defineComponent({
  name,
  props: slideBarProps,
  emits: ['click', 'arrow-click', 'progress'],
  setup(props, { emit, slots }) {
    // 初始化actions数据
    const showActions = (showNum: number) => {
      if (props.lazyRender) {
        props.actions.forEach((item: any, index) => {
          item.showBlock = index < showNum
        })
      }
    }

    const state = reactive({
      leftLength: 0, // transform偏移
      blockWidth: 0, // 单元格宽度
      blockMargin: 0, // 单元格margin-left
      disableWidth: 0,
      showLeft: false, // 禁用左箭头
      showRight: false, // 禁用右箭头
      blockWrapper: 0, // list大小
      wrapperWidth: 0, // 实际展示宽度
      swiping: true, // 判断是不是第一次进来
      currentIndex: 0,
      symmetry: 0, // 对称数
      startIndex: 0, // 开始的index
      endIndex: 0 // 结束的index
    })

    // 初始化计算值
    const wrapper = ref(null)
    const resize = () => {
      nextTick(() => {
        if (!wrapper.value) return
        const computedStyle = getComputedStyle(wrapper.value)
        const paddingLeft = parseInt(computedStyle.paddingLeft)
        const paddingRight = parseInt(computedStyle.paddingRight)
        // 实际展示宽度
        state.wrapperWidth =
          wrapper.value?.offsetWidth - paddingLeft - paddingRight

        state.blockMargin = props.gutter // 单元格间距
        state.startIndex = 0
        state.endIndex = props.initBlocks - 1

        // 单个宽度
        state.blockWidth =
          props.blockWidth === 'auto'
            ? parseInt(
                String(
                  (state.wrapperWidth -
                    (props.initBlocks - 1) * state.blockMargin) /
                    props.initBlocks
                ),
                10
              )
            : props.blockWidth

        // list宽度
        state.blockWrapper =
          props.actions.length * state.blockWidth +
          (props.actions.length - 1) * state.blockMargin

        state.currentIndex = 0

        // 居中展示
        if (props.centered) {
          if (props.initBlocks % 2 !== 1) {
            console.error('initBlocks 需要为奇数')
          } else {
            state.symmetry = Math.floor(props.initBlocks / 2) // 对称数
            state.startIndex = -state.symmetry
            state.endIndex = props.initBlocks - (state.symmetry + 1)

            state.disableWidth =
              (state.blockWidth + state.blockMargin) * state.symmetry

            state.leftLength = state.disableWidth

            emit('progress', state.currentIndex)
          }
        }
      })
    }

    let initShowNum = 0

    watch(
      () => props.initBlocks,
      () => {
        initShowNum = unref(props.initBlocks)
        // 允许将延迟加载应用到最接近的块（后一个显示级）
        if (props.loadPrevNext) {
          initShowNum += props.wheelBlocks
        }

        showActions(initShowNum)

        resize()
      },
      { immediate: true }
    )

    // 监听元素尺寸的变化
    useResizeObserver(wrapper, resize)

    const changeState = () => {
      state.swiping = false

      const contentWidth = state.blockWrapper

      if (props.centered) {
        state.showLeft = !(
          parseInt(String(state.leftLength), 10) >= state.disableWidth
        )
        state.showRight =
          contentWidth <=
          Math.abs(state.leftLength) + state.wrapperWidth - state.disableWidth
      } else {
        state.showLeft = !(parseInt(String(state.leftLength), 10) >= 0)
        state.showRight =
          contentWidth <= Math.abs(state.leftLength) + state.wrapperWidth
      }
    }

    // 滚动到位置
    const moveTo = (index: number) => {
      state.leftLength = -(state.blockWidth + state.blockMargin) * index
    }

    const leftClick = () => {
      if (state.leftLength >= state.disableWidth) {
        return
      }

      state.startIndex -= props.wheelBlocks
      state.endIndex -= props.wheelBlocks

      moveTo(state.startIndex)

      state.currentIndex -= props.wheelBlocks
      emit('progress', state.currentIndex)

      emit('arrow-click', 'left', [state.startIndex, state.endIndex])

      changeState()
    }
    const rightClick = () => {
      if (
        state.blockWrapper <
          Math.abs(state.leftLength) +
            state.wrapperWidth -
            state.disableWidth ||
        state.currentIndex > props.actions.length - 2
      ) {
        return
      }

      state.startIndex += props.wheelBlocks
      state.endIndex += props.wheelBlocks

      moveTo(state.startIndex)

      state.currentIndex += props.wheelBlocks
      emit('progress', state.currentIndex)

      initShowNum += props.wheelBlocks // 显示的总数
      showActions(initShowNum)

      emit('arrow-click', 'right', [state.startIndex, state.endIndex])

      changeState()
    }

    const mouseEvent = (e: {
      preventDefault: () => void
      wheelDelta: number
    }) => {
      if (props.wheel) {
        e.preventDefault()
        if (e.wheelDelta >= 0) {
          leftClick()
        } else {
          rightClick()
        }
      }
    }

    const insider = ref(null)
    const blockClick = (item: any, index: number) => {
      emit('click', item, index)
    }

    const rederSubTag = (item: any, key: number) => {
      const styleOBj = extend(
        {},
        {
          width: state.blockWidth + 'px',
          'margin-left': key === 0 ? 0 : state.blockMargin + 'px'
        },
        item.style || {}
      )
      return (
        <props.subTag
          key={key}
          style={styleOBj}
          class={{
            active: state.currentIndex === key
          }}
          onClick={() => blockClick(item, key)}
        >
          {item.showBlock && slots.default?.(item)}
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

    useExpose({ resize, moveTo })

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
        <div class={bem('content', { centered: props.centered })}>
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
