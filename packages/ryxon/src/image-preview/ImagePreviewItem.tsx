import {
  ref,
  watch,
  computed,
  reactive,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { clamp, numericProp, makeRequiredProp } from '@ryxon/utils'
import { createNamespace } from '../utils'

// Composables
import { useExpose } from '../composables/use-expose'
import { OffsetParams, useDragTouch } from '../composables/use-touch'
import { raf } from '@ryxon/use'

// Components
import { Image } from '../image'
import { Loading } from '../loading'

const bem = createNamespace('image-preview')[1]

const longImageRatio = 2.6

const imagePreviewItemProps = {
  src: String,
  active: Number,
  minZoom: makeRequiredProp(numericProp),
  maxZoom: makeRequiredProp(numericProp),
  rootWidth: makeRequiredProp(Number),
  rootHeight: makeRequiredProp(Number)
}

export type ImagePreviewItemProps = ExtractPropTypes<
  typeof imagePreviewItemProps
>

export default defineComponent({
  props: imagePreviewItemProps,
  emits: ['scale'],
  setup(props, { emit, slots }) {
    const state = reactive({
      scale: 1,
      deg: 0,
      moveX: 0,
      moveY: 0,
      moving: false,
      initializing: false,
      imageRatio: 0
    })

    const vertical = ref(false)
    const isLongImage = ref(false)

    let initialMoveY = 0

    // 图片渲染样式
    const imageStyle = computed(() => {
      const { scale, deg, moveX, moveY, moving, initializing } = state

      let offsetX = moveX / scale
      let offsetY = moveY / scale

      const style: CSSProperties = {
        transitionDuration: moving || initializing ? '0s' : '.3s'
      }

      switch (deg % 360) {
        case 90:
        case -270:
          ;[offsetX, offsetY] = [offsetY, -offsetX]
          break
        case 180:
        case -180:
          ;[offsetX, offsetY] = [-offsetX, -offsetY]
          break
        case 270:
        case -90:
          ;[offsetX, offsetY] = [-offsetY, offsetX]
          break
      }

      style.transform = `scale(${scale}, ${scale}) rotate(${deg}deg) translate(${offsetX}px, ${offsetY}px)`

      return style
    })

    let startMoveX: number
    let startMoveY: number

    const onStart = () => {
      startMoveX = state.moveX
      startMoveY = state.moveY

      state.moving = true
    }

    const maxMoveX = computed(() => {
      if (state.imageRatio) {
        const { rootWidth, rootHeight } = props
        const displayWidth = vertical.value
          ? rootHeight / state.imageRatio
          : rootWidth

        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2)
      }

      return 0
    })

    const maxMoveY = computed(() => {
      if (state.imageRatio) {
        const { rootWidth, rootHeight } = props
        const displayHeight = vertical.value
          ? rootHeight
          : rootWidth * state.imageRatio

        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2)
      }

      return 0
    })

    const onMove = (offset: OffsetParams) => {
      const moveX = startMoveX + offset.deltaX
      const moveY = startMoveY + offset.deltaY

      // 兼容移动端超界情况
      state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value)
      state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value)
    }

    const onEnd = () => {
      state.moving = false
      startMoveX = 0
      startMoveY = 0
    }

    const { slidesElRef, controlListeners } = useDragTouch(
      { touchable: true, draggable: true, mousewheel: false },
      onStart,
      onMove,
      onEnd
    )

    // 设置缩放大小
    const setScale = (scale: number) => {
      // 不超过最大最小的值
      scale = clamp(scale, +props.minZoom, +props.maxZoom + 1)

      if (scale !== state.scale) {
        state.scale = scale
        emit('scale', { scale, index: props.active })
      }
    }

    const setDeg = (type: string) => {
      if (type === 'clockwise') {
        state.deg += 90
      }

      if (type === 'anticlockwise') {
        state.deg -= 90
      }
    }

    //  重置图片
    const resetScale = () => {
      setScale(1)
      state.deg = 0
      state.moveX = 0
      state.moveY = isLongImage.value ? initialMoveY : 0
    }

    const resize = () => {
      const { rootWidth, rootHeight } = props
      const rootRatio = rootHeight / rootWidth
      const { imageRatio } = state

      vertical.value =
        state.imageRatio > rootRatio && imageRatio < longImageRatio
      isLongImage.value =
        state.imageRatio > rootRatio && imageRatio >= longImageRatio

      if (isLongImage.value) {
        initialMoveY = (imageRatio * rootWidth - rootHeight) / 2
        state.moveY = initialMoveY
        state.initializing = true
        raf(() => {
          state.initializing = false
        })
      }

      resetScale()
    }

    const onLoad = (event: Event) => {
      const { naturalWidth, naturalHeight } = event.target as HTMLImageElement
      state.imageRatio = naturalHeight / naturalWidth
      resize()
    }

    watch(() => props.active, resetScale)
    watch(() => [props.rootWidth, props.rootHeight], resize)

    useExpose({ setScale, setDeg, resetScale })

    const imageSlots = {
      loading: () => <Loading type="spinner" />
    }

    return () => (
      <div
        ref={slidesElRef}
        class={bem('swipe-item')}
        {...controlListeners.value}
      >
        {slots.image ? (
          <div class={bem('image-wrap')}>
            {slots.image({
              imageStyle: imageStyle.value,
              src: props.src,
              onLoad
            })}
          </div>
        ) : (
          <Image
            v-slots={imageSlots}
            src={props.src}
            fit="contain"
            class={bem('image', { vertical: vertical.value })}
            style={imageStyle.value}
            onLoad={onLoad}
          />
        )}
      </div>
    )
  }
})
