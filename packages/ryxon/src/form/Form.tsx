import { defineComponent, type PropType, type ExtractPropTypes } from 'vue'

// Utils
import {
  FORM_KEY,
  truthProp,
  numericProp,
  preventDefault,
  createNamespace
} from '../utils'

// Composables
import { useChildren } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Types
import type {
  InputTextAlign,
  InputValidateError,
  InputValidateTrigger,
  InputValidationStatus
} from '../input/types'
import type { FormExpose } from './types'

const [, bem] = createNamespace('form')

export const formProps = {
  colon: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  required: [Boolean, String] as PropType<boolean | 'auto'>,
  showError: Boolean,
  labelWidth: numericProp,
  labelAlign: String as PropType<InputTextAlign>,
  inputAlign: String as PropType<InputTextAlign>,
  scrollToError: Boolean,
  validateFirst: Boolean,
  submitOnEnter: truthProp,
  showErrorMessage: truthProp,
  errorMessageAlign: String as PropType<InputTextAlign>,
  validateTrigger: {
    type: [String, Array] as PropType<
      InputValidateTrigger | InputValidateTrigger[]
    >,
    default: 'onBlur'
  }
}

export type FormProps = ExtractPropTypes<typeof formProps>

export default defineComponent({
  name: 'RForm',
  props: formProps,
  emits: ['submit', 'failed'],
  setup(props, { emit, slots }) {
    const { children, linkChildren } = useChildren(FORM_KEY)

    const getInputsByNames = (names?: string[]) => {
      if (names) {
        return children.filter((input) => names.includes(input.name))
      }
      return children
    }

    const validateSeq = (names?: string[]) =>
      new Promise<void>((resolve, reject) => {
        const errors: InputValidateError[] = []
        const inputs = getInputsByNames(names)

        inputs
          .reduce(
            (promise, input) =>
              promise.then(() => {
                if (!errors.length) {
                  return input.validate().then((error?: InputValidateError) => {
                    if (error) {
                      errors.push(error)
                    }
                  })
                }
              }),
            Promise.resolve()
          )
          .then(() => {
            if (errors.length) {
              reject(errors)
            } else {
              resolve()
            }
          })
      })

    const validateAll = (names?: string[]) =>
      new Promise<void>((resolve, reject) => {
        const inputs = getInputsByNames(names)

        const promiseAll = []
        for (let index = 0; index < inputs.length; index++) {
          const element = inputs[index]
          // 组件中可能桥套input导致validate不存在，过滤
          if (element.validate) {
            promiseAll.push(element.validate())
          }
        }

        Promise.all(promiseAll).then((errors) => {
          errors = errors.filter(Boolean)

          if (errors.length) {
            reject(errors)
          } else {
            resolve()
          }
        })
      })

    const validateInput = (name: string) => {
      const matched = children.find((item) => item.name === name)

      if (matched) {
        return new Promise<void>((resolve, reject) => {
          matched.validate().then((error?: InputValidateError) => {
            if (error) {
              reject(error)
            } else {
              resolve()
            }
          })
        })
      }

      return Promise.reject()
    }

    const validate = (name?: string | string[]) => {
      if (typeof name === 'string') {
        return validateInput(name)
      }

      // 根据validateFirst来判断校验方法
      return props.validateFirst ? validateSeq(name) : validateAll(name)
    }

    const resetValidation = (name?: string | string[]) => {
      if (typeof name === 'string') {
        name = [name]
      }

      const inputs = getInputsByNames(name)
      inputs.forEach((item) => {
        item.resetValidation && item.resetValidation()
      })
    }

    const getValidationStatus = () =>
      children.reduce<Record<string, InputValidationStatus>>((form, input) => {
        form[input.name] = input.getValidationStatus()
        return form
      }, {})

    const scrollToInput = (
      name: string,
      options?: boolean | ScrollIntoViewOptions
    ) => {
      children.some((item) => {
        if (item.name === name) {
          item.$el.scrollIntoView(options)
          return true
        }
        return false
      })
    }

    // 获取form的值
    const getValues = () =>
      children.reduce<Record<string, unknown>>((form, input) => {
        if (input.name !== undefined && input.formValue) {
          form[input.name] = input.formValue.value
        }
        return form
      }, {})

    const submit = () => {
      const values = getValues()

      validate()
        .then(() => emit('submit', values))
        .catch((errors: InputValidateError[]) => {
          emit('failed', { values, errors })

          if (props.scrollToError && errors[0].name) {
            scrollToInput(errors[0].name)
          }
        })
    }

    // form表单原生提交事件
    const onSubmit = (event: Event) => {
      preventDefault(event)
      submit()
    }

    linkChildren({ props })
    useExpose<FormExpose>({
      submit,
      validate,
      getValues,
      scrollToInput,
      resetValidation,
      getValidationStatus
    })

    return () => (
      <form class={bem()} onSubmit={onSubmit}>
        {slots.default?.()}
      </form>
    )
  }
})
