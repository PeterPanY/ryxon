import {
  h,
  ref,
  toRef,
  watch,
  provide,
  Teleport,
  nextTick,
  computed,
  onMounted,
  Transition,
  onActivated,
  onDeactivated,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { popupSharedProps } from './shared'
import {
  isDef,
  extend,
  isString,
  makeStringProp,
  callInterceptor
} from '@ryxon/utils'
import { iconPropType, createNamespace, HAPTICS_FEEDBACK } from '../utils'

// Composables
import { useEventListener } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'
import { useLockScroll } from '../composables/use-lock-scroll'
import { useLazyRender } from '../composables/use-lazy-render'
import { POPUP_TOGGLE_KEY } from '../composables/on-popup-reopen'
import { useGlobalZIndex } from '../composables/use-global-z-index'
import { useScopeId } from '../composables/use-scope-id'

// Components
import { Icon } from '../icon'
import { Close } from '@ryxon/icons'
import { Overlay } from '../overlay'

// Types
import type { PopupPosition, PopupCloseIconPosition } from './types'

export const popupProps = extend({}, popupSharedProps, {
  round: Boolean,
  position: makeStringProp<PopupPosition>('center'),
  closeIcon: iconPropType,
  closeable: Boolean,
  transition: String,
  iconPrefix: String,
  closeOnPopstate: Boolean,
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: Boolean,
  id: String
})

export type PopupProps = ExtractPropTypes<typeof popupProps>

const [, bem] = createNamespace('popup')

export default defineComponent({
  name: 'RPopup',
  inheritAttrs: false,
  props: popupProps,
  emits: [
    'open',
    'close',
    'opened',
    'closed',
    'keydown',
    'clickPopup',
    'mouseenter',
    'mouseleave',
    'afterLeave',
    'afterEnter',
    'beforeEnter',
    'beforeLeave',
    'update:show',
    'clickOverlay',
    'clickCloseIcon'
  ],

  setup(props, { emit, attrs, slots }) {
    let opened: boolean
    let shouldReopen: boolean

    const zIndex = ref<number>()
    const popupRef = ref<HTMLElement>()
    const rendered = ref(!props.destroyOnClose) // 当destroyOnClose为true时，我们将其初始化为false，反之亦然

    // 判断是否在显示弹层时才渲染节点
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)

    const style = computed(() => {
      const style: CSSProperties = extend(
        { zIndex: zIndex.value },
        props.popperStyle
      )

      if (isDef(props.duration)) {
        const key =
          props.position === 'center'
            ? 'animationDuration'
            : 'transitionDuration'
        style[key] = `${props.duration}s`
      }

      return style
    })

    const open = () => {
      if (!opened) {
        opened = true

        zIndex.value =
          props.zIndex !== undefined ? +props.zIndex : useGlobalZIndex()

        emit('open')
      }
    }

    const close = () => {
      if (opened) {
        callInterceptor(props.beforeClose, {
          done() {
            opened = false
            emit('close')
            emit('update:show', false)
          }
        })
      }
    }

    const onClickOverlay = (event: MouseEvent) => {
      emit('clickOverlay', event)

      if (props.closeOnClickOverlay) {
        close()
      }
    }

    const renderOverlay = () => {
      if (props.overlay) {
        return (
          <Overlay
            v-slots={{ default: slots['overlay-content'] }}
            show={props.show}
            class={props.overlayClass}
            zIndex={zIndex.value}
            duration={props.duration}
            customStyle={props.overlayStyle}
            role={props.closeOnClickOverlay ? 'button' : undefined}
            tabindex={props.closeOnClickOverlay ? 0 : undefined}
            {...useScopeId()}
            onClick={onClickOverlay}
          />
        )
      }
    }

    const onClickCloseIcon = (event: MouseEvent) => {
      emit('clickCloseIcon', event)
      close()
    }

    const renderCloseIcon = () => {
      if (props.closeable) {
        return (
          <Icon
            role="button"
            tabindex={0}
            name={isString(props.closeIcon) ? props.closeIcon : ''}
            class={[
              bem('close-icon', props.closeIconPosition),
              HAPTICS_FEEDBACK
            ]}
            classPrefix={props.iconPrefix}
            onClick={onClickCloseIcon}
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

    const onMouseenter = (e: Event) => emit('mouseenter', e)
    const onMouseleave = (e: Event) => emit('mouseleave', e)

    const onClosed = () => {
      emit('afterLeave')
      emit('closed')

      if (props.destroyOnClose) {
        rendered.value = false
      }
    }
    const onBeforeEnter = () => emit('beforeEnter')
    let timer: ReturnType<typeof setTimeout> | null
    const onOpened = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        emit('afterEnter')
        emit('opened')
      })
    }
    const onBeforeLeave = () => emit('beforeLeave')
    const onKeydown = (event: KeyboardEvent) => emit('keydown', event)
    const onClickPopup = () => emit('clickPopup')

    const renderPopup = lazyRender(() => {
      const { round, position, safeAreaInsetTop, safeAreaInsetBottom } = props

      return (
        <div
          v-show={props.show}
          ref={popupRef}
          style={style.value}
          role="dialog"
          tabindex={0}
          id={props.id}
          class={[
            bem({ round, [position]: position }),
            {
              'r-safe-area-top': safeAreaInsetTop,
              'r-safe-area-bottom': safeAreaInsetBottom
            },
            props.popperClass
          ]}
          {...attrs}
          {...useScopeId()}
          onKeydown={onKeydown}
          onMouseenter={onMouseenter}
          onMouseleave={onMouseleave}
          onClick={onClickPopup}
        >
          {rendered.value && (
            <>
              {slots.default?.()}
              {renderCloseIcon()}
            </>
          )}
        </div>
      )
    })

    const renderTransition = () => {
      const { position, transition, transitionAppear } = props
      const name =
        position === 'center' ? 'r-fade' : `r-popup-slide-${position}`

      return (
        <Transition
          v-slots={{ default: renderPopup }}
          name={transition || name}
          appear={transitionAppear}
          onAfterLeave={onClosed}
          onBeforeEnter={onBeforeEnter}
          onAfterEnter={onOpened}
          onBeforeLeave={onBeforeLeave}
        />
      )
    }

    watch(
      () => props.show,
      (show) => {
        if (show) {
          rendered.value = true // 启用延迟渲染
        }

        if (show && !opened) {
          open()

          if (attrs.tabindex === 0) {
            nextTick(() => {
              popupRef.value?.focus()
            })
          }
        }
        if (!show && opened) {
          opened = false
          emit('close')
        }
      }
    )

    useExpose({ popupRef })

    useEventListener('popstate', () => {
      if (props.closeOnPopstate) {
        close()
        shouldReopen = false
      }
    })

    if (props.lockScroll) {
      useLockScroll(toRef(props, 'show'))
    }

    onMounted(() => {
      // 兼容ssr上找不到document报错问题。
      // useLockScroll(document.body, () => props.show && props.lockScroll)

      if (props.show) {
        rendered.value = true // 启用延迟渲染
        open()
      }
    })

    onActivated(() => {
      if (shouldReopen) {
        emit('update:show', true)
        shouldReopen = false
      }
    })

    onDeactivated(() => {
      // teleported popup should be closed when deactivated
      if (props.show && props.teleport) {
        close()
        shouldReopen = true
      }
    })

    provide(POPUP_TOGGLE_KEY, () => props.show)

    return () => {
      if (props.teleport) {
        return (
          <Teleport to={props.teleport}>
            {renderOverlay()}
            {renderTransition()}
          </Teleport>
        )
      }

      return (
        <>
          {renderOverlay()}
          {renderTransition()}
        </>
      )
    }
  }
})
