import type { ComponentPublicInstance } from 'vue'
import type { TextEllipsisProps } from './TextEllipsis'

export type TextEllipsisExpose = {
  toggle: (expanded?: boolean) => void
}

export type TextEllipsisInstance = ComponentPublicInstance<
  TextEllipsisProps,
  TextEllipsisExpose
>

export type TextEllipsisType = 'text' | 'icon'

export type TextEllipsisThemeVars = {
  textEllipsisFontSize?: string
  textEllipsisActionColor?: string
  textEllipsisLineHeight?: number | string
}
