import { withInstall } from '@ryxon/utils'
import _Divider from './Divider'

export const Divider = withInstall(_Divider)
export default Divider
export { dividerProps } from './Divider'
export type { DividerProps, DividerContentPosition } from './Divider'
export type { DividerThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RDivider: typeof Divider
  }
}
