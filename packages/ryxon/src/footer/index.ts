import { withInstall } from '@ryxon/utils'
import _Footer from './Footer'

export const Footer = withInstall(_Footer)
export default Footer
export { footerProps } from './Footer'
export type { FooterProps } from './Footer'
export type { FooterThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RFooter: typeof Footer
  }
}
