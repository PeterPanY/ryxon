import {
  h,
  ref,
  watch,
  computed,
  onMounted,
  Transition,
  defineComponent,
  type VNode,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

import {
  isString,
  iconPropType,
  definePropType,
  createNamespace,
  TypeComponentsMap
} from '../utils'
import { useEventListener, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import {
  useGlobalZIndex,
  setGlobalZIndex
} from '../composables/use-global-z-index'
import { getLastOffset } from './instance'
import { messageEmits, messageTypes } from './types'
import { EVENT_CODE } from '../constants/aria'
import { Icon } from '../icon'
import { Badge } from '../badge'
import { Close } from '@ryxon/icons'

const [name, bem, , isBem] = createNamespace('message')

export const messageProps = {
  customClass: { type: String, default: '' },
  center: { type: Boolean, default: false },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: { type: Number, default: 3000 },
  icon: { type: iconPropType, default: undefined },
  id: { type: String, default: '' },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function
    ]),
    default: ''
  },
  onClose: { type: definePropType<() => void>(Function), required: false },
  showClose: { type: Boolean, default: false },
  type: { type: String, values: messageTypes, default: 'info' },
  offset: { type: Number, default: 16 },
  zIndex: { type: Number, default: undefined },
  grouping: { type: Boolean, default: false },
  repeatNum: { type: Number, default: 1 }
}

export type MessageProps = ExtractPropTypes<typeof messageProps>

export default defineComponent({
  name,
  props: messageProps,
  emits: messageEmits,
  setup(props, { emit, slots, expose }) {
    const visible = ref(false)
    const messageRef = ref<HTMLDivElement>()

    const height = ref(0)
    const lastOffset = computed(() => getLastOffset(props.id))
    const offset = computed(() => props.offset + lastOffset.value)
    const bottom = computed((): number => height.value + offset.value)

    let stopTimer: (() => void) | undefined

    function close() {
      visible.value = false
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

    onMounted(() => {
      startTimer()
      visible.value = true
    })

    function keydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.esc) {
        // press esc to close the message
        close()
      }
    }

    const nextZIndex = useGlobalZIndex()
    setGlobalZIndex(nextZIndex)

    // 文本样式
    const customStyle = computed<CSSProperties>(() => ({
      top: `${offset.value}px`,
      zIndex: props.zIndex || nextZIndex
    }))

    const badgeType = computed(() => props.type || 'info')

    // 判断是否使用了类型图标
    const isType = computed(() => {
      const { type } = props
      if (
        type === 'success' ||
        type === 'warning' ||
        type === 'info' ||
        type === 'danger'
      ) {
        return TypeComponentsMap[type]
      }
      return ''
    })

    // 图标样式
    const typeClass = computed(() => {
      const { type } = props
      return { [bem('icon', type) as string]: type && isType.value }
    })

    // icon使用的图标
    const iconComponent = computed(() => {
      const { icon } = props
      if (icon) return icon

      return isType.value
    })

    useEventListener(document, 'keydown', keydown)

    useResizeObserver(messageRef, () => {
      height.value = messageRef.value!.getBoundingClientRect().height
    })

    watch(
      () => props.repeatNum,
      () => {
        clearTimer()
        startTimer()
      }
    )

    expose({ visible, bottom, close })

    return () => (
      <Transition
        name={bem('fade') as string}
        onBeforeLeave={props.onClose}
        onAfterLeave={() => {
          emit('destroy')
        }}
      >
        <div
          ref={messageRef}
          v-show={visible.value}
          id={props.id}
          class={[
            bem(),
            { [bem(props.type) as string]: props.type && !props.icon },
            isBem('center', props.center),
            isBem('closable', props.showClose),
            props.customClass
          ]}
          style={customStyle.value}
          role="message"
          onMouseenter={clearTimer}
          onMouseleave={startTimer}
        >
          {props.repeatNum > 1 && (
            <Badge
              content={props.repeatNum}
              type={badgeType.value}
              class={bem('badge')}
            ></Badge>
          )}
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
          {slots.default ? (
            slots.default()
          ) : (
            <>
              {!props.dangerouslyUseHTMLString ? (
                <p class={bem('content')}>{props.message}</p>
              ) : (
                <p class={bem('content')} innerHTML={props.message}></p>
              )}
            </>
          )}
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
