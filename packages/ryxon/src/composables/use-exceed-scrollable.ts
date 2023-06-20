// @ts-nocheck
import {
  ref,
  computed,
  reactive,
  type CSSProperties,
  ComputedRef,
  Ref
} from 'vue'
import { capitalize, type ComponentInstance } from '../utils'
import { useRefs } from './use-refs'
import { raf, useRect } from '@ryxon/use'

export type TabsScrollable = {
  next?: boolean
  prev?: boolean
}

export function scrollLeftTo(
  scroller: HTMLElement,
  to: number,
  duration: number
) {
  let count = 0
  const from = scroller.scrollLeft
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16)

  function animate() {
    scroller.scrollLeft += (to - from) / frames

    if (++count < frames) {
      raf(animate)
    }
  }

  animate()
}

// 元素超出滚动
export const useExceedScrollable = (
  barRef: Ref<HTMLElement | undefined>,
  tabPosition: string,
  scrollable: ComputedRef<boolean>,
  duration: string | number
) => {
  const [titleRefs, setTitleRefs] = useRefs<ComponentInstance>()

  const state = reactive({
    inited: false,
    position: '',
    lineStyle: {} as CSSProperties,
    currentIndex: -1
  })

  const scrollableTool = ref<false | TabsScrollable>(false)

  const navOffset = ref(0)

  const sizeName = computed(() =>
    ['top', 'bottom'].includes(tabPosition) ? 'width' : 'height'
  )

  // 当前选中项位置偏移
  const currentOffset = computed(() => (index: number) => {
    const nav = barRef.value

    if (nav) {
      const titles = titleRefs.value
      const title = titles[index]
      return title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2
    }

    return 0
  })

  // 计算真实内容大小
  const navSize = computed(() => {
    const titles = titleRefs.value
    let totalNumber = 0
    for (let index = 0; index < titles.length; index++) {
      // 在动态增减标签页时，存在为null的情况
      const sizeNumber = titles[index]
        ? useRect(titles[index])[sizeName.value]
        : 0

      totalNumber += sizeNumber
    }
    return totalNumber
  })

  const scrollIntoView = (
    immediate?: boolean,
    type?: string,
    clickTo?: number
  ) => {
    const nav = barRef.value
    const titles = titleRefs.value

    if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
      return
    }

    // 容器大小
    const containerSize = nav[`offset${capitalize(sizeName.value)}`]

    navOffset.value =
      type === 'hand' ? clickTo || 0 : currentOffset.value(state.currentIndex)

    // 判断是否显示左右箭头
    if (navSize.value > containerSize) {
      scrollableTool.value = scrollableTool.value || { prev: false }

      scrollableTool.value.prev = navOffset.value <= currentOffset.value(0)
      scrollableTool.value.next =
        navOffset.value >= currentOffset.value(titles.length - 1)
    } else {
      scrollableTool.value = false
    }

    scrollLeftTo(nav, navOffset.value, immediate ? 0 : +duration)
  }

  // 上一页滚动
  const scrollPrev = () => {
    if (!barRef.value || (scrollableTool.value && scrollableTool.value.prev))
      return

    const nav = barRef.value

    const containerSize = nav[`offset${capitalize(sizeName.value)}`]
    const startOffset = currentOffset.value(0)

    const newOffset =
      navOffset.value - containerSize > startOffset
        ? navOffset.value - containerSize
        : startOffset

    scrollIntoView(false, 'hand', newOffset)
  }

  // 下一页
  const scrollNext = () => {
    if (!barRef.value || (scrollableTool.value && scrollableTool.value.next))
      return
    const nav = barRef.value
    const containerSize = nav[`offset${capitalize(sizeName.value)}`]
    const { length } = titleRefs.value
    const endOffset = currentOffset.value(length - 1)

    const newOffset =
      containerSize + navOffset.value < endOffset
        ? containerSize + navOffset.value
        : endOffset

    scrollIntoView(false, 'hand', newOffset)
  }

  return {
    state,
    titleRefs,
    setTitleRefs,
    scrollIntoView,
    scrollPrev,
    scrollNext,
    scrollableTool
  }
}
