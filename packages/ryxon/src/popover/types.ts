export type PopoverTheme = 'light' | 'dark'
export type PopoverActionsDirection = 'horizontal' | 'vertical'
export type PopoverTrigger =
  | 'manual'
  | 'click'
  | 'focus'
  | 'hover'
  | 'contextmenu'

export type PopoverPlacement =
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

export type PopoverAction = {
  text: string
  icon?: string
  color?: string
  disabled?: boolean
  className?: string
  [key: PropertyKey]: any
}

export type PopoverThemeVars = {
  popoverActionWidth?: string
  popoverActionHeight?: string
  popoverActionFontSize?: string
  popoverActionIconSize?: string
  popoverHorizontalActionHeight?: string
  popoverHorizontalActionIconSize?: string
  popoverLightActionDisabledTextColor?: string
  popoverDarkActionDisabledTextColor?: string
}
