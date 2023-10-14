import type { Ref } from 'vue'

export type TooltipTheme = 'light' | 'dark'
export type TooltipTrigger = 'click' | 'focus' | 'hover' | 'contextmenu'

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export type TooltipProvide = {
  controlled: Ref<boolean>
  id: Ref<string>
  open: Ref<boolean>
  trigger: Ref<unknown>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void
  onToggle: (e: Event) => void
  onShow: () => void
  onHide: () => void
  onBeforeShow: () => void
  onBeforeHide: () => void
  updatePopper: () => void
}

export type TooltipThemeVars = {
  tooltipArrowSize?: string
  tooltipRadius?: string
  tooltipLightTextColor?: string
  tooltipLightBackground?: string
  tooltipDarkTextColor?: string
  tooltipDarkBackground?: string
}
