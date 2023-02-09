export type TooltipTheme = 'light' | 'dark'
export type TooltipTrigger =
  | 'manual'
  | 'click'
  | 'focus'
  | 'hover'
  | 'contextmenu'

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

export type TooltipAction = {
  text: string
  icon?: string
  color?: string
  disabled?: boolean
  className?: string
  [key: PropertyKey]: any
}

export type TooltipThemeVars = {
  tooltipArrowSize?: string
  tooltipRadius?: string
  tooltipActionWidth?: string
  tooltipActionHeight?: string
  tooltipActionFontSize?: string
  tooltipActionLineHeight?: number | string
  tooltipActionIconSize?: string
  tooltipLightTextColor?: string
  tooltipLightBackground?: string
  tooltipLightActionDisabledTextColor?: string
  tooltipDarkTextColor?: string
  tooltipDarkBackground?: string
  tooltipDarkActionDisabledTextColor?: string
}
