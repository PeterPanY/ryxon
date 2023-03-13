import * as Ryxon from '@ryxon/components'
import { Lazyload } from 'ryxon'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'

import { globals } from '../vitepress'

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

export default define<ThemeType>({
  ...Theme,
  enhanceApp: ({ app }) => {
    // 全局注册懒加载
    app.use(Lazyload, {
      lazyComponent: true
    })

    Object.keys(Ryxon).forEach((key) => {
      // key.startsWith('R')
      if (Ryxon[key].name) {
        app.component(Ryxon[key].name, Ryxon[key])
      }
    })
    globals.forEach(([name, comp]) => app.component(name, comp))
  }
})
