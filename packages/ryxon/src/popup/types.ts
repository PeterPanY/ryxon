import type {
  Ref,
  InjectionKey,
  ComputedRef,
  ComponentPublicInstance
} from 'vue'
import type { Instance } from '@popperjs/core'
import type { PopupProps } from './Popup'

export type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'center' | ''

export type PopupCloseIconPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export type PopupExpose = {
  popupRef: Ref<HTMLElement>
}

export type PopupInstance = ComponentPublicInstance<PopupProps, PopupExpose>

export type PopupThemeVars = {
  popupBackground?: string
  popupTransition?: string
  popupRoundRadius?: string
  popupCloseIconSize?: string
  popupCloseIconColor?: string
  popupCloseIconMargin?: string
  popupCloseIconZIndex?: number | string
}

export type Measurable = {
  getBoundingClientRect: () => DOMRect
}

export type PopperInjectionContext = {
  triggerRef: Ref<Measurable | undefined>
  contentRef: Ref<HTMLElement | undefined>
  popperInstanceRef: Ref<Instance | undefined>
  referenceRef: Ref<Measurable | undefined>
  role: ComputedRef<string>
}

export const POPPER_INJECTION_KEY: InjectionKey<PopperInjectionContext> =
  Symbol('popper')

export type RoleTypes =
  | 'dialog'
  | 'grid'
  | 'group'
  | 'listbox'
  | 'menu'
  | 'navigation'
  | 'tooltip'
  | 'tree'
