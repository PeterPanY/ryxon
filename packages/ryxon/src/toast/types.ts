import type { ComponentPublicInstance, TeleportProps } from 'vue'
import type { LoadingType } from '../loading'
import type { Numeric } from '../utils'

export type ToastType =
  | 'text'
  | 'loading'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'html'
export type ToastPosition = 'top' | 'middle' | 'bottom'
export type ToastWordBreak = 'break-all' | 'break-word' | 'normal'

export type ToastOptions = {
  icon?: unknown
  type?: ToastType
  mask?: boolean
  message?: Numeric
  onClose?: () => void
  onOpened?: () => void
  overlay?: boolean
  duration?: number
  teleport?: TeleportProps['to']
  iconSize?: Numeric
  position?: ToastPosition
  className?: unknown
  transition?: string
  iconPrefix?: string
  wordBreak?: ToastWordBreak
  loadingType?: LoadingType
  forbidClick?: boolean
  closeOnClick?: boolean
  overlayClass?: unknown
  overlayStyle?: Record<string, any>
  closeOnClickOverlay?: boolean
  offset?: number
  id?: number
}

export type ToastWrapperInstance = ComponentPublicInstance<
  { message: Numeric },
  {
    id: string
    close: () => void
    /**
     * @private
     */
    open: (props: Record<string, any>) => void
  }
>

export type ToastThemeVars = {
  toastMaxWidth?: string
  toastFontSize?: string
  toastTextColor?: string
  toastLoadingIconColor?: string
  toastLineHeight?: number | string
  toastRadius?: string
  toastBackground?: string
  toastIconSize?: string
  toastTextMinWidth?: string
  toastTextPadding?: string
  toastDefaultPadding?: string
  toastDefaultWidth?: string
  toastDefaultMinHeight?: string
  toastPositionTopDistance?: string
  toastPositionBottomDistance?: string
}
