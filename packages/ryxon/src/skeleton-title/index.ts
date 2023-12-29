import _SkeletonTitle from './SkeletonTitle'
import { withInstall } from '@ryxon/utils'

export const SkeletonTitle = withInstall(_SkeletonTitle)
export default SkeletonTitle

export { skeletonTitleProps } from './SkeletonTitle'
export type { SkeletonTitleProps } from './SkeletonTitle'

declare module 'vue' {
  export interface GlobalComponents {
    RSkeletonTitle: typeof SkeletonTitle
  }
}
