import { withInstall } from '@ryxon/utils'
import _Tag from './Tag'

export const Tag = withInstall(_Tag)
export default Tag
export { tagProps } from './Tag'
export type { TagProps } from './Tag'
export type { TagType, TagThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTag: typeof Tag
  }
}
