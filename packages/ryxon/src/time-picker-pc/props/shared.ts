import { definePropType } from '../../utils'
import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[]
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[]
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[]

export const disabledTimeListsProps = {
  disabledHours: {
    type: definePropType<GetDisabledHours>(Function)
  },
  disabledMinutes: {
    type: definePropType<GetDisabledMinutes>(Function)
  },
  disabledSeconds: {
    type: definePropType<GetDisabledSeconds>(Function)
  }
}

export type DisabledTimeListsProps = ExtractPropTypes<
  typeof disabledTimeListsProps
>

export const timePanelSharedProps = {
  visible: Boolean,
  actualVisible: {
    type: Boolean,
    default: undefined
  },
  format: {
    type: String,
    default: ''
  }
}

export type TimePanelSharedProps = ExtractPropTypes<typeof timePanelSharedProps>
