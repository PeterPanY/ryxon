import { withInstall } from '@ryxon/utils'
import _InputNumber from './InputNumber'

export const InputNumber = withInstall(_InputNumber)
export default InputNumber
export { inputNumberProps } from './InputNumber'
export type { InputNumberTheme, InputNumberProps } from './InputNumber'
export type { InputNumberThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RInputNumber: typeof InputNumber
  }
}
