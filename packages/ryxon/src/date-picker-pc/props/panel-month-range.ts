import { extend } from '../../utils'
import { panelRangeSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'

export const panelMonthRangeProps = extend({}, panelRangeSharedProps)

export const panelMonthRangeEmits = ['pick', 'set-picker-option']

export type PanelMonthRangeProps = ExtractPropTypes<typeof panelMonthRangeProps>
