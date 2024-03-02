import { isDef, isObject } from './basic'

type ObjectIndex = Record<string, unknown>

const { hasOwnProperty } = Object.prototype

function assignKey(to: ObjectIndex, from: ObjectIndex, key: string) {
  const val = from[key]

  if (!isDef(val)) {
    return
  }

  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val
  } else {
    // eslint-disable-next-line no-use-before-define
    to[key] = deepAssign(Object(to[key]), val)
  }
}

// 单个合并
export function deepAssign(to: ObjectIndex, from: ObjectIndex): ObjectIndex {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key)
  })

  return to
}

// 批量合并
export function deepAssignMore(...args: ObjectIndex[]) {
  if (args.length < 2) {
    console.error('数据合并方法最少需要两个参数。')
    return false
  }

  const object = args[0]
  const source = args.slice(1)

  if (!isObject(object)) {
    console.error('第一个产数错误，需要复杂数据类型。')
    return false
  }

  source.forEach((item) => {
    // 判断是不是对象
    if (isObject(item)) {
      deepAssign(object, item)
    } else {
      // 不是对象的情况下
    }
  })

  return object
}
