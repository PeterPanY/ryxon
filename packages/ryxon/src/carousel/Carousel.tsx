import {
  ref,
  watch,
  vShow,
  toRef,
  nextTick,
  computed,
  onMounted,
  onUpdated,
  Transition,
  cloneVNode,
  watchEffect,
  normalizeStyle,
  withDirectives,
  defineComponent,
  onBeforeUnmount,
  type Ref,
  type VNode,
  type PropType,
  type CSSProperties,
  type TransitionProps,
  type ExtractPropTypes
} from 'vue'
import { useResizeObserver } from '@vueuse/core'

// Utils
import { pick, truthProp, makeStringProp, makeNumberProp } from '@ryxon/utils'
import { createNamespace } from '../utils'
import {
  calculateSize,
  clampValue,
  resolveSpeed,
  getNextIndex,
  getPrevIndex,
  getDisplayIndex,
  getRealIndex,
  getDisplayTotalView,
  addDuplicateSlides,
  resolveSlotWithProps
} from './utils'
import { flatten } from '@ryxon/utils'
import {
  provideCarouselContext,
  type CarouselContextValue
} from './CarouselContext'

// Composables
import { OffsetParams, useDragTouch } from '../composables/use-touch'
import useMergedState from '../composables/use-merged-state'

// Components
import RCarouselItem, { isCarouselItem } from '../carousel-item/CarouselItem'
import RCarouselDots from './CarouselDots'
import RCarouselArrow from './CarouselArrow'
import type {
  Size,
  CarouselInst,
  CarouselTrigger,
  CarouselEffect,
  CarouselDotType,
  CarouselDirection,
  DotScopedSlotProps,
  CarouselDotPlacement,
  ArrowScopedSlotProps
} from './types'

const transitionProperties = [
  'transitionDuration',
  'transitionTimingFunction'
] as const

type TransitionStyle = Partial<
  Pick<CSSProperties, (typeof transitionProperties)[number]>
>

const [name, bem] = createNamespace('carousel')

export const carouselProps = {
  defaultIndex: makeNumberProp(0),
  currentIndex: Number,
  showArrow: Boolean,
  dotType: makeStringProp<CarouselDotType>('dot'),
  dotPlacement: makeStringProp<CarouselDotPlacement>('bottom'),
  slidesPerView: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 1
  },
  slidesPerBlocks: makeNumberProp(1),
  spaceBetween: makeNumberProp(0),
  centeredSlides: Boolean,
  direction: makeStringProp<CarouselDirection>('horizontal'),
  autoplay: Boolean,
  interval: makeNumberProp(5000),
  loop: truthProp,
  effect: makeStringProp<CarouselEffect>('slide'),
  showDots: truthProp,
  trigger: makeStringProp<CarouselTrigger>('click'),
  transitionStyle: {
    type: Object as PropType<TransitionStyle>,
    default: (): TransitionStyle => ({ transitionDuration: '300ms' })
  },
  transitionProps: Object as PropType<TransitionProps>,
  draggable: Boolean,
  prevSlideStyle: [Object, String] as PropType<CSSProperties | string>,
  nextSlideStyle: [Object, String] as PropType<CSSProperties | string>,
  touchable: truthProp,
  lazyRender: Boolean,
  mousewheel: Boolean,
  keyboard: Boolean
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>

