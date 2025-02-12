import {
  ref,
  watch,
  provide,
  computed,
  nextTick,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

// Utils
import { numericProp } from '@ryxon/utils'
import { createNamespace } from '../utils'

// Composables
import { doubleRaf } from '@ryxon/use'
import { useId } from '../composables/use-id'
import { TAB_STATUS_KEY } from '../composables/use-tab-status'

// Components

const [name, bem] = createNamespace('tab')

export const tabProps = {
  index: Number,
  id: String,
  name: numericProp,
  lazyRender: Boolean,
  currentName: numericProp,
  animated: Boolean,
  swipeable: Boolean,
  scrollspy: Boolean
}

export type TabProps = ExtractPropTypes<typeof tabProps>

export default defineComponent({
  name,
  props: tabProps,
  emits: ['rendered'],
  setup(props, { emit, slots }) {
    const id = useId()
    const inited = ref(false)

    const init = () => {
      inited.value = true

      if (props.lazyRender) {
        nextTick(() => {
          emit('rendered')
        })
      }
    }

    const active = computed(() => {
      const isActive = (props.name || props.index) === props.currentName

      if (isActive && !inited.value) {
        init()
      }

      return isActive
    })

    const hasInactiveClass = ref(!active.value)

    watch(active, (val) => {
      if (val) {
        hasInactiveClass.value = false
      } else {
        // 将选项卡标记为非活动，直到呈现活动选项卡
        // 避免不正确的滚动位置或其他渲染问题
        doubleRaf(() => {
          hasInactiveClass.value = true
        })
      }
    })

    provide(TAB_STATUS_KEY, active)

    return () => {
      const label = `${props.id}-${props.index}`
      const { animated, swipeable, scrollspy, lazyRender } = props

      if (!slots.default && !animated) {
        return
      }

      const show = scrollspy || active.value

      if (animated || swipeable) {
        return (
          <div
            id={id}
            role="tabpanel"
            class={bem('panel-wrapper', { inactive: hasInactiveClass.value })}
            tabindex={active.value ? 0 : -1}
            aria-hidden={!active.value}
            aria-labelledby={label}
            data-allow-mismatch="attribute"
          >
            <div class={bem('panel')}>
              {inited.value ? slots.default?.() : null}
            </div>
          </div>
        )
      }

      const shouldRender = inited.value || scrollspy || !lazyRender
      const Content = shouldRender ? slots.default?.() : null

      return (
        <div
          v-show={show}
          id={id}
          role="tabpanel"
          class={bem('panel')}
          tabindex={show ? 0 : -1}
          aria-labelledby={label}
          data-allow-mismatch="attribute"
        >
          {Content}
        </div>
      )
    }
  }
})
