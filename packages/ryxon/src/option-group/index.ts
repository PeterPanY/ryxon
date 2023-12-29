import { withInstall } from '@ryxon/utils'
import _OptionGroup from '../select/Option-group'

export const OptionGroup = withInstall(_OptionGroup)
export default OptionGroup

export { optionGroupProps } from '../select/Option-group'
export type { OptionGroupProps } from '../select/Option-group'

declare module 'vue' {
  export interface GlobalComponents {
    ROptionGroup: typeof OptionGroup
  }
}
