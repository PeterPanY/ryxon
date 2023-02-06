import { withInstall } from '../utils'
import _Picker, { PickerProps } from './Picker'

export const Picker = withInstall(_Picker)
export default Picker
export { pickerProps } from './Picker'
export type { PickerProps }
export type {
  PickerColumn,
  PickerOption,
  PickerInstance,
  PickerThemeVars,
  PickerInputNames,
  PickerToolbarPosition,
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerConfirmEventParams
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RPicker: typeof Picker
  }
}
