/* eslint-disable no-use-before-define */
import type { ComponentPublicInstance } from 'vue'
import type { InputProps } from './Input'

export type InputType =
  | 'tel'
  | 'url'
  | 'date'
  | 'file'
  | 'text'
  | 'time'
  | 'week'
  | 'color'
  | 'digit'
  | 'email'
  | 'image'
  | 'month'
  | 'radio'
  | 'range'
  | 'reset'
  | 'button'
  | 'hidden'
  | 'number'
  | 'search'
  | 'submit'
  | 'checkbox'
  | 'password'
  | 'textarea'
  | 'datetime-local'

export type InputTextAlign = 'left' | 'center' | 'right' | 'top'

export type InputClearTrigger = 'always' | 'focus'

export type InputFormatTrigger = 'onBlur' | 'onChange'

export type InputValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit'

export type InputAutosizeConfig = {
  maxHeight?: number
  minHeight?: number
}

export type InputValidateError = {
  name?: string
  message: string
}

export type InputRuleMessage =
  | string
  | ((value: any, rule: InputRule) => string)

export type InputRuleValidator = (
  value: any,
  rule: InputRule
) => boolean | string | Promise<boolean | string>

export type InputRuleFormatter = (value: any, rule: InputRule) => string

export type InputRule = {
  pattern?: RegExp
  trigger?: InputValidateTrigger | InputValidateTrigger[]
  message?: InputRuleMessage
  required?: boolean
  validator?: InputRuleValidator
  formatter?: InputRuleFormatter
  validateEmpty?: boolean
}

export type InputValidationStatus = 'passed' | 'failed' | 'unvalidated'

// Shared props of Input and Form
export type InputFormSharedProps =
  | 'colon'
  | 'disabled'
  | 'readonly'
  | 'labelWidth'
  | 'labelAlign'
  | 'inputAlign'
  | 'errorMessageAlign'

export type InputInstance = ComponentPublicInstance<InputProps>

declare global {
  interface EventTarget {
    composing?: boolean
  }
}

export type InputThemeVars = {
  InputLabelWidth?: string
  InputLabelColor?: string
  InputLabelMarginRight?: string
  InputInputTextColor?: string
  InputInputErrorTextColor?: string
  InputInputDisabledTextColor?: string
  InputPlaceholderTextColor?: string
  InputIconSize?: string
  InputClearIconSize?: string
  InputClearIconColor?: string
  InputRightIconColor?: string
  InputErrorMessageColor?: string
  InputErrorMessageFontSize?: string
  InputTextAreaMinHeight?: string
  InputWordLimitColor?: string
  InputWordLimitFontSize?: string
  InputWordLimitLineHeight?: number | string
  InputDisabledTextColor?: string
  InputRequiredMarkColor?: string
}
