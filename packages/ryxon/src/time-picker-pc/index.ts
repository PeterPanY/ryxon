import { withInstall } from '../utils'
import _TimePickerPc, { TimePickerPcProps } from './TimePicker'

export const TimePickerPc = withInstall(_TimePickerPc)
export default TimePickerPc

export { timePickerPcProps } from './TimePicker'
export * from './utils'
export type { TimePickerPcProps }
export type { TimePickerPcThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTimePickerPc: typeof TimePickerPc
  }
}
