import { withInstall } from '@ryxon/utils'
import _DropdownMenu from './DropdownMenu'

export const DropdownMenu = withInstall(_DropdownMenu)
export default DropdownMenu

export { dropdownMenuProps } from './DropdownMenu'
export type { DropdownMenuProps } from './DropdownMenu'

declare module 'vue' {
  export interface GlobalComponents {
    RDropdownMenu: typeof DropdownMenu
  }
}
