import { withInstall } from '../utils'
import _Select from './Select.vue'

export const Select = withInstall(_Select)
export default Select

export { selectProps } from './select-props'
export { selectKey } from './token'
export type { SelectContext } from './token'
export type { SelectProps } from './select-props'
export type { SelectTheme, SelectThemeVars, SelectPlacement } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RSelect: typeof Select
  }
}
