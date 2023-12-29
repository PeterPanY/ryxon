import { withInstall } from '@ryxon/utils'
import _Table from './Table.vue'
import tableProps from './table/defaults'

export const Table = withInstall(_Table)
export default Table
export { tableProps }
export type {
  TableSummaryMethod,
  TableProps,
  TableRefs,
  TableColumnCls,
  TableColumnStyle,
  TableCellCls,
  TableCellStyle,
  TableTreeNode,
  TableRenderRowData,
  TableSort,
  TableFilter,
  TableColumnCtx,
  TableThemeVars
} from './table/defaults'

declare module 'vue' {
  export interface GlobalComponents {
    RTable: typeof Table
  }
}
