import {
  ref,
  vShow,
  inject,
  nextTick,
  computed,
  Transition,
  withDirectives,
  defineComponent,
  type PropType,
  type CSSProperties
} from 'vue'

// Utils
import { createNamespace } from '../utils'
import { loadingBarProviderInjectionKey } from './types'

const [name, containerBem] = createNamespace('loading-bar-container')
const [, bem] = createNamespace('loading-bar')

function createClassName(status: 'error' | 'finishing' | 'starting'): any {
  return bem('', [status])
}

export default defineComponent({
  name,
  props: {
    containerStyle: [String, Object] as PropType<string | CSSProperties>
  },
  emits: [],
  setup() {
    const { props: providerProps } = inject(loadingBarProviderInjectionKey)!
    const loadingBarRef = ref<HTMLElement | null>(null)
    const enteringRef = ref(false)
    const startedRef = ref(false)
    const loadingRef = ref(false)
    const transitionDisabledRef = ref(false)
    let finishing = false
    const erroringRef = ref(false)

    const mergedLoadingBarStyle = computed(() => {
      const { loadingBarStyle } = providerProps
      if (!loadingBarStyle) return ''
      return loadingBarStyle[erroringRef.value ? 'error' : 'loading']
    })

    async function init(): Promise<void> {
      enteringRef.value = false
      loadingRef.value = false
      finishing = false
      erroringRef.value = false
      transitionDisabledRef.value = true
      await nextTick()
      transitionDisabledRef.value = false
    }
    async function start(
      fromProgress = 0,
      toProgress = 80,
      status: 'starting' | 'error' = 'starting'
    ): Promise<void> {
      startedRef.value = true
      await init()
      if (finishing) return
      loadingRef.value = true
      await nextTick()
      const el = loadingBarRef.value
      if (!el) return
      el.style.maxWidth = `${fromProgress}%`
      el.style.transition = 'none'
      void el.offsetWidth
      el.className = createClassName(status)
      el.style.transition = ''
      el.style.maxWidth = `${toProgress}%`
    }
    async function finish(): Promise<void> {
      if (finishing || erroringRef.value) return
      if (startedRef.value) {
        await nextTick()
      }
      finishing = true
      const el = loadingBarRef.value
      if (!el) return
      el.className = createClassName('finishing')
      el.style.maxWidth = '100%'
      void el.offsetWidth
      loadingRef.value = false
    }
    function error(): void {
      if (finishing || erroringRef.value) return
      if (!loadingRef.value) {
        void start(100, 100, 'error').then(() => {
          erroringRef.value = true
          const el = loadingBarRef.value
          if (!el) return
          el.className = createClassName('error')
          void el.offsetWidth
          loadingRef.value = false
        })
      } else {
        erroringRef.value = true
        const el = loadingBarRef.value
        if (!el) return
        el.className = createClassName('error')
        el.style.maxWidth = '100%'
        void el.offsetWidth
        loadingRef.value = false
      }
    }
    function handleEnter(): void {
      enteringRef.value = true
    }
    function handleAfterEnter(): void {
      enteringRef.value = false
    }
    async function handleAfterLeave(): Promise<void> {
      await init()
    }

    return {
      loadingBarRef,
      started: startedRef,
      loading: loadingRef,
      entering: enteringRef,
      transitionDisabled: transitionDisabledRef,
      start,
      error,
      finish,
      handleEnter,
      handleAfterEnter,
      handleAfterLeave,
      mergedLoadingBarStyle
    }
  },
  render() {
    if (!this.started) return null

    return (
      <Transition
        name="r-fade-in-transition"
        appear
        onEnter={this.handleEnter}
        onAfterEnter={this.handleAfterEnter}
        onAfterLeave={this.handleAfterLeave}
        css={!this.transitionDisabled}
      >
        {{
          default: () => {
            return withDirectives(
              <div class={containerBem()} style={this.containerStyle}>
                <div
                  ref="loadingBarRef"
                  class={bem()}
                  style={[this.mergedLoadingBarStyle as any]}
                />
              </div>,
              [[vShow, this.loading || (!this.loading && this.entering)]]
            )
          }
        }}
      </Transition>
    )
  }
})
