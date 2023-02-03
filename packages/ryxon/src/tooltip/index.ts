import { withInstall } from '../utils'
import _Tooltip from './Tooltip.vue'

export const Tooltip = withInstall(_Tooltip)
export default Tooltip

declare module 'vue' {
  export interface GlobalComponents {
    RTooltip: typeof Tooltip
  }
}
