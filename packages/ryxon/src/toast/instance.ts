import { shallowReactive } from 'vue'

import type { ToastWrapperInstance } from './types'

export const queue: ToastWrapperInstance[] = shallowReactive([])

// 获取当前元素及上一个元素
export const getInstance = (id: string) => {
  const idx = queue.findIndex((instance) => instance.id === id)

  const current = queue[idx]
  let prev: ToastWrapperInstance | undefined
  if (idx > 0) {
    prev = queue[idx - 1]
  }
  return { current, prev }
}

// 获取元素底部位置
export const getLastOffset = (id: string) => {
  const { prev } = getInstance(id)

  if (!prev) return { bottom: 0, top: 0 }

  const ele = document.getElementById(prev.id)
  const bottom = ele ? ele.getBoundingClientRect().bottom : 0
  const top = ele ? ele.getBoundingClientRect().top : 0

  return { bottom, top }
}
