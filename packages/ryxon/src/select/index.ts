import { withInstall } from '../utils'
import _Select from './Select'

export const Select = withInstall(_Select)
export default Select

export { selectProps } from './Select'
export type { SelectProps } from './Select'
export type {
  SelectTheme,
  SelectAction,
  SelectThemeVars,
  SelectPlacement
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RSelect: typeof Select
  }
}
