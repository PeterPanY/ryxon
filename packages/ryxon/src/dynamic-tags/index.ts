import { withInstall } from '@ryxon/utils'
import _DynamicTags from './DynamicTags'

export const DynamicTags = withInstall(_DynamicTags)
export default DynamicTags

export { dynamicTagsProps } from './DynamicTags'
export type { DynamicTagsProps } from './DynamicTags'
export type { DynamicTagsExpose, DynamicTagsThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RDynamicTags: typeof DynamicTags
  }
}
