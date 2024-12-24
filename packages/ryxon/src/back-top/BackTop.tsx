import {
  ref,
  watch,
  computed,
  Teleport,
  nextTick,
  onMounted,
  defineComponent,
  type PropType,
  type TeleportProps,
  type ExtractPropTypes,
  onDeactivated,
  onActivated
} from 'vue'

// Utils
import {
  extend,
  addUnit,
  inBrowser,
  numericProp,
  getScrollTop,
  getZIndexStyle,
  makeNumericProp
} from '@ryxon/utils'
import { createNamespace } from '../utils'
import { throttle } from '../lazyload/vue-lazyload/util'

// Composables
import { useEventListener, getScrollParent } from '@ryxon/use'

// Components
import { Icon } from '../icon'
import { CaretTop } from '@ryxon/icons'

const [name, bem] = createNamespace('back-top')

export const backTopProps = {
  active: Boolean,
  right: numericProp,
  bottom: numericProp,
  zIndex: numericProp,
  target: [String, Object] as PropType<TeleportProps['to']>,
  offset: makeNumericProp(200),
  immediate: Boolean,
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  }
}

export type BackTopProps = ExtractPropTypes<typeof backTopProps>

export default defineComponent({
  name,

  inheritAttrs: false,

  props: backTopProps,

  emits: ['update:active', 'click'],

  setup(props, { emit, slots, attrs }) {
    let shouldReshow = false
    const show = ref(false)
    const root = ref<HTMLElement>()
    const scrollParent = ref<Window | Element>()

    const style = computed(() =>
      extend(getZIndexStyle(props.zIndex), {
        right: addUnit(props.right),
        bottom: addUnit(props.bottom)
      })
    )

    const onClick = (event: MouseEvent) => {
      emit('click', event)
      scrollParent.value?.scrollTo({
        top: 0,
        behavior: props.immediate ? 'auto' : 'smooth'
      })
    }

    const scroll = () => {
      show.value = scrollParent.value
        ? getScrollTop(scrollParent.value) >= +props.offset
        : false

      if (show.value !== props.active) {
        emit('update:active', show.value)
      }
    }

    const getTarget = () => {
      const { target } = props

      if (typeof target === 'string') {
        const el = document.querySelector(target)

        if (el) {
          return el
        }

        if (process.env.NODE_ENV !== 'production') {
          console.error(
            `[Ryxon] BackTop: target element "${target}" was not found, the BackTop component will not be rendered.`
          )
        }
      } else {
        return target as Element
      }
    }

    const updateTarget = () => {
      if (inBrowser) {
        nextTick(() => {
          scrollParent.value = props.target
            ? getTarget()
            : getScrollParent(root.value!)
          scroll()
        })
      }
    }

    // throttle不能使用@vueuse/core的useThrottle，因为useThrottle会导致滚动太快时，back-top不隐藏
    useEventListener('scroll', throttle(scroll, 100), { target: scrollParent })

    onMounted(updateTarget)

    onActivated(() => {
      if (shouldReshow) {
        show.value = true
        shouldReshow = false
      }
    })

    onDeactivated(() => {
      // teleport 后 back-top 应在停用时隐藏
      if (show.value && props.teleport) {
        show.value = false
        shouldReshow = true
      }
    })

    watch(() => props.target, updateTarget)
    watch(
      () => props.active,
      (value) => {
        if (value !== show.value) {
          show.value = value
        }
      },
      { immediate: true }
    )

    return () => {
      const Content = (
        <div
          ref={!props.teleport ? root : undefined}
          class={bem({ active: show.value })}
          style={style.value}
          onClick={onClick}
          {...attrs}
        >
          {slots.default ? (
            slots.default()
          ) : (
            <Icon class={bem('icon')}>
              <CaretTop></CaretTop>
            </Icon>
          )}
        </div>
      )

      if (props.teleport) {
        return [
          <div ref={root} class={bem('placeholder')}></div>,
          <Teleport to={props.teleport}>{Content}</Teleport>
        ]
      }
      return Content
    }
  }
})
