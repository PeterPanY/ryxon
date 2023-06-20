import type { ComponentPublicInstance, Ref } from 'vue'
import type { TabsMenuProps } from './TabsMenu'

export type TabsMenuDirection = 'up' | 'down'
export type TabsMenuTrigger = 'click' | 'hover'
export type TabsMenuType = 'line' | 'none'

export type TabsMenuProvide = {
  id: string
  props: TabsMenuProps
  offset: Ref<number>
  updateOffset: () => void
  updateActive: (index: number) => void
}

export type TabsMenuExpose = {
  close: () => void
}

export type TabsMenuInstance = ComponentPublicInstance<
  TabsMenuProps,
  TabsMenuExpose
>

export type TabsMenuScrollable = {
  next?: boolean
  prev?: boolean
}

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
  tabsMenuBottomBarWidth?: string
  tabsMenuBottomBarHeight?: string
  tabsMenuBottomBarColor?: string
}
