import { withInstall } from '@ryxon/utils'
import _Badge from './Badge'

export const Badge = withInstall(_Badge)
export default Badge
export { badgeProps } from './Badge'
export type { BadgeProps, BadgeType, BadgePosition } from './Badge'
export type { BadgeThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RBadge: typeof Badge
  }
}
