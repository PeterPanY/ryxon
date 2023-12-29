import { extend, definePropType } from '@ryxon/utils'
import { panelSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const panelDatePickProps = extend({}, panelSharedProps, {
  parsedValue: { type: definePropType<Dayjs | Dayjs[]>([Object, Array]) },
  visible: { type: Boolean },
  format: { type: String, default: '' },
  isTooltip: { type: Boolean }
} as const)

export type PanelDatePickProps = ExtractPropTypes<typeof panelDatePickProps>
