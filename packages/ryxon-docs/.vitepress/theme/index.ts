import * as Ryxon from '@ryxon/components'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'

import { globals } from '../vitepress'

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

export default define<ThemeType>({
  ...Theme,
  enhanceApp: ({ app }) => {
    Object.keys(Ryxon).forEach(key => {
      if (key.startsWith('R') && Ryxon[key].name) {
        app.component(Ryxon[key].name, Ryxon[key])
      }
    })
    globals.forEach(([name, comp]) => app.component(name, comp))
  }
})
