import { withInstall } from '@ryxon/utils'
import _CollapseSsr from './CollapseSsr'

export const CollapseSsr = withInstall(_CollapseSsr)
export default CollapseSsr

export { collapseSsrProps } from './CollapseSsr'
export type { CollapseSsrProps } from './CollapseSsr'
export type { CollapseSsrItem } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RCollapseSsr: typeof CollapseSsr
  }
}
