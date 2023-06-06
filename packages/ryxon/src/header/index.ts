import { withInstall } from '../utils'
import _Header from './Header'

export const Header = withInstall(_Header)
export default Header
export { headerProps } from './Header'
export type { HeaderProps } from './Header'
export type { HeaderThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RHeader: typeof Header
  }
}
