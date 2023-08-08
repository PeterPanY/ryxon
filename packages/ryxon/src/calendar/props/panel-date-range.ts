import { extend } from '../../utils'
import { panelRangeSharedProps, panelSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'

export const panelDateRangeProps = extend(
  {},
  panelSharedProps,
  panelRangeSharedProps
)

export type PanelDateRangeProps = ExtractPropTypes<typeof panelDateRangeProps>
