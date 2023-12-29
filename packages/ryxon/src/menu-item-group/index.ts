import { withInstall } from '@ryxon/utils'
import _MenuItemGroup from './MenuItemGroup'

export const MenuItemGroup = withInstall(_MenuItemGroup)
export default MenuItemGroup

export { menuItemGroupProps } from './MenuItemGroup'
export type { MenuItemGroupProps } from './MenuItemGroup'

declare module 'vue' {
  export interface GlobalComponents {
    RMenuItemGroup: typeof MenuItemGroup
  }
}
