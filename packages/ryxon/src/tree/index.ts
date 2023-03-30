import { withInstall } from '../utils'
import _Tree from './Tree'
import Node from './model/node'

export const Tree = withInstall(_Tree)
export default Tree

export { treeProps } from './Tree'
export type { TreeProps } from './Tree'
export type { Node as TreeNode }
export type { DragEvents as TreeDragEvents } from './model/useDragNode'
export type {
  TreeKey,
  TreeData,
  TreeNodeData,
  TreeFilterValue,
  TreeNodeDropType,
  TreeAllowDropType,
  TreeThemeVars
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTree: typeof Tree
  }
}
