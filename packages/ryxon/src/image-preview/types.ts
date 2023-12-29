import type { Component, CSSProperties, TeleportProps } from 'vue'
import type { Interceptor } from '@ryxon/utils'
import type { PopupCloseIconPosition } from '../popup'

export type ImagePreviewOptions = {
  loop?: boolean
  images: string[]
  maxZoom?: number
  minZoom?: number
  teleport?: TeleportProps['to']
  className?: unknown
  showIndex?: boolean
  closeable?: boolean
  closeIcon?: string
  transition?: string
  beforeClose?: Interceptor
  overlayStyle?: CSSProperties
  overlayClass?: unknown
  swipeDuration?: number
  startPosition?: number
  showDots?: boolean
  showArrow?: boolean
  closeOnPopstate?: boolean
  closeIconPosition?: PopupCloseIconPosition
  showTool?: boolean
  zoomRate?: number
  closeOnPressEscape?: boolean
  onClose?(): void
  onScale?(args: { scale: number; index: number }): void
  onChange?(index: number): void
}

export type ImagePreviewScaleEventParams = {
  scale: number
  index: number
}

export type ImageViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise'

export type ImageViewerMode = {
  name: string
  icon: Component
}

export type ImagePreviewExpose = {
  resetScale: () => void
  swipeTo: (index: number) => void
}

export type ImagePreviewThemeVars = {
  imagePreviewIndexTextColor?: string
  imagePreviewIndexFontSize?: string
  imagePreviewIndexLineHeight?: number | string
  imagePreviewIndexTextShadow?: string
  imagePreviewOverlayBackground?: string
  imagePreviewCloseIconSize?: string
  imagePreviewCloseIconColor?: string
  imagePreviewCloseIconMargin?: string
  imagePreviewCloseIconZIndex?: number | string
}
