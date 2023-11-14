import {
  ref,
  nextTick,
  provide,
  Teleport,
  onMounted,
  defineComponent,
  type PropType,
  type CSSProperties,
  type TeleportProps,
  type ExtractPropTypes
} from 'vue'

// Utils
import { extend, createNamespace } from '../utils'
import {
  loadingBarApiInjectionKey,
  loadingBarProviderInjectionKey
} from './types'

// Components
import Bar from './Bar'

// Types
import type { LoadingBarInst, LoadingBarProviderInst } from './types'

const [name] = createNamespace('loading-bar')

export const loadingBarProps = {
  teleport: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: undefined
  },
  containerStyle: [String, Object] as PropType<string | CSSProperties>,
  loadingBarStyle: {
    type: Object as PropType<{
      loading?: string | CSSProperties
      error?: string | CSSProperties
    }>
  }
}

export type LoadingBarProps = ExtractPropTypes<typeof loadingBarProps>

export default defineComponent({
  name,
  props: loadingBarProps,
  emits: [],
  setup(props) {
    const loadingBarRef = ref<LoadingBarInst | null>(null)
    const isMounted = ref(false)

    onMounted(() => {
      isMounted.value = true
    })

    const methods: LoadingBarProviderInst = {
      start() {
        if (isMounted.value) {
          loadingBarRef.value?.start()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.start()
          })
        }
      },
      error() {
        if (isMounted.value) {
          loadingBarRef.value?.error()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.error()
          })
        }
      },
      finish() {
        if (isMounted.value) {
          loadingBarRef.value?.finish()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.finish()
          })
        }
      }
    }

    provide(loadingBarApiInjectionKey, methods)
    provide(loadingBarProviderInjectionKey, {
      props
    })

    return extend(methods, {
      loadingBarRef
    })
  },
  render() {
    return (
      <>
        <Teleport
          disabled={this.teleport === false}
          to={this.teleport || 'body'}
        >
          <Bar ref="loadingBarRef" containerStyle={this.containerStyle} />
        </Teleport>
        {this.$slots.default?.()}
      </>
    )
  }
})
