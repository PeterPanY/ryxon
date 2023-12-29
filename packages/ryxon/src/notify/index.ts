import { withInstall } from '@ryxon/utils'
import _Notify from './Notify'

export const Notify = withInstall(_Notify)
export default Notify

export { notifyProps } from './Notify'

export type { NotifyProps } from './Notify'
export type { NotifyThemeVars } from './types'

export {
  showNotify,
  showSuccessNotify,
  showInfoNotify,
  showWarningNotify,
  showDangerNotify,
  closeNotifyAll
} from './function-call'

declare module 'vue' {
  export interface GlobalComponents {
    RNotify: typeof Notify
  }
}
