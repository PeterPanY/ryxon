import { withInstall } from '@ryxon/utils'
import _Switch from './Switch'

export const Switch = withInstall(_Switch)
export default Switch
export { switchProps } from './Switch'
export type { SwitchProps } from './Switch'
export type { SwitchThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RSwitch: typeof Switch
  }
}
