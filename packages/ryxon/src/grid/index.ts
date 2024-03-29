import { withInstall } from '@ryxon/utils'
import _Grid from './Grid'

export const Grid = withInstall(_Grid)
export default Grid
export { gridProps } from './Grid'
export type { GridProps, GridDirection } from './Grid'

declare module 'vue' {
  export interface GlobalComponents {
    RGrid: typeof Grid
  }
}
