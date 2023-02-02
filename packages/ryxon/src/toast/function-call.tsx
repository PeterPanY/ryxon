import { ref, watch, getCurrentInstance } from 'vue'
import { extend, isObject, inBrowser } from '../utils'
import { mountComponent, usePopupState } from '../utils/mount-component'
import RToast from './Toast'
import type { ToastType, ToastOptions, ToastWrapperInstance } from './types'

import { queue } from './instance'

const defaultOptions: ToastOptions = {
  icon: '',
  type: 'text',
  message: '',
  className: '',
  overlay: false,
  onClose: undefined,
  onOpened: undefined,
  duration: 3000,
  teleport: 'body',
  iconSize: undefined,
  iconPrefix: undefined,
  position: 'top',
  transition: 'r-fade',
  forbidClick: false,
  loadingType: undefined,
  overlayClass: '',
  overlayStyle: undefined,
  closeOnClick: false,
  closeOnClickOverlay: false,
  offset: 20
}

let allowMultiple = true
let currentOptions = extend({}, defaultOptions)

// default options of specific type
const defaultOptionsMap = new Map<string, ToastOptions>()

function parseOptions(message: string | ToastOptions): ToastOptions {
  if (isObject(message)) {
    return message
  }
  return { message }
}

let seed = 1

// 创建实例
function createInstance() {
  const id = `toast_${seed++}`

  const { instance, unmount } = mountComponent({
    setup() {
      const message = ref('')
      const { open, state, close, toggle } = usePopupState()

      const onClosed = () => {
        if (allowMultiple) {
          const idx = queue.findIndex((item) => item === instance)

          if (idx !== -1) queue.splice(idx, 1)

          unmount()
        }
      }

      const render = () => {
        const attrs: Record<string, unknown> = {
          onClosed,
          'onUpdate:show': toggle
        }

        return <RToast id={id} {...state} {...attrs} />
      }

      // 支持消息的动态修改
      watch(message, (val) => {
        state.message = val
      })

      // 重写渲染函数
      ;(getCurrentInstance() as any).render = render

      return { id, open, close, message }
    }
  })

  return instance as ToastWrapperInstance
}

// 获取实例
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance()
    queue.push(instance)
  }

  return queue[queue.length - 1]
}

// 展示提示
export function showToast(options: string | ToastOptions = {}) {
  if (!inBrowser) {
    return {} as ToastWrapperInstance
  }

  const toast = getInstance()
  const parsedOptions = parseOptions(options)

  toast.open(
    extend(
      {},
      currentOptions,
      defaultOptionsMap.get(parsedOptions.type || currentOptions.type!),
      parsedOptions
    )
  )

  return toast
}

// 暴露修改默认配置
export function setToastDefaultOptions(options: ToastOptions): void
export function setToastDefaultOptions(
  type: ToastType,
  options: ToastOptions
): void
export function setToastDefaultOptions(
  type: ToastType | ToastOptions,
  options?: ToastOptions
) {
  if (typeof type === 'string') {
    defaultOptionsMap.set(type, options!)
  } else {
    extend(currentOptions, type)
  }
}

// 暴露重置默认配置
export const resetToastDefaultOptions = (type?: ToastType) => {
  if (typeof type === 'string') {
    defaultOptionsMap.delete(type)
  } else {
    currentOptions = extend({}, defaultOptions)
    defaultOptionsMap.clear()
  }
}

// 暴露设置多个提示的方法
export const notAllowMultipleToast = (value = false) => {
  allowMultiple = value
}
