// @ts-nocheck
import { isObject } from './basic'
import type { Entries } from 'type-fest'
import type { Arrayable } from '.'

// 处理 path， path有三种形式：'a[0].b.c'、'a.0.b.c' 和 ['a','0','b','c']，需要统一处理成数组，便于后续使用
function toArrayPath(path: any) {
  if (Array.isArray(path)) {
    return path
  }
  return path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
}

function isValidKey(key: any) {
  // 是否是数字的key
  const isNumberKey = !isNaN(Number(key))
  // 是否为无效的数字key，1 有效的，01 无效的
  return isNumberKey && Number(key) + '' === key
}

/**
 * @param {object} obj
 * @param {string | string[]} path
 * @param {any} value
 */
export function set(source: any, path: any, value: any) {
  if (typeof source !== 'object') {
    return value
  }

  toArrayPath(path).reduce((cur, pre, index, arr) => {
    if (index === arr.length - 1) {
      // 若遍历结束直接赋值
      cur[pre] = value
      return null
    } else if (pre in cur) {
      // 若存在对应路径，则返回找到的对象，进行下一次遍历
      return cur[pre]
    } else {
      // 若不存在对应路径，则创建对应对象，若下一路径是数字，新对象赋值为空数组，否则赋值为空对象
      return (cur[pre] = isValidKey(arr[index + 1]) ? [] : {})
    }
  }, source)
}

export function get(object: any, path: string): any {
  const keys = path.split('.')
  let result = object

  keys.forEach((key) => {
    result = isObject(result) ? result[key] ?? '' : ''
  })

  return result
}

// Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值
export const keysOf = <T>(arr: T) => Object.keys(arr) as Array<keyof T>
// Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组
export const entriesOf = <T>(arr: T) => Object.entries(arr) as Entries<T>

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => ({
  get value() {
    return get(obj, path, defaultValue)
  },
  set value(val: any) {
    set(obj, path, val)
  }
})
