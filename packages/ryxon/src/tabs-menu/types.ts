import type { ComponentPublicInstance, Ref } from 'vue'
import type { TabsMenuProps } from './TabsMenu'

export type TabsMenuDirection = 'up' | 'down'
export type TabsMenuTrigger = 'click' | 'hover'

export type TabsMenuProvide = {
  id: string
  props: TabsMenuProps
  offset: Ref<number>
  boxRefs: any
  updateOffset: () => void
}

export type TabsMenuExpose = {
  close: () => void
}

export type TabsMenuInstance = ComponentPublicInstance<
  TabsMenuProps,
  TabsMenuExpose
>

export type TabsMenuThemeVars = {
  tabsMenuHeight?: string
  tabsMenuBackground?: string
  tabsMenuShadow?: string
  tabsMenuTitleFontSize?: string
  tabsMenuTitleTextColor?: string
  tabsMenuTitleActiveTextColor?: string
  tabsMenuTitleDisabledTextColor?: string
  tabsMenuTitlePadding?: string
  tabsMenuTitleLineHeight?: number | string
  tabsMenuOptionActiveColor?: string
  tabsMenuContentMaxHeight?: string
}
