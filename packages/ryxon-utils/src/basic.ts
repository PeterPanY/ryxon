import type { ComponentPublicInstance } from 'vue'

// 空函数
export function noop() {}
// 对象合并
export const extend = Object.assign
// 判断是不是浏览器
export const inBrowser = typeof window !== 'undefined'

export type Numeric = number | string

// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>

const { hasOwnProperty } = Object.prototype

export const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => {
  return window.TouchEvent && e instanceof window.TouchEvent
}

// 是不是自己本身所拥有的属性
export const hasOwn = (val: object, key: string | symbol) =>
  hasOwnProperty.call(val, key)

// 判断是不是数组
export const { isArray } = Array

/**
 * 判断是不是类对象。如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
 * @param val 要检查的值
 * @returns 如果 value 为一个类对象，那么返回 true，否则返回 false。
 */
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isNumber = (val: any): val is number => typeof val === 'number'

// 判断是不是为空
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

// 判断是不是元素
export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

// 判断是不是字符串
export const isString = (val: any): val is string => typeof val === 'string'

// 判断是不是undefined
export const isUndefined = (val: any): val is undefined => val === undefined

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isDef = <T>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch)

export const isDate = (val: unknown): val is Date =>
  Object.prototype.toString.call(val) === '[object Date]' &&
  !Number.isNaN((val as Date).getTime())

export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '')
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  )
}

export const isNumeric = (val: Numeric): val is string =>
  typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)

export const isIOS = (): boolean =>
  inBrowser
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    : false

export const isKorean = (text: string) =>
  /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text)

// 对象转字符串
export const objectToString = Object.prototype.toString

// 对象转字符串
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

// 对象转字符串 截取后几位
// extract "RawType" from strings like "[object RawType]"
export const toRawType = (value: unknown): string =>
  toTypeString(value).slice(8, -1)

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type RequiredParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never

export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce(
    (ret, key) => {
      if (!ignoreUndefined || obj[key] !== undefined) {
        ret[key] = obj[key]
      }
      return ret
    },
    {} as Writeable<Pick<T, U>>
  )
}

export const isSameValue = (newValue: unknown, oldValue: unknown) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue)

export const toArray = <T>(item: T | T[]): T[] =>
  Array.isArray(item) ? item : [item]
