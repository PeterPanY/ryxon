import * as Ryxon from '@ryxon/components'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'

import { globals } from '../vitepress'

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
// import Theme from 'vitepress/dist/client/theme-default/index.js'

import 'vitepress/dist/client/theme-default/styles/fonts.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/utils.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
// import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import './styles/vp-doc.scss'
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css'
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue'

export default define<ThemeType>({
  Layout,
  NotFound,
  enhanceApp: ({ app }) => {
    // 全局注册懒加载
    app.use(Ryxon.Lazyload, {
      lazyComponent: true
    })

    app.directive('loading', Ryxon.loadingDirective)

    Object.keys(Ryxon).forEach((key) => {
      // key.startsWith('R')
      if (Ryxon[key].name) {
        app.component(Ryxon[key].name, Ryxon[key])
      }
    })
    globals.forEach(([name, comp]) => app.component(name, comp))
  }
})
