import { withInstall } from '@ryxon/utils'
import _CollapseTransition from './CollapseTransition.vue'

export const CollapseTransition = withInstall(_CollapseTransition)
export default CollapseTransition

declare module 'vue' {
  export interface GlobalComponents {
    RCollapseTransition: typeof CollapseTransition
  }
}
