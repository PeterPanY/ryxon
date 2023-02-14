export type TooltipTheme = 'light' | 'dark'
export type TooltipTrigger = 'click' | 'focus' | 'hover' | 'contextmenu'

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export type TooltipThemeVars = {
  tooltipArrowSize?: string
  tooltipRadius?: string
  tooltipLightTextColor?: string
  tooltipLightBackground?: string
  tooltipDarkTextColor?: string
  tooltipDarkBackground?: string
}
