import type { SetupContext } from 'vue'

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

export type DatePickerPcVars = {
  datepickerTextColor?: string
  datepickerOffTextColor?: string
  datepickerHeaderTextColor?: string
  datepickerIconColor?: string
  datepickerBorderColor?: string
  datepickerInnerBorderColor?: string
  datepickerInrangeBgColor?: string
  datepickerInrangeHoverBgColor?: string
  datepickerActiveColor?: string
  datepickerHoverTextColor?: string
}
