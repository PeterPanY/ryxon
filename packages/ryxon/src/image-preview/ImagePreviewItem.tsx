import {
  watch,
  computed,
  reactive,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { clamp, numericProp, createNamespace, makeRequiredProp } from '../utils'

// Composables
import { useExpose } from '../composables/use-expose'

// Components
import { Image } from '../image'
import { Loading } from '../loading'

const bem = createNamespace('image-preview')[1]

const imagePreviewItemProps = {
  src: String,
  show: Boolean,
  active: Number,
  minZoom: makeRequiredProp(numericProp),
  maxZoom: makeRequiredProp(numericProp),
  rootWidth: makeRequiredProp(Number),
  rootHeight: makeRequiredProp(Number),
  disableZoom: Boolean
}

export type ImagePreviewItemProps = ExtractPropTypes<
  typeof imagePreviewItemProps
>

export default defineComponent({
  props: imagePreviewItemProps,
  emits: ['scale', 'close', 'longPress'],
  setup(props, { emit, slots }) {
    const state = reactive({
      scale: 1,
      deg: 0,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    })

    const vertical = computed(() => {
      const { rootWidth, rootHeight } = props
      const rootRatio = rootHeight / rootWidth
      return state.imageRatio > rootRatio
    })

    // 图片渲染样式
    const imageStyle = computed(() => {
      const { scale, deg, moveX, moveY, moving, zooming } = state

      let offsetX = moveX / scale
      let offsetY = moveY / scale

      const style: CSSProperties = {
        transitionDuration: zooming || moving ? '0s' : '.3s'
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

      style.transform = `scale(${scale}, ${scale})  rotate(${deg}deg) translate(${offsetX}px, ${offsetY}px)`

      return style
    })

    // 设置缩放大小
    const setScale = (scale: number) => {
      // 不超过最大最小的值
      scale = clamp(scale, +props.minZoom, +props.maxZoom + 1)

      if (scale !== state.scale) {
        state.scale = scale
        emit('scale', {
          scale,
          index: props.active
        })
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
      state.moveY = 0
    }

    const onLoad = (event: Event) => {
      const { naturalWidth, naturalHeight } = event.target as HTMLImageElement
      state.imageRatio = naturalHeight / naturalWidth
    }

    watch(() => props.active, resetScale)
    watch(
      () => props.show,
      (value) => {
        if (!value) {
          resetScale()
        }
      }
    )

    useExpose({ setScale, setDeg, resetScale })

    const imageSlots = {
      loading: () => <Loading type="spinner" />
    }

    return () => (
      <div class={bem('swipe-item')}>
        {slots.image ? (
          <div class={bem('image-wrap')}>{slots.image({ src: props.src })}</div>
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
