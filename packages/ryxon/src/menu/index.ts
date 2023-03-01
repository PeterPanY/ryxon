import { withInstall } from '../utils'
import _Menu from './Menu'

export const Menu = withInstall(_Menu)
export default Menu
export { menuProps } from './Menu'
export type { MenuProps } from './Menu'

declare module 'vue' {
  export interface GlobalComponents {
    RMenu: typeof Menu
  }
}
