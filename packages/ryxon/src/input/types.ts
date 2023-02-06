/* eslint-disable no-use-before-define */
import type { ComputedRef, ComponentPublicInstance } from 'vue'
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

export type FiledRuleFormatter = (value: any, rule: InputRule) => string

export type InputRule = {
  pattern?: RegExp
  trigger?: InputValidateTrigger | InputValidateTrigger[]
  message?: InputRuleMessage
  required?: boolean
  validator?: InputRuleValidator
  formatter?: FiledRuleFormatter
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

export type InputExpose = {
  blur: () => void | undefined
  focus: () => void | undefined
  validate: (
    rules?: InputRule[] | undefined
  ) => Promise<void | InputValidateError>
  resetValidation: () => void
  getValidationStatus: () => InputValidationStatus
  /** @private */
  formValue: ComputedRef<unknown>
}

export type InputInstance = ComponentPublicInstance<InputProps, InputExpose>

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
