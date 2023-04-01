import {
  h,
  watch,
  computed,
  Transition,
  defineComponent,
  type VNode,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  isString,
  typeComp,
  iconPropType,
  makeStringProp,
  definePropType,
  createNamespace
} from '../utils'
import { useEventListener, useTimeoutFn } from '@vueuse/core'
import { EVENT_CODE } from '../constants/aria'
import { useGlobalZIndex } from '../composables/use-global-z-index'

// Components
import { Icon } from '../icon'
import { Close } from '@ryxon/icons'

// Types
import type { NotifyTypes } from './types'

const [name, bem] = createNamespace('notify')

export const notifyProps = {
  show: Boolean,
  customClass: { type: String, default: '' },
  dangerouslyUseHTMLString: { type: Boolean, default: false },
  duration: { type: Number, default: 4500 },
  icon: { type: iconPropType },
  id: { type: String, default: '' },
  message: {
    type: definePropType<string | VNode>([String, Object]),
    default: ''
  },
  offset: { type: Number, default: 0 },
  onClick: {
    type: definePropType<() => void>(Function),
    default: () => undefined
  },
  onClose: { type: definePropType<() => void>(Function), required: false },
  position: {
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    default: 'top-right'
  },
  showClose: { type: Boolean, default: true },
  title: { type: String, default: '' },
  type: makeStringProp<NotifyTypes>(''),
  zIndex: { type: Number, default: 0 }
}

export type NotifyProps = ExtractPropTypes<typeof notifyProps>

export default defineComponent({
  name,
  props: notifyProps,
  emits: ['destroy', 'update:show'],
  setup(props, { emit, slots, expose }) {
    const updateShow = (value: boolean) => {
      if (props.show !== value) {
        emit('update:show', value)
      }
    }

    let stopTimer: (() => void) | undefined

    function close() {
      updateShow(false)
    }

    // 开始持续时间
    function startTimer() {
      if (props.duration === 0) return
      ;({ stop: stopTimer } = useTimeoutFn(() => {
        close()
      }, props.duration))
    }

    function clearTimer() {
      stopTimer?.()
    }

    watch(
      () => props.show,
      (val) => {
        clearTimer()
        if (val) startTimer()
      },
      { immediate: true }
    )

    // 判断是否使用了类型图标
    const typeCompIcon = computed(() => typeComp(props.type))

    // 图标样式
    const typeClass = computed(() => {
      const { type } = props
      return { [bem('icon', type) as string]: type && typeCompIcon.value }
    })

    // icon使用的图标
    const iconComponent = computed(() => {
      const { icon } = props
      if (icon) return icon
      return typeCompIcon.value
    })

    const horizontalClass = computed(() =>
      props.position.endsWith('right') ? 'right' : 'left'
    )

    const verticalProperty = computed(() =>
      props.position.startsWith('top') ? 'top' : 'bottom'
    )

    const nextZIndex = useGlobalZIndex()

    const positionStyle = computed<CSSProperties>(() => ({
      [verticalProperty.value]: `${props.offset}px`,
      zIndex: props.zIndex || nextZIndex
    }))

    // 监听按键事件
    function keydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
        clearTimer() // press delete/backspace clear timer
      } else if (code === EVENT_CODE.esc) {
        // press esc to close the notify
        if (props.show) {
          close()
        }
      } else {
        startTimer() // resume timer
      }
    }
    useEventListener(document, 'keydown', keydown)

    expose({ close, updateShow })

    return () => (
      <Transition
        name={bem('fade') as string}
        onBeforeLeave={props.onClose}
        onAfterLeave={() => {
          emit('destroy')
        }}
      >
        <div
          v-show={props.show}
          id={props.id}
          class={[bem(), props.customClass, horizontalClass.value]}
          style={positionStyle.value}
          role="message"
          onMouseenter={clearTimer}
          onMouseleave={startTimer}
        >
          {iconComponent.value && (
            <Icon
              name={isString(iconComponent.value) ? iconComponent.value : ''}
              class={[bem('icon'), typeClass.value]}
            >
              {iconComponent.value &&
                !isString(iconComponent.value) &&
                h(iconComponent.value)}
            </Icon>
          )}
          <div class={bem('group')}>
            {props.title && <h2 class={bem('title')}>{props.title}</h2>}
            <div
              v-show={props.message || slots.default}
              class={bem('content')}
              style={props.title ? undefined : { margin: 0 }}
            >
              {slots.default ? (
                slots.default()
              ) : (
                <>
                  {!props.dangerouslyUseHTMLString ? (
                    <p>{props.message}</p>
                  ) : (
                    <p
                      innerHTML={isString(props.message) ? props.message : ''}
                    ></p>
                  )}
                </>
              )}
            </div>
          </div>
          {props.showClose && (
            <Icon class={bem('close-btn')} onClick={close}>
              <Close />
            </Icon>
          )}
        </div>
      </Transition>
    )
  }
})
