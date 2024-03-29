import { withInstall } from '@ryxon/utils'
import _Empty from './Empty'

export const Empty = withInstall(_Empty)
export default Empty
export { emptyProps } from './Empty'
export type { EmptyProps } from './Empty'
export type { EmptyThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    REmpty: typeof Empty
  }
}
