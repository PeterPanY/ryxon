import { withInstall } from '../utils'
import _Main from './Main'

export const Main = withInstall(_Main)
export default Main
export { mainProps } from './Main'
export type { MainProps } from './Main'
export type { MainThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RMain: typeof Main
  }
}
