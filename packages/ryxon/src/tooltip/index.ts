import { withInstall } from '@ryxon/utils'
import _Tooltip from './Tooltip'

export const Tooltip = withInstall(_Tooltip)
export default Tooltip

export { tooltipProps, TOOLTIP_INJECTION_KEY } from './Tooltip'
export type { TooltipProps } from './Tooltip'
export type {
  TooltipTheme,
  TooltipTrigger,
  TooltipThemeVars,
  TooltipPlacement
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTooltip: typeof Tooltip
  }
}
