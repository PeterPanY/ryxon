import type { MaybeRef } from '@vueuse/core'

export interface LoadingParentElement extends HTMLElement {
  vLoadingAddClassList?: () => void
}

export type LoadingOptionsResolved = {
  parent: LoadingParentElement
  background: MaybeRef<string>
  spinner: MaybeRef<boolean | string>
  text: MaybeRef<string>
  fullscreen: boolean
  lock: boolean
  customClass: MaybeRef<string>
  visible: boolean
  target: HTMLElement
  size: MaybeRef<string | number>
  type: MaybeRef<string>
  color: MaybeRef<string>
  vertical: boolean
  textSize: MaybeRef<string | number>
  textColor: MaybeRef<string>
  beforeClose?: () => boolean
  closed?: () => void
}
export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
    target: HTMLElement | string
    body: boolean
  }
>

export type LoadingThemeVars = {
  loadingTextColor?: string
  loadingTextFontSize?: string
  loadingSpinnerColor?: string
  loadingSpinnerSize?: string
  loadingSpinnerDuration?: string
}
