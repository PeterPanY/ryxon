// This component is ported from https://github.com/radix-ui/primitives/tree/main/packages/react/roving-focus
// with some modification for Vue
import RRovingFocusGroup from './RovingFocusGroup.vue'
import RRovingFocusItem from './RovingFocusItem.vue'

export { RRovingFocusGroup, RRovingFocusItem }

export * from './tokens'
export * from './utils'

export {
  ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY
} from './types'

export default RRovingFocusGroup
