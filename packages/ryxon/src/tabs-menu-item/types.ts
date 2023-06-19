import type { TabsMenuItemProps } from './TabsMenuItem'
import type { VNode, ComponentPublicInstance } from 'vue'
import type { Numeric } from '../utils'

export type TabsMenuItemOption = {
  text: string
  icon?: string
  value: Numeric
}

export type TabsMenuItemExpose = {
  toggle: (
    show?: boolean,
    options?: {
      immediate?: boolean
    }
  ) => void
  /** @private */
  state: {
    showPopup: boolean
    transition: boolean
    showWrapper: boolean
  }
  /** @private */
  renderTitle: () => string | VNode[]
}

export type TabsMenuItemInstance = ComponentPublicInstance<
  TabsMenuItemProps,
  TabsMenuItemExpose
>

export type TabsMenuItemThemeVars = {
  tabsMenuItemZIndex?: number | string
}
