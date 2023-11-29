import { withInstall } from '../utils'
import _Message from './Message'

export const Message = withInstall(_Message)
export default Message

export { messageProps } from './Message'
export type { MessageProps } from './Message'
export type { MessageInstance, MessageThemeVars } from './types'
export {
  showMessage,
  showSuccessMessage,
  showInfoMessage,
  showDangerMessage,
  showWarningMessage,
  closeAllMessage
} from './function-call'

declare module 'vue' {
  export interface GlobalComponents {
    RMessage: typeof Message
  }
}
