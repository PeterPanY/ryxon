import { mdPlugin } from './plugins'
import { sidebar } from './sidebars'
import { nav } from './nav'
import { getViteConfig } from './vite'
import type { UserConfig } from 'vitepress'

const isProd = process.env.NODE_ENV === 'production'

const setupConfig = (configEnv) => {
  const config: UserConfig = {
    base: isProd ? '/ryxon/' : '',
    title: 'Ryxon',
    description: 'a Vue 3 based component library for designers and developers',
    themeConfig: {
      logo: '/images/logo.png',
      socialLinks: [
        { icon: 'github', link: 'https://github.com/PeterPanY/ryxon.git' }
      ],
      nav,
      sidebar,
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022-PRESENT Ryxon contributors'
      }
    },
    vite: getViteConfig(configEnv),
    markdown: {
      config: (md) => mdPlugin(md)
    }
  }

  return config
}

export default setupConfig
