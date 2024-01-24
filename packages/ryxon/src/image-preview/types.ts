import type { CSSProperties, TeleportProps, ComponentPublicInstance } from 'vue'
import type { Interceptor } from '@ryxon/utils'
import type { PopupCloseIconPosition } from '../popup'
import type { ImagePreviewProps } from './ImagePreview'
import type { ImagePreviewItemProps } from './ImagePreviewItem'

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
  icon: () => void
}

type ImagePreviewItemExpose = {
  setScale: (scale: number) => void
  setDeg: (type: string) => void
  resetScale: () => void
}

export type ImagePreviewItemInstance = ComponentPublicInstance<
  ImagePreviewItemProps,
  ImagePreviewItemExpose
>

export type ImagePreviewExpose = {
  resetScale: () => void
  swipeTo: (index: number) => void
}

export type ImagePreviewInstance = ComponentPublicInstance<
  ImagePreviewProps,
  ImagePreviewExpose
>

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
