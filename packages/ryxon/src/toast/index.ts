import { withInstall } from '../utils'
import _Toast from './Toast'

export const Toast = withInstall(_Toast)
export default Toast
export { toastProps } from './Toast'
export {
  showToast,
  notAllowMultipleToast,
  setToastDefaultOptions,
  resetToastDefaultOptions
} from './function-call'

export type { ToastProps } from './Toast'
export type {
  ToastType,
  ToastOptions,
  ToastPosition,
  ToastThemeVars,
  ToastWordBreak
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RToast: typeof Toast
  }
}
