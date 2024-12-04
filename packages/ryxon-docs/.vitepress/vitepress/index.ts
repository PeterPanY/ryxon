import 'normalize.css'

import '@ryxon/components/index.less'

import './styles/css-vars.scss'
import './styles/app.scss'

import Demo from './component/Demo.vue'
import IconList from './component/IconList.vue'
import ApiTyping from './component/globals/vp-api-typing.vue'

export const globals = [
  ['Demo', Demo],
  ['IconList', IconList],
  ['ApiTyping', ApiTyping]
]
