import { definePropType } from '@ryxon/utils'

import type { ExtractPropTypes } from 'vue'
import type { DateCell } from '../type'

export const basicCellProps = {
  cell: {
    type: definePropType<DateCell>(Object)
  }
} as const

export type BasicCellProps = ExtractPropTypes<typeof basicCellProps>
