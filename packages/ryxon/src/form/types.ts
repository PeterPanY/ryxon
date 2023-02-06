import type { ComponentPublicInstance } from 'vue'
import type { FormProps } from './Form'
import type { InputValidationStatus } from '../input'

export type FormExpose = {
  submit: () => void
  validate: (name?: string | string[] | undefined) => Promise<void>
  getValues: () => Record<string, unknown>
  scrollToInput: (
    name: string,
    options?: boolean | ScrollIntoViewOptions | undefined
  ) => void
  resetValidation: (name?: string | string[] | undefined) => void
  getValidationStatus: () => Record<string, InputValidationStatus>
}

export type FormProvide = {
  props: FormProps
}

export type FormInstance = ComponentPublicInstance<FormProps, FormExpose>
