import { type ComponentPublicInstance } from 'vue'
import { type Numeric } from '@ryxon/utils'

export type CollapseProvide = {
  toggle: (name: Numeric, expanded: boolean) => void
  isExpanded: (name: Numeric) => boolean
}

export type CollapseToggleAllOptions =
  | boolean
  | {
      expanded?: boolean
      skipDisabled?: boolean
    }

export type CollapseInstance = ComponentPublicInstance<{
  toggleAll: (options?: boolean | CollapseToggleAllOptions) => void
}>
