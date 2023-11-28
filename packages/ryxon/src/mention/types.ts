import { type CSSProperties } from 'vue'

export type MentionOption = {
  value?: string
  label?: string
  class?: string
  style?: string | CSSProperties
  disabled?: boolean
  [k: string]: unknown
}

export type MentionThemeVars = {
  mentionTextColor?: string
  mentionHeight?: string
  mentionPaddingVertical?: string
  mentionLineHeight?: string
  mentionPlaceholderTextColor?: string
  mentionDisabledTextColor?: string
  mentionHoverFill?: string
  mentionHoverColor?: string
}
