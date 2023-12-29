import _Skeleton from './Skeleton'
import { withInstall } from '@ryxon/utils'

export const Skeleton = withInstall(_Skeleton)

export default Skeleton

// Skeleton
export { skeletonProps } from './Skeleton'
export type { SkeletonProps } from './Skeleton'

export type { SkeletonThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RSkeleton: typeof Skeleton
  }
}
