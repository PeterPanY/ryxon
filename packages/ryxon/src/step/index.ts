import { withInstall } from '@ryxon/utils'
import _Step from './Step'

export const Step = withInstall(_Step)
export default Step
export type { StepThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RStep: typeof Step
  }
}
