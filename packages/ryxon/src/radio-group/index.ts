import { withInstall } from '../utils'
import _RadioGroup from './RadioGroup'

export const RadioGroup = withInstall(_RadioGroup)
export default RadioGroup
export { radioGroupProps } from './RadioGroup'
export type { RadioGroupProps } from './RadioGroup'

declare module 'vue' {
  export interface GlobalComponents {
    RRadioGroup: typeof RadioGroup
  }
}
