import { withInstall } from '../utils'
import _LoadingBar from './LoadingBar'

export const LoadingBar = withInstall(_LoadingBar)
export default LoadingBar

export { useLoadingBar } from './use-loading-bar'
export { createLoadingBar } from './function-call'

export { loadingBarProps } from './LoadingBar'
export type { LoadingBarProps } from './LoadingBar'
export type { LoadingBarInst, LoadingBarThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RLoadingBar: typeof LoadingBar
  }
}
