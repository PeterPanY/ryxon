import { withInstall } from '../utils'
import _Table from './Table.vue'
import tableProps from './table/defaults'

export const Table = withInstall(_Table)
export default Table
export { tableProps }
export type {
  SummaryMethod,
  TableProps,
  TableRefs,
  ColumnCls,
  ColumnStyle,
  CellCls,
  CellStyle,
  TreeNode,
  RenderRowData,
  Sort,
  Filter,
  TableColumnCtx
} from './table/defaults'

declare module 'vue' {
  export interface GlobalComponents {
    RTable: typeof Table
  }
}
