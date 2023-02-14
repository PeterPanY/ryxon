import { withInstall } from '../utils'
import _Option from '../select/Option'

export const Option = withInstall(_Option)
export default Option

export { optionProps } from '../select/Option'
export type { OptionProps } from '../select/Option'

declare module 'vue' {
  export interface GlobalComponents {
    ROption: typeof Option
  }
}
