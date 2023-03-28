// @ts-nocheck
import {
  h,
  ref,
  vShow,
  toRefs,
  withCtx,
  reactive,
  createApp,
  Transition,
  createVNode,
  withDirectives
} from 'vue'
import { removeClass, createNamespace } from '../utils'
import { Loading } from './index'
import type { LoadingOptionsResolved } from './types'

export function createLoadingComponent(options: LoadingOptionsResolved) {
  let afterLeaveTimer: number

  const [, bem] = createNamespace('v-loading')
  const afterLeaveFlag = ref(false)
  const data = reactive({
    // eslint-disable-next-line no-restricted-syntax
    ...options,
    originalPosition: '',
    originalOverflow: '',
    visible: false
  })

  function setText(text: string) {
    data.text = text
  }

  function removeElLoadingChild(): void {
    // eslint-disable-next-line no-use-before-define
    vm.$el?.parentNode?.removeChild(vm.$el)
  }

  function destroySelf() {
    const target = data.parent
    if (!target.vLoadingAddClassList) {
      let loadingNumber: number | string | null =
        target.getAttribute('loading-number')
      loadingNumber = Number.parseInt(loadingNumber as any, 10) - 1
      if (!loadingNumber) {
        removeClass(target, bem('parent-relative'))
        target.removeAttribute('loading-number')
      } else {
        target.setAttribute('loading-number', loadingNumber.toString())
      }
      removeClass(target, bem('parent-hidden'))
    }
    removeElLoadingChild()
    // eslint-disable-next-line no-use-before-define
    loadingInstance.unmount()
  }

  function handleAfterLeave() {
    if (!afterLeaveFlag.value) return
    const target = data.parent
    afterLeaveFlag.value = false
    target.vLoadingAddClassList = undefined
    destroySelf()
  }

  function close() {
    if (options.beforeClose && !options.beforeClose()) return

    afterLeaveFlag.value = true
    clearTimeout(afterLeaveTimer)

    afterLeaveTimer = window.setTimeout(handleAfterLeave, 400)
    data.visible = false

    options.closed?.()
  }

  const elLoadingComponent = {
    name: 'RVLoading',
    setup() {
      return () => {
        const svg = data.spinner

        const loadingSlot = {
          default: () => h('span', data.text),
          icon: undefined
        }

        if (svg) {
          if (svg.name) {
            loadingSlot.icon = () => h(svg)
          } else {
            loadingSlot.icon = () => h('span', { innerHTML: svg })
          }
        }

        const spinner = h(
          Loading,
          {
            size: data.size,
            type: data.type,
            color: data.color,
            vertical: data.vertical,
            textSize: data.textSize,
            textColor: data.textColor
          },
          loadingSlot
        )

        return h(
          Transition,
          {
            name: bem('fade'),
            onAfterLeave: handleAfterLeave
          },
          {
            default: withCtx(() => [
              withDirectives(
                createVNode(
                  'div',
                  {
                    style: {
                      backgroundColor: data.background || ''
                    },
                    class: [
                      bem('mask'),
                      data.customClass,
                      data.fullscreen ? 'is-fullscreen' : ''
                    ]
                  },
                  [
                    h(
                      'div',
                      {
                        class: bem('spinner')
                      },
                      [spinner]
                    )
                  ]
                ),
                [[vShow, data.visible]]
              )
            ])
          }
        )
      }
    }
  }

  const loadingInstance = createApp(elLoadingComponent)
  const vm = loadingInstance.mount(document.createElement('div'))

  return {
    // eslint-disable-next-line no-restricted-syntax
    ...toRefs(data),
    setText,
    removeElLoadingChild,
    close,
    handleAfterLeave,
    vm,
    get $el(): HTMLElement {
      return vm.$el
    }
  }
}

export type LoadingInstance = ReturnType<typeof createLoadingComponent>
