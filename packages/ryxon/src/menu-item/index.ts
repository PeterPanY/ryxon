import { withInstall } from '@ryxon/utils'
import _MenuItem from './MenuItem'

export const MenuItem = withInstall(_MenuItem)
export default MenuItem
export { menuItemProps } from './MenuItem'
export type { MenuItemProps } from './MenuItem'

declare module 'vue' {
  export interface GlobalComponents {
    RMenuItem: typeof MenuItem
  }
}
