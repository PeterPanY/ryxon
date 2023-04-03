import { withInstall } from '../utils'
import _Dropdown from './Dropdown'

export const Dropdown = withInstall(_Dropdown)
export default Dropdown

export { dropdownProps } from './Dropdown'
export type { DropdownProps } from './Dropdown'
export type { DropdownThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RDropdown: typeof Dropdown
  }
}
