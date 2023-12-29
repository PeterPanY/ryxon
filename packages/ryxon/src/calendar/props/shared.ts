import { definePropType, isArray } from '@ryxon/utils'
import { datePickTypes } from '../../constants'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'
import type { DatePickType } from '../../constants'

const selectionModes = ['date', 'dates', 'year', 'month', 'week', 'range']

export type RangeState = {
  endDate: null | Dayjs
  selecting: boolean
}

export const datePickerSharedProps = {
  disabledDate: {
    type: definePropType<(date: Date) => boolean>(Function)
  },
  date: {
    type: definePropType<Dayjs>(Object),
    required: true
  },
  minDate: {
    type: definePropType<Dayjs | null>(Object)
  },
  maxDate: {
    type: definePropType<Dayjs | null>(Object)
  },
  parsedValue: {
    type: definePropType<Dayjs | Dayjs[]>([Object, Array])
  },
  rangeState: {
    type: definePropType<RangeState>(Object),
    default: () => ({
      endDate: null,
      selecting: false
    })
  }
} as const

export const panelSharedProps = {
  type: {
    type: definePropType<DatePickType>(String),
    required: true,
    values: datePickTypes
  }
} as const

export const panelRangeSharedProps = {
  unlinkPanels: Boolean,
  parsedValue: {
    type: definePropType<Dayjs[]>(Array)
  },
  isSingle: { type: Boolean, default: false }
} as const

export const selectionModeWithDefault = (
  mode: (typeof selectionModes)[number]
) => ({
  type: String,
  values: selectionModes,
  default: mode
})

export const rangePickerSharedEmits = {
  pick: (range: [Dayjs, Dayjs]) => isArray(range)
}

export type RangePickerSharedEmits = typeof rangePickerSharedEmits
export type PanelRangeSharedProps = ExtractPropTypes<
  typeof panelRangeSharedProps
>
