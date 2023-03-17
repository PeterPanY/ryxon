import {
  h,
  ref,
  watch,
  markRaw,
  nextTick,
  reactive,
  onMounted,
  shallowRef,
  effectScope,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
  type TeleportProps
} from 'vue'

// Utils
import {
  pick,
  isString,
  truthProp,
  unknownProp,
  Interceptor,
  windowWidth,
  windowHeight,
  iconPropType,
  makeArrayProp,
  makeStringProp,
  makeNumericProp,
  callInterceptor,
  createNamespace,
  HAPTICS_FEEDBACK
} from '../utils'
import { useEventListener } from '@vueuse/core'
import { throttle } from 'lodash-unified'
import { EVENT_CODE } from '../constants/aria'

// Composables
import { useRect } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Components
import { Icon } from '../icon'
import {
  Close,
  FullScreen,
  RefreshLeft,
  RefreshRight,
  ScaleToOriginal,
  ZoomIn,
  ZoomOut
} from '@ryxon/icons'
import { Swipe, SwipeInstance, SwipeToOptions } from '../swipe'
import { Popup, PopupCloseIconPosition } from '../popup'
import ImagePreviewItem from './ImagePreviewItem'

// Types
import {
  ImageViewerMode,
  ImageViewerAction,
  ImagePreviewScaleEventParams
} from './types'

const [name, bem] = createNamespace('image-preview')

const popupProps = [
  'show',
  'teleport',
  'transition',
  'overlayStyle',
  'closeOnPopstate'
] as const

export const imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp<string>(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: iconPropType,
  transition: String,
  beforeClose: Function as PropType<Interceptor>,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  indicatorPosition: {
    type: String,
    values: ['', 'none'],
    default: 'none'
  },
  showArrow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'always'
  },
  closeOnPopstate: truthProp,
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  showTool: { type: Boolean, default: true },
  zoomRate: { type: Number, default: 0.2 },
  closeOnPressEscape: { type: Boolean, default: true }
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>

