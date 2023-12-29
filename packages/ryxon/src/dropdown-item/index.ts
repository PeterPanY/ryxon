import { withInstall } from '@ryxon/utils'
import _DropdownItem from './DropdownItem'

export const DropdownItem = withInstall(_DropdownItem)
export default DropdownItem

export { dropdownItemProps } from './props'
export type { DropdownItemProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    RDropdownItem: typeof DropdownItem
  }
}
