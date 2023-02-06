import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import {
  isObject,
  isPromise,
  isFunction,
  getRootScrollTop,
  setRootScrollTop
} from '../utils'
import type { InputRule, InputType, InputAutosizeConfig } from './types'

export function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) {
    return !value.length
  }
  if (value === 0) {
    return false
  }
  return !value
}

export function runSyncRule(value: unknown, rule: InputRule) {
  if (isEmptyValue(value)) {
    if (rule.required) {
      return false
    }
    if (rule.validateEmpty === false) {
      return true
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false
  }
  return true
}

export function runRuleValidator(value: unknown, rule: InputRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator!(value, rule)

    if (isPromise(returnVal)) {
      returnVal.then(resolve)
      return
    }

    resolve(returnVal)
  })
}

export function getRuleMessage(value: unknown, rule: InputRule) {
  const { message } = rule

  if (isFunction(message)) {
    return message(value, rule)
  }
  return message || ''
}

export function startComposing({ target }: Event) {
  target!.composing = true
}

export function endComposing({ target }: Event) {
  if (target!.composing) {
    target!.composing = false
    target!.dispatchEvent(new Event('input'))
  }
}

export function resizeTextarea(
  input: HTMLInputElement,
  autosize: true | InputAutosizeConfig
) {
  const scrollTop = getRootScrollTop()
  input.style.height = 'auto'

  let height = input.scrollHeight
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize
    if (maxHeight !== undefined) {
      height = Math.min(height, maxHeight)
    }
    if (minHeight !== undefined) {
      height = Math.max(height, minHeight)
    }
  }

  if (height) {
    input.style.height = `${height}px`
    // https://github.com/PeterPanY/ryxon/issues/9178
    setRootScrollTop(scrollTop)
  }
}

export function mapInputType(type: InputType): {
  type: InputHTMLAttributes['type']
  inputmode?: HTMLAttributes['inputmode']
} {
  // type="number" is weird in iOS, and can't prevent dot in Android
  // so use inputmode to set keyboard in modern browsers
  if (type === 'number') {
    return {
      type: 'text',
      inputmode: 'decimal'
    }
  }

  if (type === 'digit') {
    return {
      type: 'tel',
      inputmode: 'numeric'
    }
  }

  return { type }
}

// get correct length of emoji
// https://github.com/PeterPanY/ryxon/issues/10032
export function getStringLength(str: string) {
  return [...str].length
}

// cut string with emoji
export function cutString(str: string, maxlength: number) {
  return [...str].slice(0, maxlength).join('')
}
