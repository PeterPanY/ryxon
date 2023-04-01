// @ts-nocheck
import { createVNode, render, isVNode } from 'vue'
import { isClient } from '@vueuse/core'
import NotifyConstructor, { NotifyProps } from './Notify'
import { extend, isString, isElement } from '../utils'
import type { AppContext, VNode } from 'vue'
import type { Notify, NotifyFn, NotifyQueue, NotifyOptions } from './types'

// This should be a queue but considering there were `non-autoclosable` notifys.
const notifys: Record<NotifyOptions['position'], NotifyQueue> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': []
}

// 每个通知之间的间隔大小
const GAP_SIZE = 16
let seed = 1

const notify: NotifyFn & Partial<Notify> & { _context: AppContext | null } =
  function (options = {}, context: AppContext | null = null) {
    if (!isClient) return { close: () => undefined }

    if (typeof options === 'string' || isVNode(options)) {
      options = { message: options }
    }

    const position = options.position || 'top-right'

    let verticalOffset = options.offset || 0
    notifys[position].forEach(({ vm }) => {
      verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE
    })
    verticalOffset += GAP_SIZE

    const id = `notify_${seed++}`
    const userOnClose = options.onClose

    const container = document.createElement('div')

    const props: Partial<NotifyProps> = extend({}, options, {
      offset: verticalOffset,
      id,
      onClose: () => {
        // eslint-disable-next-line no-use-before-define
        close(id, position, userOnClose)
      },
      // 清除消息元素，防止内存泄漏
      onDestroy: () => {
        // 由于元素已销毁，因此GC也应该收集VNode
        // 我们不想造成任何内存泄漏，因为我们已经返回vm作为对用户的引用, 以便我们手动将其设置为false。
        render(null, container)
      },
      'onUpdate:show': (val: boolean) => {
        console.log(val)

        // eslint-disable-next-line no-use-before-define
        vm.component!.props.show = val
      }
    })

    let appendTo: HTMLElement | null = document.body
    if (isElement(options.appendTo)) {
      // eslint-disable-next-line prefer-destructuring
      appendTo = options.appendTo
    } else if (isString(options.appendTo)) {
      appendTo = document.querySelector(options.appendTo)
    }

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      console.warn(
        'RNotify',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      )
      appendTo = document.body
    }

    const vm = createVNode(
      NotifyConstructor,
      props,
      isVNode(props.message)
        ? {
            default: () => props.message
          }
        : null
    )
    vm.appContext = context ?? notify._context

    // instances will remove this item when close function gets called. So we do not need to worry about it.
    render(vm, container)
    notifys[position].push({ vm })
    appendTo.appendChild(container.firstElementChild!)

    vm.component!.props.show = true

    return {
      props: (vm.component as any).props,
      // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
      // for out component, so that all closing steps will not be skipped.
      close: () => {
        vm.component!.exposed!.updateShow(false)
      }
    }
  }

/**
 * This function gets called when user click `x` button or press `esc` or the time reached its limitation.
 * Emitted by transition@before-leave event so that we can fetch the current notify.offsetHeight, if this was called
 * by @after-leave the DOM element will be removed from the page thus we can no longer fetch the offsetHeight.
 * @param {String} id notify id to be closed
 * @param {Position} position the positioning strategy
 * @param {Function} userOnClose the callback called when close passed by user
 */
export function close(
  id: string,
  position: NotifyOptions['position'],
  userOnClose?: (vm: VNode) => void
): void {
  // maybe we can store the index when inserting the vm to notify list.
  const orientedNotifys = notifys[position]
  const idx = orientedNotifys.findIndex(
    ({ vm }) => vm.component?.props.id === id
  )
  if (idx === -1) return
  const { vm } = orientedNotifys[idx]
  if (!vm) return
  // 在从DOM中删除通知之前调用用户的on-close函数。
  userOnClose?.(vm)

  // 注意这里被 @before-leave, 我们能够获取此属性的原因.
  const removedHeight = vm.el!.offsetHeight
  const verticalPos = position.split('-')[0]
  orientedNotifys.splice(idx, 1)
  const len = orientedNotifys.length
  if (len < 1) return
  // starting from the removing item.
  for (let i = idx; i < len; i++) {
    // 新位置等于当前偏移顶部减去移除的高度加上16px（每个项目之间的间隙大小）
    const { el, component } = orientedNotifys[i].vm
    const pos =
      Number.parseInt(el!.style[verticalPos], 10) - removedHeight - GAP_SIZE
    component!.props.offset = pos
  }
}

export function closeNotifyAll(): void {
  // 循环立即关闭所有。
  for (const orientedNotifys of Object.values(notifys)) {
    orientedNotifys.forEach(({ vm }) => {
      // 与前面的关闭方法相同，我们希望确保生命周期得到正确处理。
      vm.component!.exposed!.updateShow(false)
    })
  }
}

notify.closeNotifyAll = closeNotifyAll
notify._context = null

export const showNotify = notify as Notify

// eslint-disable-next-line default-param-last
function typeConstructor(options = {}, type: any) {
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    }
  }
  return notify(extend({}, options, { type }))
}

export const showSuccessNotify = (options = {}) =>
  typeConstructor(options, 'success')

export const showInfoNotify = (options = {}) => typeConstructor(options, 'info')

export const showWarningNotify = (options = {}) =>
  typeConstructor(options, 'warning')

export const showDangerNotify = (options = {}) =>
  typeConstructor(options, 'danger')
