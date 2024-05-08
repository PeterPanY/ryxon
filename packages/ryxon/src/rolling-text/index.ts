import { withInstall } from '@ryxon/utils'
import _RollingText from './RollingText'

export const RollingText = withInstall(_RollingText)
export default RollingText
export { rollingTextProps } from './RollingText'
export type { RollingTextProps } from './RollingText'
export type {
  RollingTextExpose,
  RollingTextDirection,
  RollingTextInstance,
  RollingTextStopOrder,
  RollingTextThemeVars
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RRollingText: typeof _RollingText
  }
}
