import { withInstall } from '../utils'
import _Input, { InputProps } from './Input'

export const Input = withInstall(_Input)
export default Input
export { inputProps } from './Input'
export type { InputProps }
export type {
  InputType,
  InputRule,
  InputInstance,
  InputTextAlign,
  InputThemeVars,
  InputRuleMessage,
  InputClearTrigger,
  InputFormatTrigger,
  InputRuleValidator,
  InputRuleFormatter,
  InputValidateError,
  InputAutosizeConfig,
  InputValidateTrigger,
  InputValidationStatus
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RInput: typeof Input
  }
}
