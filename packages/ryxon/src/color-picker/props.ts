import { isNil } from 'lodash-unified'
import { isString, buildProps, useSizeProp, definePropType } from '@ryxon/utils'
import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'
import type ColorPicker from './color-picker.vue'

export const colorPickerProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: String,
  /**
   * @description ColorPicker id
   */
  id: String,
  /**
   * @description whether to display the alpha slider
   */
  showAlpha: Boolean,
  /**
   * @description color format of v-model
   */
  colorFormat: String,
  /**
   * @description whether to disable the ColorPicker
   */
  disabled: Boolean,
  /**
   * @description size of ColorPicker
   */
  size: useSizeProp,
  /**
   * @description custom class name for ColorPicker's dropdown
   */
  popperClass: { type: String, default: '' },
  /**
   * @description ColorPicker tabindex
   */
  tabindex: { type: [String, Number], default: 0 },
  /**
   * @description predefined color options
   */
  predefine: { type: definePropType<string[]>(Array) }
} as const)

export const colorPickerEmits = {
  'update:modelValue': (val: string | null) => isString(val) || isNil(val),
  change: (val: string | null) => isString(val) || isNil(val),
  activeChange: (val: string | null) => isString(val) || isNil(val)
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerInstance = InstanceType<typeof ColorPicker>

export interface ColorPickerContext {
  currentColor: ComputedRef<string>
}

export const colorPickerContextKey: InjectionKey<ColorPickerContext> = Symbol(
  'colorPickerContextKey'
)

export type ColorPickerThemeVars = {
  colorPickerWidth?: string
  colorPickerHeight?: string
  colorPickerAlphaBgA?: string
  colorPickerAlphaBgB?: string
}
