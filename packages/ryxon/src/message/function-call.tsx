// @ts-nocheck
import { render, isVNode, createVNode } from 'vue'
import { isClient, isNumber } from '@vueuse/core'
import { instances } from './instance'
import { extend, isElement, isString, isFunction } from '../utils'

import MessageConstructor from './Message'
import type { AppContext } from 'vue'
import type { MessageContext } from './instance'
import type {
  Message,
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageParams,
  MessageParamsNormalized,
  messageType,
  MessageConfigContext
} from './types'

let seed = 1

const messageDefaults = {
  show: false,
  customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  offset: 16,
  zIndex: undefined,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never)
}

export const messageConfig: MessageConfigContext = {}

const normalizeOptions = (params?: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params

  const normalized = extend({}, messageDefaults, options)

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)

    // 应回退到默认值并发出警告
    if (!isElement(appendTo)) {
      appendTo = document.body
    }

    normalized.appendTo = appendTo
  }

  return normalized as MessageParamsNormalized
}

const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

const createMessage = (
  // eslint-disable-next-line no-restricted-syntax
  { appendTo, ...options }: MessageParamsNormalized,
  context?: AppContext | null
): MessageContext => {
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = extend({}, options, {
    id,
    onClose: () => {
      userOnClose?.()
      // eslint-disable-next-line no-use-before-define
      closeMessage(instance)
    },
    // 清除消息元素，防止内存泄漏
    onDestroy: () => {
      // 由于元素已销毁，因此GC也应该收集VNode
      // 我们不想造成任何内存泄漏，因为我们已经返回vm作为对用户的引用, 以便我们手动将其设置为false。
      render(null, container)
    },
    'onUpdate:show': (val: boolean) => {
      // eslint-disable-next-line no-use-before-define
      instance.props.show = val
    }
  })
  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message
        }
      : null
  )
  // eslint-disable-next-line no-use-before-define
  vnode.appContext = context || message._context

  render(vnode, container)
  // 当调用close函数时，实例将删除此项。所以我们不需要担心。
  appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: MessageHandler = {
    props: (vnode.component as any).props,
    // 与其直接调用onClose函数，不如设置该值，以便我们可以拥有完整的生命周期
    // 对于out组件，这样就不会跳过所有关闭步骤。
    close: () => {
      vm.exposed!.updateShow(false)
    }
  }

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props
  }

  instance.props.show = true

  return instance
}

const message: MessageFn &
  Partial<Message> & { _context: AppContext | null } = (
  // eslint-disable-next-line default-param-last
  options = {},
  context
) => {
  if (!isClient) return { close: () => undefined }

  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => undefined }
  }

  const normalized = normalizeOptions(options)

  if (normalized.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === normalized.message
    )
    if (instance) {
      instance.props.repeatNum += 1
      instance.props.type = normalized.type
      return instance.handler
    }
  }

  const instance = createMessage(normalized, context)

  instances.push(instance)
  return instance.handler
}

export const closeAllMessage = (type?: messageType) => {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close()
    }
  }
}

message.closeAllMessage = closeAllMessage
message._context = null

// 消息
export const showMessage = message as Message

// 成功消息
export const showSuccessMessage = (
  // eslint-disable-next-line default-param-last
  options = {},
  appContext: AppContext | null
) => {
  const normalized = normalizeOptions(options)
  return message(extend({}, normalized, { type: 'success' }), appContext)
}

// 通知消息
export const showInfoMessage = (
  // eslint-disable-next-line default-param-last
  options = {},
  appContext: AppContext | null
) => {
  const normalized = normalizeOptions(options)
  return message(extend({}, normalized, { type: 'info' }), appContext)
}

// 警告消息
export const showWarningMessage = (
  // eslint-disable-next-line default-param-last
  options = {},
  appContext: AppContext | null
) => {
  const normalized = normalizeOptions(options)
  return message(extend({}, normalized, { type: 'warning' }), appContext)
}

// 错误消息
export const showDangerMessage = (
  // eslint-disable-next-line default-param-last
  options = {},
  appContext: AppContext | null
) => {
  const normalized = normalizeOptions(options)
  return message(extend({}, normalized, { type: 'danger' }), appContext)
}
