// @ts-nocheck
// TODO: remove import alias
// avoid naming conflicts
export {
  get,
  set,
  union,
  merge,
  isNil,
  isEqual,
  flatMap,
  fromPairs,
  pick as lodashPick,
  flatten as loadshFlatten,
  castArray as ensureArray
} from 'lodash-unified'

export const unique = <T>(arr: T[]) => [...new Set(arr)]

type Many<T> = T | ReadonlyArray<T>
// TODO: rename to `ensureArray`
/** 类似于`_.castArray`，但falsy值返回空数组。. */
export const newCastArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}
