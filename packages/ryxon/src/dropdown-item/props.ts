import { iconPropType } from '../utils'
import type { ExtractPropTypes } from 'vue'

export const dropdownItemProps = {
  command: { type: [Object, String, Number], default: () => ({}) },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: { type: iconPropType }
}

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
