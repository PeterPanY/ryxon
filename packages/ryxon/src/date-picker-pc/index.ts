import { withInstall } from '../utils'
import _DatePickerPc, { DatePickerPcProps } from './DatePicker'

export const DatePickerPc = withInstall(_DatePickerPc)
export default DatePickerPc

export { datePickerPcProps } from './DatePicker'
export type { DatePickerPcProps }
export type { DatePickerPcVars } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    RDatePickerPc: typeof DatePickerPc
  }
}
