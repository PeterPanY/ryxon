import { withInstall } from '@ryxon/utils'
import _ColorPicker from './ColorPicker.vue'

export const ColorPicker = withInstall(_ColorPicker)
export default ColorPicker

export { colorPickerProps } from './props'
export type {
  ColorPickerProps,
  ColorPickerInstance,
  ColorPickerThemeVars
} from './props'

declare module 'vue' {
  export interface GlobalComponents {
    RColorPicker: typeof ColorPicker
  }
}
