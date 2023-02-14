export type SelectTheme = 'light' | 'dark'

export type SelectPlacement =
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

export type SelectAction = {
  text: string
  icon?: string
  color?: string
  disabled?: boolean
  className?: string
  [key: PropertyKey]: any
}

export type SelectThemeVars = {
  SelectArrowSize?: string
  SelectRadius?: string
  SelectActionWidth?: string
  SelectActionHeight?: string
  SelectActionFontSize?: string
  SelectActionLineHeight?: number | string
  SelectActionIconSize?: string
  SelectLightTextColor?: string
  SelectLightBackground?: string
  SelectLightActionDisabledTextColor?: string
  SelectDarkTextColor?: string
  SelectDarkBackground?: string
  SelectDarkActionDisabledTextColor?: string
}
