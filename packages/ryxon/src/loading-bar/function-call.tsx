import { h, createApp, type App, type VNode } from 'vue'
import LoadingBar from './LoadingBar'
import { RInjectionExtractor } from './InjectionExtractor'
import { extend, inBrowser } from '@ryxon/utils'
import { useLoadingBar } from './use-loading-bar'
import type { LoadingBarApiInjection, LoadingBarOptions } from './types'

const DEFAULT_OPTIONS = {
  teleport: 'body',
  containerStyle: undefined,
  loadingBarStyle: undefined
} as const

const currentOptions = extend({}, DEFAULT_OPTIONS)

export interface DiscreteApp {
  unmount: () => void
  app: App
  loadingBar?: LoadingBarApiInjection
}

export function createLoadingBar(options?: LoadingBarOptions) {
  const App = (): VNode => {
    return h(LoadingBar, extend({}, currentOptions, options), {
      default: () =>
        h(RInjectionExtractor, {
          onSetup: () => (extractedApi.loadingBar = useLoadingBar())
        })
    })
  }

  let app: App<Element> | null = createApp(App)
  const extractedApi: Omit<DiscreteApp, 'unmount'> = {
    app
  }

  let hostEl: Element | null
  if (inBrowser) {
    hostEl = document.createElement('div')
    document.body.appendChild(hostEl)

    app.mount(hostEl)
  }

  const unmount = (): void => {
    if (app === null || hostEl === null) {
      console.warn(
        'discrete',
        'unmount call no need because discrete app has been unmounted'
      )
      return
    }
    app.unmount()
    hostEl.parentNode?.removeChild(hostEl)
    hostEl = null
    app = null
  }

  // eslint-disable-next-line no-restricted-syntax
  return { unmount, ...extractedApi }
}
