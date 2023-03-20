// @ts-nocheck
import { get, set } from 'lodash-unified'
import type { Entries } from 'type-fest'
import type { Arrayable } from '.'

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
