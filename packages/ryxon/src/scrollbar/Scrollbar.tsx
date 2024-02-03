// @ts-nocheck
import {
  ref,
  watch,
  provide,
  computed,
  nextTick,
  reactive,
  onMounted,
  onUpdated,
  defineComponent,
  type PropType,
  type StyleValue,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

import {
  addUnit,
  isObject,
  isNumber,
  unknownProp,
  makeStringProp,
  type ComponentInstance
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { scrollbarContextKey } from './token'
import { useExpose } from '../composables/use-expose'
import { GAP } from './util'

import Bar from './bar'

const [, bem] = createNamespace('scrollbar')

export const scrollbarProps = {
  height: { type: [String, Number], default: '' }, // 滚动条高度
  maxHeight: { type: [String, Number], default: '' }, // 滚动条最大高度
  native: { type: Boolean, default: false }, // 是否使用原生滚动条样式
  wrapStyle: { type: Object as PropType<CSSProperties>, default: () => {} }, // 包裹容器的自定义样式
  wrapClass: unknownProp, // 包裹容器的自定义类名
  viewClass: { type: [String, Array], default: '' }, // 视图的自定义样式
  viewStyle: { type: [String, Array, Object], default: '' }, // 视图的自定义类名
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'), // 视图的元素标签
  minSize: { type: Number, default: 20 }, // 滚动条最小尺寸
  always: Boolean // 滚动条总是显示
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export default defineComponent({
  name: 'RScrollbar',
  props: scrollbarProps,
  emits: ['scroll'],
  setup(props, { slots, emit }) {
    let stopResizeObserver: (() => void) | undefined
    let stopResizeListener: (() => void) | undefined

    const scrollbarRef = ref<HTMLDivElement>()
    const wrapRef = ref<HTMLDivElement>()
    const resizeRef = ref<HTMLElement>()

    const sizeWidth = ref('0')
    const sizeHeight = ref('0')
    const barRef = ref<ComponentInstance>()
    const ratioY = ref(1)
    const ratioX = ref(1)

    const update = () => {
      if (!wrapRef.value) return
      const offsetHeight = wrapRef.value.offsetHeight - GAP
      const offsetWidth = wrapRef.value.offsetWidth - GAP

      const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight
      const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth
      const height = Math.max(originalHeight, props.minSize)
      const width = Math.max(originalWidth, props.minSize)

      ratioY.value =
        originalHeight /
        (offsetHeight - originalHeight) /
        (height / (offsetHeight - height))
      ratioX.value =
        originalWidth /
        (offsetWidth - originalWidth) /
        (width / (offsetWidth - width))

      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
    }

    const style = computed<StyleValue>(() => {
      const style: CSSProperties = {}
      if (props.height) style.height = addUnit(props.height)
      if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
      return [props.wrapStyle, style]
    })
    const wrapKls = computed(() => [
      props.wrapClass,
      bem('wrap', !props.native ? 'hidden-default' : '')
    ])
    const resizeKls = computed(() => [bem('view'), props.viewClass])

    const handleScroll = () => {
      if (wrapRef.value) {
        barRef.value?.handleScroll(wrapRef.value)

        emit('scroll', {
          scrollTop: wrapRef.value.scrollTop,
          scrollLeft: wrapRef.value.scrollLeft
        })
      }
    }

    // TODO: refactor method overrides, due to script setup dts
    // @ts-nocheck
    function scrollTo(xCord: number, yCord?: number): void
    function scrollTo(options: ScrollToOptions): void
    function scrollTo(arg1: unknown, arg2?: number) {
      if (isObject(arg1)) {
        wrapRef.value!.scrollTo(arg1)
      } else if (isNumber(arg1) && isNumber(arg2)) {
        wrapRef.value!.scrollTo(arg1, arg2)
      }
    }

    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        return
      }
      wrapRef.value!.scrollTop = value
    }

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        return
      }
      wrapRef.value!.scrollLeft = value
    }

    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver?.()
          stopResizeListener?.()
        } else {
          ;({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
          stopResizeListener = useEventListener('resize', update)
        }
      },
      { immediate: true }
    )

    watch(
      () => [props.maxHeight, props.height],
      () => {
        if (!props.native)
          nextTick(() => {
            update()
            if (wrapRef.value) {
              barRef.value?.handleScroll(wrapRef.value)
            }
          })
      }
    )

    provide(
      scrollbarContextKey,
      reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef
      })
    )

    onMounted(() => {
      if (!props.native)
        nextTick(() => {
          update()
        })
    })
    onUpdated(() => update())

    useExpose({
      wrapRef,
      update, // 手动更新滚动条状态
      scrollTo, // 滚动到特定的一组坐标
      setScrollTop, // 设置到滚动顶部的距离
      setScrollLeft, // 设置向左滚动的距离
      handleScroll // 滚动事件
    })

    return () => (
      <div ref={scrollbarRef} class={bem()}>
        <div
          ref={wrapRef}
          class={wrapKls.value}
          style={style.value}
          onScroll={handleScroll}
        >
          <props.tag
            ref={resizeRef}
            class={resizeKls.value}
            style={props.viewStyle}
          >
            {slots.default?.()}
          </props.tag>
        </div>
        {!props.native && (
          <Bar
            ref={barRef}
            height={sizeHeight.value}
            width={sizeWidth.value}
            always={props.always}
            ratio-x={ratioX.value}
            ratio-y={ratioY.value}
          ></Bar>
        )}
      </div>
    )
  }
})
