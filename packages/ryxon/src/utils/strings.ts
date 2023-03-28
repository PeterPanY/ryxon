const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    // eslint-disable-next-line no-return-assign
    return hit || (cache[str] = fn(str))
  }) as T
}

// 首字母转大写
export const toCapitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
)

const hyphenateRE = /\B([A-Z])/g

export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()
)

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

// NOTE: improve capitalize types. Restore previous code after the [PR](https://github.com/vuejs/core/pull/6212) merge
export const capitalize = <T extends string>(str: T) =>
  toCapitalize(str) as Capitalize<T>
