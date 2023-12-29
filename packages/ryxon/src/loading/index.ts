import { withInstall } from '@ryxon/utils'
import _Loading from './Loading'

export const Loading = withInstall(_Loading)
export default Loading
export { loadingProps } from './Loading'
export type { LoadingType, LoadingProps } from './Loading'
export type { LoadingThemeVars } from './types'

export { Loading as serviceLoading } from './service'
export { vLoading as loadingDirective } from './directive'

declare module 'vue' {
  export interface GlobalComponents {
    RLoading: typeof Loading
  }
}
