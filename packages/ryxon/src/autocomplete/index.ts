import { withInstall } from '../utils'
import _Autocomplete from './Autocomplete.vue'

export const Autocomplete = withInstall(_Autocomplete)
export default Autocomplete
export { autocompleteProps } from './types'
export type { AutocompleteProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RAutocomplete: typeof Autocomplete
  }
}