export default defineComponent({
  name,
  props: carouselProps,
  emits: ['update:currentIndex', 'change', 'item-click'],
  setup(props, { emit }) {
    // Dom
    // const slidesElRef = ref<HTMLDivElement>()
    const slideElsRef = ref<HTMLElement[]>([])
    const slideVNodesRef = { value: [] as VNode[] }

    // Computed states
    const verticalRef = computed(() => props.direction === 'vertical') // 是否水平方向
    const sizeAxisRef = computed(() => (verticalRef.value ? 'height' : 'width'))
    const spaceAxisRef = computed(() =>
      verticalRef.value ? 'bottom' : 'right'
    )
    const sequenceLayoutRef = computed(() => props.effect === 'slide')
    const duplicatedableRef = computed(
      // duplicate the copy operation in `slide` mode,
      // because only its DOM is sequence layout
      () => props.loop && props.slidesPerView === 1 && sequenceLayoutRef.value
    )
    // user wants to control the transition animation
    const userWantsControlRef = computed(() => props.effect === 'custom')

    // used to calculate total views
    const displaySlidesPerViewRef = computed(() =>
      !sequenceLayoutRef.value || props.centeredSlides ? 1 : props.slidesPerView
    )
    // used to calculate the size of each slide
    const realSlidesPerViewRef = computed(() =>
      userWantsControlRef.value ? 1 : props.slidesPerView
    )
    // 我们根据每个视图自动计算特殊幻灯片的总视图
    const autoSlideSizeRef = computed(
      () =>
        displaySlidesPerViewRef.value === 'auto' ||
        (props.slidesPerView === 'auto' && props.centeredSlides)
    )

    // Carousel size
    const perViewSizeRef = ref({ width: 0, height: 0 })
    const slideSizesTrigger = ref(0)
    const slideSizesRef = computed(() => {
      const { value: slidesEls } = slideElsRef

      if (!slidesEls.length) return []
      slideSizesTrigger.value
      const { value: autoSlideSize } = autoSlideSizeRef
      if (autoSlideSize) {
        return slidesEls.map((slide) => calculateSize(slide))
      }
      const { value: slidesPerView } = realSlidesPerViewRef
      const { value: perViewSize } = perViewSizeRef
      const { value: axis } = sizeAxisRef
      let axisSize = perViewSize[axis]
      // 判断每一页显示的轮播图数量是不是自动的
      if (slidesPerView !== 'auto') {
        const { spaceBetween } = props
        const remaining = axisSize - (slidesPerView - 1) * spaceBetween
        const percentage = 1 / Math.max(1, slidesPerView)
        axisSize = remaining * percentage
      }
      // eslint-disable-next-line no-restricted-syntax
      const slideSize = { ...perViewSize, [axis]: axisSize }
      return slidesEls.map(() => slideSize)
    })

    // The translate required to reach each slide
    const slideTranlatesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      if (!slideSizes.length) return []
      const { centeredSlides, spaceBetween } = props
      const { value: axis } = sizeAxisRef
      const { [axis]: perViewSize } = perViewSizeRef.value
      let previousTranslate = 0
      return slideSizes.map(({ [axis]: slideSize }) => {
        let translate = previousTranslate
        if (centeredSlides) {
          translate += (slideSize - perViewSize) / 2
        }
        previousTranslate += slideSize + spaceBetween
        return translate
      })
    })

    // Styles
    const isMountedRef = ref(false)
    const transitionStyleRef = computed(() => {
      const { transitionStyle } = props
      return transitionStyle
        ? pick(transitionStyle, transitionProperties as any)
        : {}
    })
    const speedRef = computed(() =>
      userWantsControlRef.value
        ? 0
        : resolveSpeed(transitionStyleRef.value.transitionDuration)
    )
    const slideStylesRef = computed(() => {
      const { value: slidesEls } = slideElsRef
      if (!slidesEls.length) return []
      const useComputedSize = !(
        autoSlideSizeRef.value || realSlidesPerViewRef.value === 1
      )
      const getSlideSize = (index: number): Partial<Size> | undefined => {
        if (useComputedSize) {
          const { value: axis } = sizeAxisRef
          return {
            [axis]: `${slideSizesRef.value[index][axis]}px`
          }
        }
      }

      // effect为slide-alone主题时 偏移尺寸
      const calcTranslate = (index: number) => {
        const { value: axis } = sizeAxisRef

        let diff = index - mergedDisplayIndexRef.value
        if (diff === slidesEls.length - 1) {
          diff = -1
        }
        if (diff === -(slidesEls.length - 1)) {
          diff = 1
        }

        const translate = slideSizesRef.value[index][axis] * diff

        const transform = verticalRef.value
          ? `translateY(${translate}px)`
          : `translateX(${translate}px)`

        return transform
      }
      if (userWantsControlRef.value) {
        // We center each slide when user wants to control the transition animation,
        // so there is no need to calculate the offset
        return slidesEls.map((_, i) => getSlideSize(i))
      }
      const { effect, spaceBetween } = props
      const { value: spaceAxis } = spaceAxisRef
      return slidesEls.reduce<CSSProperties[]>((styles, _, i) => {
        const style = {
          // eslint-disable-next-line no-restricted-syntax
          ...getSlideSize(i),
          [`margin-${spaceAxis}`]: `${spaceBetween}px`
        }
        styles.push(style)
        if (isMountedRef.value && (effect === 'fade' || effect === 'card')) {
          Object.assign(style, transitionStyleRef.value)
        }

        if (isMountedRef.value && effect === 'slide-alone') {
          Object.assign(style, transitionStyleRef.value, {
            transform: calcTranslate(i),
            transitionDuration: 0
          })
        }
        return styles
      }, [])
    })

    // Total
    const totalViewRef = computed(() => {
      const { value: slidesPerView } = displaySlidesPerViewRef
      const { length: totalSlides } = slideElsRef.value
      if (slidesPerView !== 'auto') {
        return Math.max(totalSlides - slidesPerView, 0) + 1
      } else {
        const { value: slideSizes } = slideSizesRef
        const { length } = slideSizes
        if (!length) return totalSlides
        const { value: translates } = slideTranlatesRef
        const { value: axis } = sizeAxisRef
        const perViewSize = perViewSizeRef.value[axis]
        let lastViewSize = slideSizes[slideSizes.length - 1][axis]
        let i = length
        while (i > 1 && lastViewSize < perViewSize) {
          i--
          lastViewSize += translates[i] - translates[i - 1]
        }
        return clampValue(i + 1, 1, length)
      }
    })
    const displayTotalViewRef = computed(() =>
      getDisplayTotalView(totalViewRef.value, duplicatedableRef.value)
    )

    // Index
    const defaultRealIndex = getRealIndex(
      props.defaultIndex,
      duplicatedableRef.value
    )
    const uncontrolledDisplayIndexRef = ref(
      getDisplayIndex(
        defaultRealIndex,
        totalViewRef.value,
        duplicatedableRef.value
      )
    )
    const mergedDisplayIndexRef = useMergedState(
      toRef(props, 'currentIndex'),
      uncontrolledDisplayIndexRef
    )
    const realIndexRef = computed(() =>
      getRealIndex(mergedDisplayIndexRef.value, duplicatedableRef.value)
    )

    // Reality methods
    function toRealIndex(index: number): void {
      index = clampValue(index, 0, totalViewRef.value - 1)
      const displayIndex = getDisplayIndex(
        index,
        totalViewRef.value,
        duplicatedableRef.value
      )
      const { value: lastDisplayIndex } = mergedDisplayIndexRef
      if (displayIndex !== mergedDisplayIndexRef.value) {
        uncontrolledDisplayIndexRef.value = displayIndex

        emit('update:currentIndex', displayIndex)
        emit('change', displayIndex, lastDisplayIndex)
      }
    }
    // 获取真实的上一个索引
    function getRealPrevIndex(
      index: number = realIndexRef.value
    ): number | null {
      return getPrevIndex(
        index,
        totalViewRef.value,
        props.slidesPerView === 1 ? 1 : props.slidesPerBlocks,
        props.loop
      )
    }
    // 获取真实的下一个索引
    function getRealNextIndex(
      index: number = realIndexRef.value
    ): number | null {
      return getNextIndex(
        index,
        totalViewRef.value,
        props.slidesPerView === 1 ? 1 : props.slidesPerBlocks,
        props.loop
      )
    }
    // 是不是真实的上一个
    function isRealPrev(slideOrIndex: HTMLElement | number): boolean {
      const index = getSlideIndex(slideOrIndex)
      return index !== null && getRealPrevIndex() === index
    }
    // 是不是真是的下一个
    function isRealNext(slideOrIndex: HTMLElement | number): boolean {
      const index = getSlideIndex(slideOrIndex)
      return index !== null && getRealNextIndex() === index
    }
    // 是不是正式的当前
    function isRealActive(slideOrIndex: HTMLElement | number): boolean {
      return realIndexRef.value === getSlideIndex(slideOrIndex)
    }

    // 是否禁用上一个
    function isPrevDisabled(): boolean {
      return getRealPrevIndex() === null
    }
    // 是否禁用下一个
    function isNextDisabled(): boolean {
      return getRealNextIndex() === null
    }

    // 跳转到
    let expectedTransitionDirection = 0
    function to(index: number): void {
      const realIndex = clampValue(
        getRealIndex(index, duplicatedableRef.value),
        0,
        totalViewRef.value
      )

      if (
        index !== mergedDisplayIndexRef.value ||
        realIndex !== realIndexRef.value
      ) {
        toRealIndex(realIndex)
      }
    }
    // 前一页
    function prev(): void {
      const prevIndex = getRealPrevIndex()
      if (prevIndex !== null) {
        expectedTransitionDirection = -1
        toRealIndex(prevIndex)
      }
    }
    // 后一页
    function next(): void {
      const nextIndex = getRealNextIndex()
      if (nextIndex !== null) {
        expectedTransitionDirection = 1
        toRealIndex(nextIndex)
      }
    }
    // 滑动至前一页
    function prevIfSlideTransitionEnd(): void {
      if (!inTransition || !duplicatedableRef.value) prev()
    }
    // 滑动至后一页
    function nextIfSlideTransitionEnd(): void {
      if (!inTransition || !duplicatedableRef.value) next()
    }

    // Translate to
    let inTransition = false
    // record the translate of each slide, so that it can be restored at touch
    let previousTranslate = 0
    const translateStyleRef = ref({}) as Ref<CSSProperties>
    function updateTranslate(translate: number, speed = 0): void {
      translateStyleRef.value = Object.assign({}, transitionStyleRef.value, {
        transform: verticalRef.value
          ? `translateY(${-translate}px)`
          : `translateX(${-translate}px)`,
        transitionDuration: `${speed}ms`
      })
    }
    // 恢复移动数据
    function fixTranslate(speed = 0): void {
      if (sequenceLayoutRef.value) {
        translateTo(realIndexRef.value, speed)
      } else if (previousTranslate !== 0) {
        if (!inTransition && speed > 0) {
          inTransition = true
        }
        updateTranslate((previousTranslate = 0), speed)
      }
    }
    function translateTo(index: number, speed: number): void {
      const translate = getTranslate(index)
      if (translate !== previousTranslate && speed > 0) {
        inTransition = true
      }
      previousTranslate = getTranslate(realIndexRef.value)
      updateTranslate(translate, speed)
    }
    function getTranslate(index: number): number {
      let translate
      // 处理自动幻灯片预览
      if (index >= totalViewRef.value - 1) {
        translate = getLastViewTranslate()
      } else {
        translate = slideTranlatesRef.value[index] || 0
      }
      return translate
    }
    function getLastViewTranslate(): number {
      if (displaySlidesPerViewRef.value === 'auto') {
        const { value: axis } = sizeAxisRef
        const { [axis]: perViewSize } = perViewSizeRef.value
        const { value: translates } = slideTranlatesRef
        const lastTranslate = translates[translates.length - 1]
        let overallSize
        if (lastTranslate === undefined) {
          overallSize = perViewSize
        } else {
          const { value: slideSizes } = slideSizesRef
          overallSize = lastTranslate + slideSizes[slideSizes.length - 1][axis]
        }
        // Bring the last slide to the edge
        return overallSize - perViewSize
      } else {
        const { value: translates } = slideTranlatesRef
        return translates[totalViewRef.value - 1] || 0
      }
    }

    // 获取Slide的index值
    function getSlideIndex(slideOrIndex?: HTMLElement | number): number {
      return typeof slideOrIndex === 'number'
        ? slideOrIndex
        : slideOrIndex
          ? slideElsRef.value.indexOf(slideOrIndex)
          : -1
    }
    // 获取Slide的样式
    function getSlideStyle(
      slide: HTMLElement | number
    ): string | Record<string, string | number> | undefined {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        const styles: any[] = [slideStylesRef.value[index]]
        const isPrev = carouselContext.isPrev(index)
        const isNext = carouselContext.isNext(index)
        if (isPrev) {
          styles.push(props.prevSlideStyle || '')
        }
        if (isNext) {
          styles.push(props.nextSlideStyle || '')
        }
        return normalizeStyle(styles)
      }
    }

    // 添加 Slide
    function addSlide(slide?: HTMLElement): void {
      if (!slide) return
      slideElsRef.value.push(slide)
    }

    // 删除 Slide
    function removeSlide(slide?: HTMLElement): void {
      if (!slide) return
      const index = getSlideIndex(slide)
      if (index !== -1) {
        slideElsRef.value.splice(index, 1)
      }
    }

    // 轮播图item点击
    function onCarouselItemClick(index: number, event: MouseEvent): void {
      // 判断是不是在动效阶段（transition、拖拽）
      let allowClick = !inTransition && !dragging.value && !isEffectiveDrag

      if (allowClick) emit('item-click', index)

      // card样式时 滑动到点击位置
      if (props.effect === 'card' && allowClick && !isRealActive(index)) {
        to(index)
        allowClick = false
      }
      if (!allowClick) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    // Slide尺寸变化(当用户需要自定义幻灯片的大小时，我们会听取他们的意见来修复当前translate)
    function handleSlideResize(): void {
      if (autoSlideSizeRef.value) {
        slideSizesTrigger.value++
      }
    }

    // Provide
    const carouselContext: CarouselContextValue = {
      loop: props.loop,
      lazyRender: props.lazyRender,
      slidesPerView: props.slidesPerView,
      slidesPerBlocks: props.slidesPerBlocks,
      currentIndexRef: mergedDisplayIndexRef,
      to,
      prev: prevIfSlideTransitionEnd,
      next: nextIfSlideTransitionEnd,
      isVertical: () => verticalRef.value,
      isHorizontal: () => !verticalRef.value,
      isPrev: isRealPrev,
      isNext: isRealNext,
      isActive: isRealActive,
      isPrevDisabled,
      isNextDisabled,
      getSlideIndex,
      getSlideStyle,
      addSlide,
      removeSlide,
      onCarouselItemClick,
      onSlideResize: handleSlideResize
    }
    provideCarouselContext(carouselContext)

    // Autoplay
    let autoplayTimer: number | null = null
    function stopAutoplay(): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
    }
    function resetAutoplay(): void {
      stopAutoplay()
      const disabled = !props.autoplay || displayTotalViewRef.value < 2
      if (!disabled) {
        autoplayTimer = window.setInterval(next, props.interval)
      }
    }

    // Drag
    let dragOffset = 0
    let dragStartTime = 0
    let isEffectiveDrag = false

    // 开始
    const onStart = () => {
      isEffectiveDrag = false
      dragStartTime = Date.now()
      stopAutoplay()
    }
    // 移动
    const onMove = (offset: OffsetParams) => {
      const offsetAxis = verticalRef.value ? offset.deltaY : offset.deltaX
      const { value: axis } = sizeAxisRef
      const perViewSize = perViewSizeRef.value[axis]

      dragOffset = clampValue(offsetAxis, -perViewSize, perViewSize)

      if (sequenceLayoutRef.value) {
        updateTranslate(previousTranslate - dragOffset, 0)
      }
    }
    // 结束
    const onEnd = () => {
      const { value: realIndex } = realIndexRef
      let currentIndex: number | null = realIndex
      if (!inTransition && dragOffset !== 0 && sequenceLayoutRef.value) {
        const currentTranslate = previousTranslate - dragOffset
        const translates = [
          ...slideTranlatesRef.value.slice(0, totalViewRef.value - 1),
          getLastViewTranslate()
        ]
        let prevOffset: number | null = null
        for (let i = 0; i < translates.length; i++) {
          const offset = Math.abs(translates[i] - currentTranslate)
          if (prevOffset !== null && prevOffset < offset) {
            break
          }
          prevOffset = offset
          currentIndex = i
        }
      }
      if (currentIndex === realIndex) {
        const timeElapsed = Date.now() - dragStartTime
        const { value: axis } = sizeAxisRef
        const perViewSize = perViewSizeRef.value[axis]
        // more than 50% width or faster than 0.4px per ms
        if (dragOffset > perViewSize / 2 || dragOffset / timeElapsed > 0.4) {
          prev()
        } else if (
          dragOffset < -perViewSize / 2 ||
          dragOffset / timeElapsed < -0.4
        ) {
          next()
        }
      }
      if (currentIndex !== null && currentIndex !== realIndex) {
        isEffectiveDrag = true
        toRealIndex(currentIndex)
        void nextTick(() => {
          if (
            !duplicatedableRef.value ||
            uncontrolledDisplayIndexRef.value !== mergedDisplayIndexRef.value
          ) {
            fixTranslate(speedRef.value)
          }
        })
      } else {
        fixTranslate(speedRef.value)
      }
      resetAutoplay()
    }
    // 过度结束事件
    function handleTransitionEnd(): void {
      if (sequenceLayoutRef.value && inTransition) {
        const { value: realIndex } = realIndexRef
        translateTo(realIndex, 0)
      } else {
        resetAutoplay()
      }
      if (sequenceLayoutRef.value) {
        translateStyleRef.value.transitionDuration = '0ms'
      }
      inTransition = false
    }

    // 鼠标滚动
    function handleMousewheel(event: WheelEvent): void {
      event.preventDefault()
      if (inTransition) return
      // eslint-disable-next-line prefer-const
      let { deltaX, deltaY } = event
      if (event.shiftKey && !deltaX) {
        deltaX = deltaY
      }
      const prevMultiplier = -1
      const nextMultiplier = 1
      const m = (deltaX || deltaY) > 0 ? nextMultiplier : prevMultiplier
      let rx = 0
      let ry = 0
      if (verticalRef.value) {
        ry = m
      } else {
        rx = m
      }
      const responseStep = 10
      if (ry * deltaY >= responseStep || rx * deltaX >= responseStep) {
        if (m === nextMultiplier && !isNextDisabled()) {
          next()
        } else if (m === prevMultiplier && !isPrevDisabled()) {
          prev()
        }
      }
    }

    const onReset = () => {
      dragOffset = 0
      dragStartTime = 0
    }

    const { dragging, slidesElRef, controlListeners } = useDragTouch(
      // eslint-disable-next-line no-restricted-syntax
      { ...pick(props, ['touchable', 'draggable', 'mousewheel']) },
      onStart,
      onMove,
      onEnd,
      onReset,
      handleMousewheel
    )

    // function handleResize(): void {}
    // 监听页面slidesElRef尺寸变化
    const selfElRef = ref<HTMLDivElement | null>(null)
    useResizeObserver(slidesElRef, () => {
      if (selfElRef.value) {
        perViewSizeRef.value = calculateSize(
          selfElRef.value as HTMLElement,
          true
        )
      }
      resetAutoplay()
    })

    function handleMouseenter(): void {
      if (props.autoplay) {
        stopAutoplay()
      }
    }
    function handleMouseleave(): void {
      if (props.autoplay) {
        resetAutoplay()
      }
    }

    onMounted(() => {
      watchEffect(resetAutoplay)
      requestAnimationFrame(() => (isMountedRef.value = true))
    })
    onBeforeUnmount(() => {
      stopAutoplay()
    })

    // Fix index when remounting
    onUpdated(() => {
      const { value: slidesEls } = slideElsRef
      const { value: slideVNodes } = slideVNodesRef
      const indexMap = new Map<HTMLElement, number>()
      const getDisplayIndex = (el: HTMLElement): number =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        indexMap.has(el) ? indexMap.get(el)! : -1
      let isChanged = false
      for (let i = 0; i < slidesEls.length; i++) {
        const index = slideVNodes.findIndex((v) => v.el === slidesEls[i])
        if (index !== i) {
          isChanged = true
        }
        indexMap.set(slidesEls[i], index)
      }
      if (isChanged) {
        slidesEls.sort((a, b) => getDisplayIndex(a) - getDisplayIndex(b))
      }
    })
    watch(
      realIndexRef,
      (nextRealIndex, lastRealIndex) => {
        if (nextRealIndex === lastRealIndex) {
          expectedTransitionDirection = 0
          return
        }
        resetAutoplay()
        if (sequenceLayoutRef.value) {
          if (duplicatedableRef.value) {
            const { value: length } = totalViewRef
            if (
              expectedTransitionDirection === -1 &&
              lastRealIndex === 1 &&
              nextRealIndex === length - 2
            ) {
              nextRealIndex = 0
            } else if (
              expectedTransitionDirection === 1 &&
              lastRealIndex === length - 2 &&
              nextRealIndex === 1
            ) {
              nextRealIndex = length - 1
            }
          }
          translateTo(nextRealIndex, speedRef.value)
        } else {
          fixTranslate()
        }
        expectedTransitionDirection = 0
      },
      { immediate: true }
    )
    watch(
      [duplicatedableRef, displaySlidesPerViewRef],
      () =>
        void nextTick(() => {
          toRealIndex(realIndexRef.value)
        })
    )
    watch(
      slideTranlatesRef,
      () => {
        sequenceLayoutRef.value && fixTranslate()
      },
      { deep: true }
    )
    watch(sequenceLayoutRef, (value) => {
      if (!value) {
        inTransition = false
        // if the current mode does not support translate, reset the position of the wrapper
        updateTranslate((previousTranslate = 0))
      } else {
        fixTranslate()
      }
    })

    // 是不是当前index
    function isDisplayActive(index: number): boolean {
      return mergedDisplayIndexRef.value === index
    }

    const arrowSlotPropsRef = computed<ArrowScopedSlotProps>(() => {
      return {
        // eslint-disable-next-line no-restricted-syntax
        ...pick(carouselContext, [
          'to',
          'prev',
          'next',
          'isPrevDisabled',
          'isNextDisabled'
        ]),
        total: displayTotalViewRef.value,
        currentIndex: mergedDisplayIndexRef.value
      }
    })
    const dotSlotPropsRef = computed<DotScopedSlotProps>(() => ({
      total: displayTotalViewRef.value,
      currentIndex: mergedDisplayIndexRef.value,
      to: carouselContext.to
    }))

    const caroulseExposedMethod: CarouselInst = {
      getCurrentIndex: () => mergedDisplayIndexRef.value,
      to,
      prev,
      next,
      stopAutoplay,
      resetAutoplay
    }

    return {
      selfElRef,
      slidesElRef,
      slideVNodes: slideVNodesRef,
      duplicatedable: duplicatedableRef,
      userWantsControl: userWantsControlRef,
      autoSlideSize: autoSlideSizeRef,
      displayIndex: mergedDisplayIndexRef,
      realIndex: realIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      slidesControlListeners: controlListeners,
      handleTransitionEnd,
      handleMouseenter,
      handleMouseleave,
      isActive: isDisplayActive,
      arrowSlotProps: arrowSlotPropsRef,
      dotSlotProps: dotSlotPropsRef,
      // eslint-disable-next-line no-restricted-syntax
      ...caroulseExposedMethod
    }
  },
  render() {
    const {
      showArrow,
      userWantsControl,
      slideStyles,
      dotType,
      dotPlacement,
      slidesControlListeners,
      transitionProps = {},
      arrowSlotProps,
      dotSlotProps,
      $slots: { default: defaultSlot, dots: dotsSlot, arrow: arrowSlot }
    } = this

    const children = (defaultSlot && flatten(defaultSlot())) || []

    let slides = filterCarouselItem(children)
    if (!slides.length) {
      slides = children.map((ch) => (
        <RCarouselItem>{{ default: () => cloneVNode(ch) }}</RCarouselItem>
      ))
    }
    if (this.duplicatedable) {
      slides = addDuplicateSlides(slides)
    }
    this.slideVNodes.value = slides

    return (
      <div
        ref="selfElRef"
        class={bem([
          {
            vertical: this.direction === 'vertical',
            'show-arrow': this.showArrow,
            usercontrol: userWantsControl
          },
          dotPlacement,
          this.direction,
          this.effect
        ])}
        {...slidesControlListeners}
        onMouseenter={this.handleMouseenter}
        onMouseleave={this.handleMouseleave}
      >
        <div
          ref="slidesElRef"
          class={bem('slides')}
          role="listbox"
          style={this.translateStyle}
          onTransitionend={this.handleTransitionEnd}
        >
          {userWantsControl
            ? slides.map((slide, i) => (
                <div style={slideStyles[i]} key={i}>
                  {withDirectives(
                    <Transition {...transitionProps}>
                      {{ default: () => slide }}
                    </Transition>,
                    [[vShow, this.isActive(i)]]
                  )}
                </div>
              ))
            : slides}
        </div>
        {this.showDots &&
          dotSlotProps.total > 1 &&
          resolveSlotWithProps(dotsSlot, dotSlotProps, () => [
            <RCarouselDots
              key={dotType + dotPlacement}
              total={dotSlotProps.total}
              currentIndex={dotSlotProps.currentIndex}
              dotType={dotType}
              trigger={this.trigger}
              keyboard={this.keyboard}
            />
          ])}
        {showArrow &&
          resolveSlotWithProps(arrowSlot, arrowSlotProps, () => [
            <RCarouselArrow />
          ])}
      </div>
    )
  }
})

function filterCarouselItem(vnodes: VNode[]): VNode[] {
  return vnodes.reduce<VNode[]>((carouselItems, vnode) => {
    if (isCarouselItem(vnode)) {
      carouselItems.push(vnode)
    }
    return carouselItems
  }, [])
}
