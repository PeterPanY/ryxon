// This component is ported from https://github.com/radix-ui/primitives/tree/main/packages/react/roving-focus
// with some modification for Vue
import { withInstall } from '@ryxon/utils'
import _RovingFocusGroup from './RovingFocusGroup.vue'
import RovingFocusItem from './RovingFocusItem.vue'

export {
  _RovingFocusGroup as RRovingFocusGroup,
  RovingFocusItem as RRovingFocusItem
}

export * from './tokens'
export * from './utils'

export {
  ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY
} from './types'

export const RovingFocusGroup = withInstall(_RovingFocusGroup)
export default RovingFocusGroup

declare module 'vue' {
  export interface GlobalComponents {
    RRovingFocusGroup: typeof RovingFocusGroup
  }
}
