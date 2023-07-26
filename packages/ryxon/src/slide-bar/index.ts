import _SlideBar from './SlideBar'
import { withInstall } from '../utils'

export const SlideBar = withInstall(_SlideBar)
export default SlideBar

export { slideBarProps } from './SlideBar'
export type { SlideBarProps } from './SlideBar'
export type { SlideBarThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RSlideBar: typeof SlideBar
  }
}