export default defineComponent({
  name,
  props: imagePreviewProps,
  emits: ['scale', 'close', 'closed', 'change', 'longPress', 'update:show'],
  setup(props, { emit, slots }) {
    const swipeRef = ref<SwipeInstance>()

    const scopeEventListener = effectScope()

    const modes: Record<'CONTAIN' | 'ORIGINAL', ImageViewerMode> = {
      CONTAIN: {
        name: 'contain',
        icon: markRaw(FullScreen)
      },
      ORIGINAL: {
        name: 'original',
        icon: markRaw(ScaleToOriginal)
      }
    }

    const mode = shallowRef<ImageViewerMode>(modes.CONTAIN)

    const state = reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false
    })

    const resize = () => {
      if (swipeRef.value) {
        const rect = useRect(swipeRef.value.$el)
        state.rootWidth = rect.width
        state.rootHeight = rect.height
        swipeRef.value.resize()
      }
    }

    const currentScale = ref(1)

    // 放大缩小方法
    const emitScale = (args: ImagePreviewScaleEventParams) => {
      currentScale.value = args.scale
      emit('scale', args)
    }

    const updateShow = (show: boolean) => emit('update:show', show)

    const setActive = (active: number) => {
      if (active !== state.active) {
        state.active = active
        emit('change', active)
      }
    }

    // 页码内容
    const renderIndex = () => {
      if (props.showIndex) {
        return (
          <div class={bem('index')}>
            {slots.index
              ? slots.index({ index: state.active })
              : `${state.active + 1} / ${props.images.length}`}
          </div>
        )
      }
    }

    // 覆盖在图片预览上方的内容
    const renderCover = () => {
      if (slots.cover) {
        return <div class={bem('cover')}>{slots.cover()}</div>
      }
    }

    const boxRefs: Array<any> = []

    const setBoxRef = (el: any) => {
      if (el) boxRefs.push(el)
    }

    const handleActions = (action: ImageViewerAction) => {
      switch (action) {
        case 'zoomOut':
          boxRefs[state.active]?.setScale(currentScale.value - props.zoomRate)
          break
        case 'zoomIn':
          boxRefs[state.active]?.setScale(currentScale.value + props.zoomRate)
          break
        case 'clockwise':
          boxRefs[state.active]?.setDeg('clockwise')
          break
        case 'anticlockwise':
          boxRefs[state.active]?.setDeg('anticlockwise')
          break
      }
    }

    // 图标切换
    const toggleMode = () => {
      //  将对象中key 变成数组
      boxRefs[state.active]?.resetScale()
    }

    function unregisterEventListener() {
      scopeEventListener.stop()
    }

    function hide() {
      callInterceptor(props.beforeClose, {
        args: [state.active],
        done: () => updateShow(false)
      })
      unregisterEventListener()
    }

    function registerEventListener() {
      const keydownHandler = throttle((e: KeyboardEvent) => {
        switch (e.code) {
          // ESC
          case EVENT_CODE.esc:
            props.closeOnPressEscape && hide()
            break
          // SPACE
          case EVENT_CODE.space:
            toggleMode()
            break
          // LEFT_ARROW
          case EVENT_CODE.left:
            swipeRef.value?.prev()
            break
          // UP_ARROW
          case EVENT_CODE.up:
            handleActions('zoomIn')
            break
          // RIGHT_ARROW
          case EVENT_CODE.right:
            swipeRef.value?.next()
            break
          // DOWN_ARROW
          case EVENT_CODE.down:
            handleActions('zoomOut')
            break
        }
      })
      const mousewheelHandler = throttle((e: WheelEvent) => {
        const delta = e.deltaY || e.deltaX
        handleActions(delta < 0 ? 'zoomIn' : 'zoomOut')
      })

      scopeEventListener.run(() => {
        useEventListener(document, 'keydown', keydownHandler)
        useEventListener(document, 'wheel', mousewheelHandler)
      })
    }

    // 操作栏
    const renderTool = () => {
      if (props.showTool) {
        return (
          <div class={bem('actions')}>
            {slots.tool ? (
              slots.tool()
            ) : (
              <div class={bem('actions-inner')}>
                <Icon onClick={() => handleActions('zoomOut')}>
                  <ZoomOut />
                </Icon>
                <Icon onClick={() => handleActions('zoomIn')}>
                  <ZoomIn />
                </Icon>
                <Icon onClick={toggleMode}>{h(mode.value.icon)}</Icon>
                <Icon onClick={() => handleActions('anticlockwise')}>
                  <RefreshLeft />
                </Icon>
                <Icon onClick={() => handleActions('clockwise')}>
                  <RefreshRight />
                </Icon>
              </div>
            )}
          </div>
        )
      }
    }

    // 开始拖动轮播组件时触发
    const onDragStart = () => {
      state.disableZoom = true
    }

    // 结束拖动轮播组件时触发
    const onDragEnd = () => {
      state.disableZoom = false
    }

    const renderImages = () => (
      <Swipe
        ref={swipeRef}
        lazyRender
        loop={props.loop}
        class={bem('swipe')}
        duration={props.swipeDuration}
        initialSwipe={props.startPosition}
        indicatorPosition={props.indicatorPosition}
        indicatorColor="white"
        arrow={props.showArrow}
        onChange={setActive}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {props.images.map((image, index) => (
          <ImagePreviewItem
            ref={setBoxRef}
            v-slots={{
              image: slots.image
            }}
            src={image}
            show={props.show}
            active={state.active}
            maxZoom={props.maxZoom}
            minZoom={props.minZoom}
            rootWidth={state.rootWidth}
            rootHeight={state.rootHeight}
            disableZoom={state.disableZoom}
            onScale={emitScale}
            onClose={hide}
            onLongPress={() => emit('longPress', { index })}
          />
        ))}
      </Swipe>
    )

    const renderClose = () => {
      if (props.closeable) {
        return (
          <Icon
            role="button"
            name={isString(props.closeIcon) ? props.closeIcon : ''}
            class={[
              bem('close-icon', props.closeIconPosition),
              HAPTICS_FEEDBACK
            ]}
            onClick={hide}
          >
            {props.closeIcon ? (
              !isString(props.closeIcon) && h(props.closeIcon)
            ) : (
              <Close />
            )}
          </Icon>
        )
      }
    }

    // 关闭且动画结束后触发
    const onClosed = () => emit('closed')

    const swipeTo = (index: number, options?: SwipeToOptions) =>
      swipeRef.value?.swipeTo(index, options)

    useExpose({ swipeTo })

    onMounted(() => {
      registerEventListener()

      resize()
    })

    watch([windowWidth, windowHeight], resize)

    watch(
      () => props.startPosition,
      (value) => setActive(+value)
    )

    watch(
      () => props.show,
      (value) => {
        const { images, startPosition } = props
        if (value) {
          setActive(+startPosition)
          nextTick(() => {
            resize()
            swipeTo(+startPosition, { immediate: true })
          })
        } else {
          emit('close', {
            index: state.active,
            url: images[state.active]
          })
        }
      }
    )

    return () => (
      <Popup
        class={[bem(), props.className]}
        overlayClass={[bem('overlay'), props.overlayClass]}
        onClosed={onClosed}
        onUpdate:show={updateShow}
        {...pick(props, popupProps)}
      >
        {renderClose()}
        {renderImages()}
        {renderIndex()}
        {renderCover()}
        {renderTool()}
      </Popup>
    )
  }
})
