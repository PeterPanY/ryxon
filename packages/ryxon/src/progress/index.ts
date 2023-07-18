import { withInstall } from '../utils'
import _Progress from './Progress'

export const Progress = withInstall(_Progress)
export default Progress

export { progressProps } from './Progress'
export type { ProgressProps } from './Progress'
export type { ProgressThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RProgress: typeof Progress
  }
}
