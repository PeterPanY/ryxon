import { withInstall } from '@ryxon/utils'
import _ActionBarButton from './ActionBarButton'

export const ActionBarButton = withInstall(_ActionBarButton)
export default ActionBarButton
export { actionBarButtonProps } from './ActionBarButton'
export type { ActionBarButtonProps } from './ActionBarButton'
export type { ActionBarButtonThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RActionBarButton: typeof ActionBarButton
  }
}
