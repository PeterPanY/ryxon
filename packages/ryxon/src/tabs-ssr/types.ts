import type { CSSProperties } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export interface TabItem {
  title: string
  disabled?: boolean
  dot?: boolean
  badge?: number | string
  name?: string | number
  url?: string
  to?: string | RouteLocationRaw
  replace?: boolean
  titleStyle?: string | CSSProperties
  titleClass?: unknown
  closable?: boolean
  showZeroBadge?: boolean
  slot?: string
  content?: string
  [key: string]: any
}
