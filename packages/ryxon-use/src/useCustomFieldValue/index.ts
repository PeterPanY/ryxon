import { watch, inject, InjectionKey, Ref } from 'vue'

export type CustomInputInjectionValue = {
  customValue: Ref<(() => unknown) | undefined>
  resetValidation: () => void
  validateWithTrigger: (trigger: 'onBlur' | 'onChange' | 'onSubmit') => void
}

export const CUSTOM_INPUT_INJECTION_KEY: InjectionKey<CustomInputInjectionValue> =
  Symbol('r-input')

export function useCustomInputValue(customValue: () => unknown) {
  const customInput = inject(CUSTOM_INPUT_INJECTION_KEY, null)

  if (customInput && !customInput.customValue.value) {
    customInput.customValue.value = customValue

    watch(customValue, () => {
      customInput.resetValidation()
      customInput.validateWithTrigger('onChange')
    })
  }
}
