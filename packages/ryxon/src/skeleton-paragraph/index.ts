import _SkeletonParagraph from './SkeletonParagraph'
import { withInstall } from '@ryxon/utils'

export const SkeletonParagraph = withInstall(_SkeletonParagraph)
export default SkeletonParagraph

export { skeletonParagraphProps, DEFAULT_ROW_WIDTH } from './SkeletonParagraph'
export type { SkeletonParagraphProps } from './SkeletonParagraph'

declare module 'vue' {
  export interface GlobalComponents {
    RSkeletonParagraph: typeof SkeletonParagraph
  }
}
