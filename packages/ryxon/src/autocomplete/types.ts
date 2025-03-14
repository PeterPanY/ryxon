import { CircleClose } from '@ryxon/icons'
import {
  noop,
  isObject,
  isString,
  truthProp,
  definePropType,
  makeStringProp
} from '@ryxon/utils'
import { iconPropType } from '../utils'
import type { PropType, TeleportProps, ExtractPropTypes } from 'vue'
import type { Awaitable } from '@ryxon/utils'

export type AutocompletePlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export type AutocompleteData = Record<string, any>[]
export type AutocompleteFetchSuggestionsCallback = (
  data: AutocompleteData
) => void
export type AutocompleteFetchSuggestions =
  | ((
      queryString: string,
      cb: AutocompleteFetchSuggestionsCallback
    ) => Awaitable<AutocompleteData> | void)
  | AutocompleteData

export const autocompleteProps = {
  inputId: String,
  valueKey: { type: String, default: 'value' },
  modelValue: { type: [String, Number], default: '' },
  debounce: { type: Number, default: 300 },
  showArrow: truthProp,
  placement: makeStringProp<AutocompletePlacement>('bottom-start'),
  fetchSuggestions: {
    type: definePropType<AutocompleteFetchSuggestions>([Function, Array]),
    default: noop
  },
  popperClass: { type: String, default: '' },
  triggerOnFocus: { type: Boolean, default: true },
  selectWhenUnmatched: { type: Boolean, default: false },
  hideLoading: { type: Boolean, default: false },
  label: { type: String },
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },
  highlightFirstItem: { type: Boolean, default: false },
  fitInputWidth: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearIcon: { type: iconPropType, default: CircleClose },
  lazyRender: truthProp
}

export type AutocompleteProps = ExtractPropTypes<typeof autocompleteProps>

export const autocompleteEmits = {
  'update:modelValue': (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item: Record<string, any>) => isObject(item)
}
