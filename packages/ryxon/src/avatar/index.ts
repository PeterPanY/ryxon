import { withInstall } from '@ryxon/utils'
import _Avatar from './Avatar'

export const Avatar = withInstall(_Avatar)
export default Avatar
export { avatarProps } from './Avatar'
export type { AvatarProps } from './Avatar'
export type { AvatarThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RAvatar: typeof Avatar
  }
}
