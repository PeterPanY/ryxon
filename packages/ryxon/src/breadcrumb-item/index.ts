import { withInstall } from '@ryxon/utils'
import _BreadcrumbItem from './BreadcrumbItem'

export const BreadcrumbItem = withInstall(_BreadcrumbItem)
export default BreadcrumbItem
export { breadcrumbItemProps } from './BreadcrumbItem'
export type { BreadcrumbItemProps } from './BreadcrumbItem'

declare module 'vue' {
  export interface GlobalComponents {
    RBreadcrumbItem: typeof BreadcrumbItem
  }
}
