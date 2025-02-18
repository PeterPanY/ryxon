import { withInstall } from '@ryxon/utils'
import _TableSsr from './TableSsr'

export const TableSsr = withInstall(_TableSsr)
export default TableSsr

export { tableSsrProps } from './TableSsr'
export type { TableSsrProps } from './TableSsr'

declare module 'vue' {
  export interface GlobalComponents {
    RTableSsr: typeof TableSsr
  }
}
