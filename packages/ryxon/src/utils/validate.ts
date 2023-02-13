import { inBrowser, type Numeric } from './basic'

const { hasOwnProperty } = Object.prototype
// 是不是自己本身所拥有的属性
export const hasOwn = (val: object, key: string | symbol) =>
  hasOwnProperty.call(val, key)

// 判断是不是数组
export const { isArray } = Array

// 判断是不是字符串
export const isString = (val: any): val is string => typeof val === 'string'

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isDef = <T>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

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
