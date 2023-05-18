import { ref, reactive } from 'vue'
import merge from '../utils/deepmerge'
import defaultMessages from './lang/zh-CN'

type Message = Record<string, any>
type Messages = Record<string, Message>

const lang = ref('zh-cn')
const messages = reactive<Messages>({
  'zh-cn': defaultMessages
})

export const Locale = {
  messages(): Message {
    return messages[lang.value]
  },

  use(newLang: string, newMessages?: Message) {
    lang.value = newLang
    this.add({ [newLang]: newMessages })
  },

  add(newMessages: Message = {}) {
    merge(messages, newMessages)
  }
}

export const useCurrentLang = () => lang

export default Locale
