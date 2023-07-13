import type { ButtonHTMLAttributes } from 'vue'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export type ButtonSize = 'large' | 'normal' | 'small' | 'mini'

export type ButtonNativeType = NonNullable<ButtonHTMLAttributes['type']>

export type ButtonIconPosition = 'left' | 'right'

export type ButtonThemeVars = {
  buttonFontWeight?: string
  buttonBorderColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonDisabledTextColor?: string
  buttonDisabledBgColor?: string
  buttonDisabledBorderColor?: string
  buttonDivideBorderColor?: string
  buttonHoverTextColor?: string
  buttonHoverBgColor?: string
  buttonHoverBorderColor?: string
  buttonActiveTextColor?: string
  buttonActiveBorderColor?: string
  buttonActiveBgColor?: string
  buttonOutlineColor?: string
  buttonHoverLinkTextColor?: string
  buttonActiveColor?: string
  buttonLoadingIconSize?: string
}
