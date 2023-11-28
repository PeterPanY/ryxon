import { withInstall } from '../utils'
import _Mention from './Mention'

export const Mention = withInstall(_Mention)
export default Mention

export { mentionProps } from './Mention'
export type { MentionProps } from './Mention'
export type { MentionOption, MentionThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RMention: typeof Mention
  }
}
