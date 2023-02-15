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

export type SelectThemeVars = {
  SelectFontSize?: string
  SelectInputColor?: string
  SelectInputFontSize?: string
  SelectBorderColorHover?: string
  SelectDisabledBorder?: string
  SelectCloseHoverColor?: string
  SelectMultipleInputColor?: string
}
