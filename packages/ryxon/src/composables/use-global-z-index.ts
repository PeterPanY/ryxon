/**
 * Popup 组件的z-index.

 * 影响的组件:
 *   - ActionSheet
 *   - Dialog
 *   - DropdownItem
 *   - ImagePreview
 *   - Notification
 *   - Popup
 *   - Popover
 *   - ShareSheet
 *   - Message
 */
let globalZIndex = 2000

/** the global z-index is automatically incremented after reading */
export const useGlobalZIndex = () => ++globalZIndex

/** reset the global z-index */
export const setGlobalZIndex = (val: number) => {
  globalZIndex = val
}
