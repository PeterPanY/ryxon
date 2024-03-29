import { withInstall } from '@ryxon/utils'
import _CheckboxGroup from './CheckboxGroup'

export const CheckboxGroup = withInstall(_CheckboxGroup)
export default CheckboxGroup
export { checkboxGroupProps } from './CheckboxGroup'
export type { CheckboxGroupProps } from './CheckboxGroup'
export type {
  CheckboxGroupInstance,
  CheckboxGroupToggleAllOptions
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RCheckboxGroup: typeof CheckboxGroup
  }
}
