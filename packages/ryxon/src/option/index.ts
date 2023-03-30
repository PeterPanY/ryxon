import { withInstall } from '../utils'
import _Option from '../select/Option.vue'

export const Option = withInstall(_Option)
export default Option

export { optionProps } from '../select/option'
export type { OptionProps } from '../select/option'

declare module 'vue' {
  export interface GlobalComponents {
    ROption: typeof Option
  }
}
