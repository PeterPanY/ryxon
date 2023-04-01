import type { VNode } from 'vue'
import type { NotifyProps } from './Notify'

export type NotifyTypes = 'info' | 'success' | 'danger' | 'warning' | ''

export interface NotifyHandle {
  props: NotifyProps
  close: () => void
}

export type NotifyOptions = Omit<NotifyProps, 'id'> & {
  appendTo?: HTMLElement | string
}

export type NotifyOptionsTyped = Omit<NotifyOptions, 'type'>

export type NotifyParams = Partial<NotifyOptions> | string | VNode
export type NotifyParamsTyped = Partial<NotifyOptionsTyped> | string | VNode

export type NotifyFn = ((options?: NotifyParams) => NotifyHandle) & {
  closeNotifyAll: () => void
}

export type NotifyTypedFn = (options?: NotifyParamsTyped) => NotifyHandle

export interface Notify extends NotifyFn {
  success: NotifyTypedFn
  warning: NotifyTypedFn
  error: NotifyTypedFn
  info: NotifyTypedFn
}

export interface NotifyQueueItem {
  vm: VNode
}

export type NotifyQueue = NotifyQueueItem[]

export type NotifyThemeVars = {
  notifyWidth?: string
  notifyPadding?: string
  notifyRadius?: string
  notifyShadow?: string
  notifyBorderColor?: string
  notifyIconSize?: string
  notifyCloseFontSize?: string
  notifyGroupMarginLeft?: string
  notifyGroupMarginRight?: string
  notifyContentFontSize?: string
  notifyContentColor?: string
  notifyTitleFontSize?: string
  notifyTitleColor?: string
  notifyCloseColor?: string
  notifyCloseHoverColor?: string
}
