import { isArray, type Numeric } from '@ryxon/utils'

export function validateModelValue(
  modelValue: Numeric | Numeric[],
  accordion: boolean
) {
  if (accordion && isArray(modelValue)) {
    console.error(
      '[Ryxon] Collapse: "v-model" should not be Array in accordion mode'
    )
    return false
  }

  if (!accordion && !isArray(modelValue)) {
    console.error(
      '[Ryxon] Collapse: "v-model" should be Array in non-accordion mode'
    )
    return false
  }

  return true
}
