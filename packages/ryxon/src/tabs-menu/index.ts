import { withInstall } from '../utils'
import _TabsMenu, { TabsMenuProps } from './TabsMenu'

export const TabsMenu = withInstall(_TabsMenu)
export default TabsMenu
export { tabsMenuProps } from './TabsMenu'
export type { TabsMenuProps }
export type { TabsMenuDirection, TabsMenuThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTabsMenu: typeof TabsMenu
  }
}
