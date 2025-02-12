import { withInstall } from '@ryxon/utils'
import _TabsSsr from './TabsSsr'

export const TabsSsr = withInstall(_TabsSsr)
export default TabsSsr

export { tabsSsrProps } from './TabsSsr'
export type { TabsSsrProps } from './TabsSsr'

declare module 'vue' {
  export interface GlobalComponents {
    RTabsSsr: typeof TabsSsr
  }
}
