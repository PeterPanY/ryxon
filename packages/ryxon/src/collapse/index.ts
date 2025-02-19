import { withInstall } from '@ryxon/utils'
import _Collapse from './Collapse'

export const Collapse = withInstall(_Collapse)
export default Collapse

export { collapseProps } from './Collapse'
export type { CollapseProps } from './Collapse'
export type { CollapseInstance, CollapseToggleAllOptions } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RCollapse: typeof Collapse
  }
}
