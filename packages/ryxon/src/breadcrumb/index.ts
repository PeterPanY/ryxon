import { withInstall } from '../utils'
import _Breadcrumb from './Breadcrumb'

export const Breadcrumb = withInstall(_Breadcrumb)
export default Breadcrumb
export { breadcrumbProps } from './Breadcrumb'
export type { BreadcrumbProps } from './Breadcrumb'

declare module 'vue' {
  export interface GlobalComponents {
    RBreadcrumb: typeof Breadcrumb
  }
}
