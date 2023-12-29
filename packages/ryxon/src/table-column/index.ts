import { withInstall } from '@ryxon/utils'
import _TableColumn from './TableColumn'

export const TableColumn = withInstall(_TableColumn)
export default TableColumn
export { tableColumnProps } from './TableColumn'
export type { TableColumnProps } from './TableColumn'

declare module 'vue' {
  export interface GlobalComponents {
    RTableColumn: typeof TableColumn
  }
}
