import { InjectionKey, type SetupContext } from 'vue'
import type { Dayjs } from 'dayjs'

export type DatePickerPcProvide = {
  slots: SetupContext['slots']
  pickerNs: unknown
}

export declare type IDatePickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'

type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'

export interface DateCell {
  column?: number
  customClass?: string
  disabled?: boolean
  end?: boolean
  inRange?: boolean
  row?: number
  selected?: Dayjs
  isCurrent?: boolean
  isSelected?: boolean
  start?: boolean
  text?: number
  timestamp?: number
  date?: Date
  dayjs?: Dayjs
  type?: DateCellType
}

export const ROOT_PICKER_INJECTION_KEY: InjectionKey<DatePickerPcProvide> =
  Symbol('r-calendar')

export type CalendarVars = {
  calendarTextColor?: string
  calendarOffTextColor?: string
  calendarHeaderTextColor?: string
  calendarIconColor?: string
  calendarBorderColor?: string
  calendarInnerBorderColor?: string
  calendarInrangeBgColor?: string
  calendarInrangeHoverBgColor?: string
  calendarActiveColor?: string
  calendarHoverTextColor?: string
}
