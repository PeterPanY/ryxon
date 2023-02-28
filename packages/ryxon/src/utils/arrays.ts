// @ts-nocheck

export const unique = <T>(arr: T[]) => [...new Set(arr)]

type Many<T> = T | ReadonlyArray<T>
// TODO: rename to `ensureArray`
/** 类似于`_.castArray`，但falsy值返回空数组。. */
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}

// TODO: 删除导入别名
// 避免命名冲突
export { castArray as ensureArray } from 'lodash-unified'