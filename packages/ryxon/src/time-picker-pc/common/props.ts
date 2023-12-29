import {
  extend,
  definePropType,
  ComponentSize,
  isValidComponentSize
} from '@ryxon/utils'
import { CircleClose } from '@ryxon/icons'
import { disabledTimeListsProps } from '../props/shared'

import type { Component, PropType, ExtractPropTypes, TeleportProps } from 'vue'
import type { Dayjs } from 'dayjs'

export type SingleOrRange<T> = T | [T, T]
export type DateModelType = number | string | Date
export type ModelValueType = SingleOrRange<DateModelType>
export type DayOrDays = SingleOrRange<Dayjs>
export type DateOrDates = SingleOrRange<Date>
export type UserInput = SingleOrRange<string | null>
export type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[]
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[]
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[]

export const timePickerDefaultProps = extend({}, disabledTimeListsProps, {
  id: { type: definePropType<SingleOrRange<string>>([Array, String]) },
  name: {
    type: definePropType<SingleOrRange<string>>([Array, String]),
    default: ''
  },
  popperClass: { type: String, default: '' },
  format: String,
  valueFormat: String,
  type: { type: String, default: '' },
  clearable: { type: Boolean, default: true },
  clearIcon: {
    type: definePropType<string | Component>([String, Object]),
    default: CircleClose
  },
  editable: { type: Boolean, default: true },
  prefixIcon: {
    type: definePropType<string | Component>([String, Object]),
    default: ''
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
    validator: isValidComponentSize
  },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  modelValue: {
    type: definePropType<ModelValueType>([Date, Array, String, Number]),
    default: ''
  },
  rangeSeparator: { type: String, default: '-' },
  startPlaceholder: String,
  endPlaceholder: String,
  defaultValue: { type: definePropType<SingleOrRange<Date>>([Date, Array]) },
  defaultTime: { type: definePropType<SingleOrRange<Date>>([Date, Array]) },
  isRange: { type: Boolean, default: false },
  disabledDate: { type: Function },
  cellClassName: { type: Function },
  shortcuts: { type: Array, default: () => [] },
  arrowControl: { type: Boolean, default: false },
  label: { type: String, default: undefined },
  tabindex: {
    type: definePropType<string | number>([String, Number]),
    default: 0
  },
  validateEvent: { type: Boolean, default: true },
  unlinkPanels: Boolean,
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  }
})

export type TimePickerDefaultProps = ExtractPropTypes<
  typeof timePickerDefaultProps
>

export interface PickerOptions {
  isValidValue: (date: DayOrDays) => boolean
  handleKeydownInput: (event: KeyboardEvent) => void
  parseUserInput: (value: UserInput) => DayOrDays
  formatToString: (value: DayOrDays) => UserInput
  getRangeAvailableTime: (date: DayOrDays) => DayOrDays
  getDefaultValue: () => DayOrDays
  panelReady: boolean
  handleClear: () => void
  handleFocusPicker?: () => void
}
