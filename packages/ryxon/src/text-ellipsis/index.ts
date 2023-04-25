import { withInstall } from '../utils'
import _TextEllipsis from './TextEllipsis'

export const TextEllipsis = withInstall(_TextEllipsis)
export default TextEllipsis
export { textEllipsisProps } from './TextEllipsis'

export type { TextEllipsisProps } from './TextEllipsis'
export type { TextEllipsisThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RTextEllipsis: typeof TextEllipsis
  }
}