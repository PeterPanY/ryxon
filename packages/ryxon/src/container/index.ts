import { withInstall } from '@ryxon/utils'
import _Container from './Container'

export const Container = withInstall(_Container)
export default Container
export { containerProps } from './Container'
export type { ContainerProps } from './Container'

declare module 'vue' {
  export interface GlobalComponents {
    RContainer: typeof Container
  }
}
