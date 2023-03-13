export * from './src/popper'
import { withInstall } from '@ryxon/utils'
import Popper from './src/popper.vue'

export const VanPopper = withInstall(Popper)

export default VanPopper