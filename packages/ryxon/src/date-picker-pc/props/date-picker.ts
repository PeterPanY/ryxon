import { definePropType } from '../../utils'

import type { ExtractPropTypes } from 'vue'
import type { IDatePickerType } from '../type'

export const datePickerProps = {
  type: {
    type: definePropType<IDatePickerType>(String),
    default: 'date'
  }
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
