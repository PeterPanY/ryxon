import { withInstall } from '../utils'
import _DatePickerPc, { DatePickerPcProps } from './DatePicker'

export const DatePickerPc = withInstall(_DatePickerPc)
export default DatePickerPc

export { datePickerPcProps } from './DatePicker'
export type { DatePickerPcProps }

declare module 'vue' {
  export interface GlobalComponents {
    RDatePickerPc: typeof DatePickerPc
  }
}
