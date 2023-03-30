import { withInstall } from '../utils'
import _TreeSelectPc from './TreeSelectPc'

export const TreeSelectPc = withInstall(_TreeSelectPc)
export default TreeSelectPc

export { treeSelectPcProps } from './TreeSelectPc'
export type { TreeSelectPcProps } from './TreeSelectPc'
export type { TreeSelectPcThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTreeSelectPc: typeof TreeSelectPc
  }
}
