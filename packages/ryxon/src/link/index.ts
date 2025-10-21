import { withInstall } from '@ryxon/utils'
import _Link, { LinkProps } from './Link'

export const Link = withInstall(_Link)
export default Link
export { linkProps } from './Link'
export type { LinkProps }
export type { LinkThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RLink: typeof _Link
  }
}
