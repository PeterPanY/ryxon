// @ts-nocheck
import { inject } from 'vue'
import { loadingBarApiInjectionKey } from './types'
import type { LoadingBarApiInjection } from './types'

export function useLoadingBar(): LoadingBarApiInjection {
  const loadingBar = inject(loadingBarApiInjectionKey, null)

  if (loadingBar === null) {
    console.error('use-loading-bar', 'No outer <r-loading-bar /> founded.')
  }

  return loadingBar
}
