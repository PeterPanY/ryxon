import type { Mutable } from '../utils'
import type { AppContext } from 'vue'
import type MessageConstructor from './Message'
import type { MessageProps } from './Message'

export const messageTypes = ['success', 'info', 'warning', 'danger']

export type messageType = typeof messageTypes[number]

export interface MessageConfigContext {
  max?: number
}

export type MessageInstance = InstanceType<typeof MessageConstructor>

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>

export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message']

export interface MessageHandler {
  props: Mutable<MessageProps>
  close: () => void
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAllMessage(type?: messageType): void
}
export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}

export type MessageThemeVars = {
  messageBgColor?: string
  messageBorderColor?: string
  messagePadding?: string
  messageCloseSize?: string
  messageCloseIconColor?: string
  messageCloseHoverColor?: string
}
