import { isEqual } from '@ryxon/utils'
import { get } from './lodash'
import type { TableRow } from '../types'

export * from './lodash'

export function defaultComparator<T>(a: T, z: T): boolean {
  return isEqual(a, z)
}

export function defaultSort(a: any, b: any, direction: 'asc' | 'desc') {
  if (a === b) {
    return 0
  }

  if (direction === 'asc') {
    return a < b ? -1 : 1
  } else {
    return a > b ? -1 : 1
  }
}

export function getStringifiedSet(arr: TableRow[]) {
  return new Set(arr.map((item) => JSON.stringify(item)))
}

export function accessor<T extends Record<string, any>>(key: string) {
  return (obj: T) => get(obj, key)
}
