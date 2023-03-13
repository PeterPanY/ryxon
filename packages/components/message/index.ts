export * from './src/message'
import { withInstallFunction } from '@ryxon/utils'
import Message from './src/message-method'

export const VanMessage = withInstallFunction(Message, '$message')

export default VanMessage