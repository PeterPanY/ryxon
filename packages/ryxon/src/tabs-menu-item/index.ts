import { withInstall } from '@ryxon/utils'
import _TabsMenuItem, { TabsMenuItemProps } from './TabsMenuItem'

export const TabsMenuItem = withInstall(_TabsMenuItem)
export default TabsMenuItem
export { tabsMenuItemProps } from './TabsMenuItem'
export type { TabsMenuItemProps }
export type {
  TabsMenuItemOption,
  TabsMenuItemInstance,
  TabsMenuItemThemeVars
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTabsMenuItem: typeof TabsMenuItem
  }
}
