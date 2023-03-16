const cacheStringFunction = (fn: { (str: any): any; (arg0: string): any }) => {
  const cache = Object.create(null)
  return (str: string) => {
    const hit = cache[str]
    // eslint-disable-next-line no-return-assign
    return hit || (cache[str] = fn(str))
  }
}

// 首字母转大写
export const toCapitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
)

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

// NOTE: improve capitalize types. Restore previous code after the [PR](https://github.com/vuejs/core/pull/6212) merge
export const capitalize = <T extends string>(str: T) =>
  toCapitalize(str) as Capitalize<T>
