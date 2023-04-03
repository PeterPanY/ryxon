import { computed, inject } from 'vue'
import type { IElDropdownInstance } from './types'

export const useDropdown = () => {
  const rDropdown = inject<IElDropdownInstance>('rDropdown', {})
  const _rDropdownSize = computed(() => rDropdown?.dropdownSize)

  return {
    rDropdown,
    _rDropdownSize
  }
}
