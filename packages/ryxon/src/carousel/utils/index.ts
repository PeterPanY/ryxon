import {
  isVNode,
  Comment,
  Fragment,
  type Slot,
  type VNodeArrayChildren
} from 'vue'
import type { Size } from '../types'

export * from './duplicatedLogic'

export function calculateSize(element: HTMLElement, innerOnly?: boolean): Size {
  let { offsetWidth: width, offsetHeight: height } = element
  if (innerOnly) {
    const style = getComputedStyle(element)
    width =
      width -
      parseFloat(style.getPropertyValue('padding-left')) -
      parseFloat(style.getPropertyValue('padding-right'))
    height =
      height -
      parseFloat(style.getPropertyValue('padding-top')) -
      parseFloat(style.getPropertyValue('padding-bottom'))
  }
  return { width, height }
}

export function clampValue(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export function resolveSpeed(value?: string | number): number {
  if (value === undefined) return 0
  if (typeof value === 'number') return value
  const timeRE = /^((\d+)?\.?\d+?)(ms|s)?$/
  const match = value.match(timeRE)
  if (match) {
    const [, number, , unit = 'ms'] = match
    return Number(number) * (unit === 'ms' ? 1 : 1000)
  }
  return 0
}

export function getPreciseEventTarget(event: MouseEvent | TouchEvent) {
  return event.composedPath()[0] || null
}

function ensureValidVNode(
  vnodes: VNodeArrayChildren
): VNodeArrayChildren | null {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true
    }
    if (child.type === Comment) {
      return false
    }
    if (
      child.type === Fragment &&
      !ensureValidVNode(child.children as VNodeArrayChildren)
    ) {
      return false
    }
    return true
  })
    ? vnodes
    : null
}

export function resolveSlotWithProps<T>(
  slot: Slot | undefined,
  props: T,
  fallback: (props: T) => VNodeArrayChildren
): VNodeArrayChildren {
  return (slot && ensureValidVNode(slot(props))) || fallback(props)
}

function indexMap(count: number): number[]
function indexMap<T>(count: number, createValue: (index: number) => T): T[]
function indexMap(
  count: number,
  createValue?: (index: number) => unknown
): unknown[] {
  const ret = []
  if (!createValue) {
    for (let i = 0; i < count; ++i) {
      ret.push(i)
    }
    return ret
  }
  for (let i = 0; i < count; ++i) {
    ret.push(createValue(i))
  }
  return ret
}

export { indexMap }
