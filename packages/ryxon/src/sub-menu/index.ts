import { withInstall } from '../utils'
import _SubMenu from './SubMenu'

export const SubMenu = withInstall(_SubMenu)
export default SubMenu

export { subMenuProps } from './SubMenu'
export type { SubMenuProps } from './SubMenu'

declare module 'vue' {
  export interface GlobalComponents {
    RSubMenu: typeof SubMenu
  }
}
