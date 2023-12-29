import { withInstall } from '@ryxon/utils'
import _Scrollbar, { ScrollbarProps } from './Scrollbar'

export const Scrollbar = withInstall(_Scrollbar)
export default Scrollbar

export { scrollbarProps } from './Scrollbar'
export type { ScrollbarProps }
export type { ScrollbarThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RScrollbar: typeof Scrollbar
  }
}
