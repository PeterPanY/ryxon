import { extend, definePropType } from '@ryxon/utils'
import { timePanelSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const panelTimePickerProps = extend({}, timePanelSharedProps, {
  datetimeRole: String,
  parsedValue: {
    type: definePropType<Dayjs>(Object)
  }
})

export type PanelTimePickerProps = ExtractPropTypes<typeof panelTimePickerProps>
