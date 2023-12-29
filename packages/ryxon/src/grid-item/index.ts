import { withInstall } from '@ryxon/utils'
import _GridItem from './GridItem'

export const GridItem = withInstall(_GridItem)
export default GridItem
export { gridItemProps } from './GridItem'
export type { GridItemProps } from './GridItem'
export type { GridItemThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RGridItem: typeof GridItem
  }
}
