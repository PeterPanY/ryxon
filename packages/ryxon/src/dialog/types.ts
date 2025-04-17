import type { CSSProperties, TeleportProps, Component, VNode } from 'vue'
import type { Interceptor, Numeric } from '@ryxon/utils'

export type DialogTheme = 'default' | 'space-button'
export type DialogPositon = 'center' | 'top'
export type DialogAction = 'confirm' | 'cancel'
export type DialogMessage = string | VNode | (() => VNode)
export type DialogMessageAlign = 'left' | 'center' | 'right' | 'justify'
export type DialogType = '' | 'success' | 'warning' | 'info' | 'danger'

export type DialogOptions = {
  title?: string
  width?: Numeric
  theme?: DialogTheme
  position?: DialogPositon
  message?: DialogMessage
  type?: DialogType
  icon?: string | Component
  overlay?: boolean
  teleport?: TeleportProps['to']
  className?: unknown
  allowHtml?: boolean
  lockScroll?: boolean
  transition?: string
  beforeClose?: Interceptor
  messageAlign?: DialogMessageAlign
  overlayClass?: string
  overlayStyle?: CSSProperties
  closeOnPopstate?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: string
  cancelButtonColor?: string
  cancelButtonDisabled?: boolean
  confirmButtonText?: string
  confirmButtonColor?: string
  confirmButtonDisabled?: boolean
  closeOnClickOverlay?: boolean
  destroyOnClose?: boolean
  keyboardEnabled?: boolean
  showClose?: boolean
}

export type DialogThemeVars = {
  dialogWidth?: string
  dialogSmallScreenWidth?: string
  dialogFontSize?: string
  dialogTransition?: string
  dialogRadius?: string
  dialogBackground?: string
  dialogHeaderFontWeight?: string
  dialogHeaderLineHeight?: number | string
  dialogHeaderPaddingTop?: string
  dialogHeaderIsolatedPadding?: string
  dialogHeaderBackground?: string
  dialogMessagePadding?: string
  dialogMessageFontSize?: string
  dialogMessageLineHeight?: number | string
  dialogMessageMaxHeight?: string
  dialogHasTitleMessageTextColor?: string
  dialogHasTitleMessagePaddingTop?: string
  dialogButtonHeight?: string
  dialogButtonSpace?: string
  dialogButtonRadius?: string
  dialogSpaceButtonHeight?: string
  dialogConfirmButtonTextColor?: string
  dialogPaddingPrimary?: string
  dialogMarginTop?: string
  dialogCloseFontSize?: string
}
