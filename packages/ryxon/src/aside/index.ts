import { withInstall } from '../utils'
import _Aside from './Aside'

export const Aside = withInstall(_Aside)
export default Aside
export { asideProps } from './Aside'
export type { AsideProps } from './Aside'
export type { AsideThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RAside: typeof Aside
  }
}
