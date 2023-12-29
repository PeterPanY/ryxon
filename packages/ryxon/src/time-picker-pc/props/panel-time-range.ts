import { extend, definePropType } from '@ryxon/utils'
import { timePanelSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const panelTimeRangeProps = extend({}, timePanelSharedProps, {
  parsedValue: {
    type: definePropType<[Dayjs, Dayjs]>(Array)
  }
})

export type PanelTimeRangeProps = ExtractPropTypes<typeof panelTimeRangeProps>
