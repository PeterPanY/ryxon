import { extend } from '@ryxon/utils'
import { datePickerSharedProps, selectionModeWithDefault } from './shared'

import type { ExtractPropTypes } from 'vue'

export const basicMonthTableProps = extend({}, datePickerSharedProps, {
  selectionMode: selectionModeWithDefault('month')
})

export type BasicMonthTableProps = ExtractPropTypes<typeof basicMonthTableProps>
