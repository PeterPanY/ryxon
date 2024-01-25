import {
  ref,
  nextTick,
  provide,
  Teleport,
  defineComponent,
  type PropType,
  type CSSProperties,
  type TeleportProps,
  type ExtractPropTypes
} from 'vue'

// Utils
import { extend } from '@ryxon/utils'
import { createNamespace } from '../utils'
import {
  loadingBarApiInjectionKey,
  loadingBarProviderInjectionKey
} from './types'

// Components
import Bar from './Bar'
import { useIsMounted } from '@ryxon/use'

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
    const isMountedRef = useIsMounted()

    const methods: LoadingBarProviderInst = {
      start() {
        if (isMountedRef.value) {
          loadingBarRef.value?.start()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.start()
          })
        }
      },
      error() {
        if (isMountedRef.value) {
          loadingBarRef.value?.error()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.error()
          })
        }
      },
      finish() {
        if (isMountedRef.value) {
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
