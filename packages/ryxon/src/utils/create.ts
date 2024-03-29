import { get, camelize, isFunction } from '@ryxon/utils'
import locale from '../locale'

export function createTranslate(name: string) {
  const prefix = camelize(name) + '.'

  return (path: string, ...args: unknown[]) => {
    const messages = locale.messages()
    const message = get(messages, prefix + path) || get(messages, path)

    return isFunction(message) ? message(...args) : message
  }
}

export type Translate = ReturnType<typeof createTranslate>

export type Mod = string | { [key: string]: any }
export type Mods = Mod | Mod[]

function genBem(name: string, mods?: Mods): string {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  if (Array.isArray(mods)) {
    return (mods as Mod[]).reduce<string>(
      (ret, item) => ret + genBem(name, item),
      ''
    )
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name, key) : ''),
    ''
  )
}

export function isBem() {
  return (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `is-${name}` : ''
  }
}

export function cssVarBlock(name: string, object: Record<string, string>) {
  const styles: Record<string, string> = {}
  for (const key in object) {
    if (object[key]) {
      styles[`--r-${name}-${key}`] = object[key]
    }
  }
  return styles
}

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return `${el}${genBem(el, mods)}`
  }
}

export type BEM = ReturnType<typeof createBEM>

// 创建命名空间
export function createNamespace(name: string) {
  const prefixedName = `r-${name}`
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName),
    isBem()
  ] as const
}
