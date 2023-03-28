// @ts-nocheck
import { nextTick } from 'vue'
import {
  isString,
  addClass,
  getStyle,
  removeClass,
  createNamespace
} from '../utils'
import { isClient } from '@vueuse/core'
import { createLoadingComponent } from './v-loading'
import { useGlobalZIndex } from '../composables/use-global-z-index'
import type { LoadingInstance } from './v-loading'
import type { LoadingOptions, LoadingOptionsResolved } from './types'
import type { CSSProperties } from 'vue'

let fullscreenInstance: LoadingInstance | undefined

const resolveOptions = (options: LoadingOptions): LoadingOptionsResolved => {
  let target: HTMLElement
  if (isString(options.target)) {
    target =
      document.querySelector<HTMLElement>(options.target) ?? document.body
  } else {
    target = options.target || document.body
  }
  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background || '',
    spinner: options.spinner || false,
    text: options.text || '',
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    customClass: options.customClass || '',
    visible: options.visible ?? true,
    target,
    size: options.size || '',
    type: options.type || '',
    color: options.color || '#0094ff',
    vertical: options.vertical || true,
    textSize: options.textSize || '',
    textColor: options.textColor || '#0094ff'
  }
}

const addStyle = async (
  options: LoadingOptionsResolved,
  parent: HTMLElement,
  instance: LoadingInstance
) => {
  const nextZIndex = useGlobalZIndex()

  const maskStyle: CSSProperties = {}
  if (options.fullscreen) {
    instance.originalPosition.value = getStyle(document.body, 'position')
    instance.originalOverflow.value = getStyle(document.body, 'overflow')
    maskStyle.zIndex = nextZIndex
  } else if (options.parent === document.body) {
    instance.originalPosition.value = getStyle(document.body, 'position')
    /**
     * await dom render when visible is true in init,
     * because some component's height maybe 0.
     * e.g. el-table.
     */
    await nextTick()
    for (const property of ['top', 'left']) {
      const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
      maskStyle[property] = `${
        (options.target as HTMLElement).getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] -
        Number.parseInt(getStyle(document.body, `margin-${property}`), 10)
      }px`
    }
    for (const property of ['height', 'width']) {
      maskStyle[property] = `${
        (options.target as HTMLElement).getBoundingClientRect()[property]
      }px`
    }
  } else {
    instance.originalPosition.value = getStyle(parent, 'position')
  }
  for (const [key, value] of Object.entries(maskStyle)) {
    instance.$el.style[key] = value
  }
}

const addClassList = (
  options: LoadingOptions,
  parent: HTMLElement,
  instance: LoadingInstance
) => {
  const [, bem] = createNamespace('v-loading')

  if (
    !['absolute', 'fixed', 'sticky'].includes(instance.originalPosition.value)
  ) {
    addClass(parent, bem('parent-relative'))
  } else {
    removeClass(parent, bem('parent-relative'))
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, bem('parent-hidden'))
  } else {
    removeClass(parent, bem('parent-hidden'))
  }
}

export const Loading = function (
  options: LoadingOptions = {}
): LoadingInstance {
  if (!isClient) return undefined as any

  const resolved = resolveOptions(options)

  if (resolved.fullscreen && fullscreenInstance) {
    return fullscreenInstance
  }

  const instance = createLoadingComponent({
    // eslint-disable-next-line no-restricted-syntax
    ...resolved,
    closed: () => {
      resolved.closed?.()
      if (resolved.fullscreen) fullscreenInstance = undefined
    }
  })

  addStyle(resolved, resolved.parent, instance)
  addClassList(resolved, resolved.parent, instance)

  resolved.parent.vLoadingAddClassList = () =>
    addClassList(resolved, resolved.parent, instance)

  /**
   * add loading-number to parent.
   * because if a fullscreen loading is triggered when somewhere
   * a v-loading.body was triggered before and it's parent is
   * document.body which with a margin , the fullscreen loading's
   * destroySelf function will remove 'el-loading-parent--relative',
   * and then the position of v-loading.body will be error.
   */
  let loadingNumber: string | null =
    resolved.parent.getAttribute('loading-number')
  if (!loadingNumber) {
    loadingNumber = '1'
  } else {
    loadingNumber = `${Number.parseInt(loadingNumber, 10) + 1}`
  }
  resolved.parent.setAttribute('loading-number', loadingNumber)

  resolved.parent.appendChild(instance.$el)

  // 实例渲染后，修改可见以触发转换
  // eslint-disable-next-line no-return-assign
  nextTick(() => (instance.visible.value = resolved.visible))

  if (resolved.fullscreen) {
    fullscreenInstance = instance
  }
  return instance
}
