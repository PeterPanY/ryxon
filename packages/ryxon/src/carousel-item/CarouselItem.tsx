import {
  ref,
  watch,
  nextTick,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  type VNode
} from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useCarouselContext } from '../carousel/CarouselContext'
import { createNamespace } from '../utils'

const [, bem] = createNamespace('carousel')
const [name] = createNamespace('carousel-item')

export const isCarouselItem = (child: VNode): boolean =>
  (child.type as any)?.name === name

export default defineComponent({
  name,
  setup() {
    const {
      loop,
      isPrev,
      isNext,
      isActive,
      addSlide,
      lazyRender,
      removeSlide,
      slidesPerView,
      onSlideResize,
      getSlideIndex,
      getSlideStyle,
      slidesPerBlocks,
      currentIndexRef,
      onCarouselItemClick
    } = useCarouselContext('RCarouselItem')

    let rendered: boolean
    const state = reactive({
      offset: 0,
      inited: false,
      mounted: false
    })

    const selfElRef = ref<HTMLElement>()
    const indexRef = computed(() => {
      const { value: selfEl } = selfElRef
      return selfEl ? getSlideIndex(selfEl) : -1
    })
    const isPrevRef = computed(() => isPrev(indexRef.value))
    const isNextRef = computed(() => isNext(indexRef.value))
    const isActiveRef = computed(() => isActive(indexRef.value))
    const styleRef = computed(() => getSlideStyle(indexRef.value))

    const animating = ref(false)
    watch(
      () => currentIndexRef.value,
      (activeIndex, oldIndex) => {
        animating.value =
          activeIndex === indexRef.value || oldIndex === indexRef.value
      }
    )

    // 判断当前组件是否加载
    const shouldRender = computed(() => {
      // 未开启懒加载、已经加载过了、自动每屏显示数量
      if (!lazyRender || rendered || slidesPerView === 'auto') {
        return true
      }

      // 等待所有item加载完成，这样我们就可以得到确切的计数
      if (!state.mounted) {
        return false
      }

      // 获取显示在最后的index（兼容slidesPerView配置数量）
      let lastIndex = currentIndexRef.value + slidesPerView + slidesPerBlocks
      // 判断是不是循环播放(循环的时候默认在最前面和最后面加了一个轮播)，所以需要加1
      if (loop) lastIndex++
      // 判断当前后面的是不是显示
      const showNext =
        indexRef.value >= currentIndexRef.value && indexRef.value < lastIndex

      // 是否加载的值保留，已经加载的加载的下次不需要加载
      rendered = isActiveRef.value || isPrevRef.value || showNext

      return rendered
    })

    onMounted(() => {
      addSlide(selfElRef.value)

      nextTick(() => {
        state.mounted = true
      })
    })
    onBeforeUnmount(() => {
      removeSlide(selfElRef.value)
    })

    function handleClick(event: MouseEvent): void {
      const { value: index } = indexRef
      if (index !== undefined) {
        onCarouselItemClick(index, event)
      }
    }

    useResizeObserver(selfElRef, () => {
      onSlideResize()
    })

    return {
      selfElRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      isAnimate: animating,
      index: indexRef,
      style: styleRef,
      shouldRender,
      handleClick
    }
  },
  render() {
    const {
      $slots: slots,
      isPrev,
      isNext,
      isActive,
      isAnimate,
      index,
      style,
      shouldRender
    } = this

    return (
      <div
        ref="selfElRef"
        class={bem('slide', {
          current: isActive,
          prev: isPrev,
          next: isNext,
          animate: isAnimate
        })}
        role="option"
        tabindex="-1"
        data-index={index}
        aria-hidden={!isActive}
        style={style}
        // We use ts-ignore for vue-tsc, since it seems to patch native event
        // for vue components
        onClickCapture={this.handleClick}
      >
        {shouldRender
          ? slots.default?.({ isPrev, isNext, isActive, index })
          : null}
      </div>
    )
  }
})
