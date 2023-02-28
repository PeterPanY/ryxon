import { withInstall } from '../utils'
import _ButtonGroup from './ButtonGroup'

export const ButtonGroup = withInstall(_ButtonGroup)
export default ButtonGroup

export { buttonGroupProps } from './ButtonGroup'
export type { ButtonGroupProps } from './ButtonGroup'

declare module 'vue' {
  export interface GlobalComponents {
    RButtonGroup: typeof ButtonGroup
  }
}
