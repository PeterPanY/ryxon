import { loadEnv } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'

import type { UserConfig } from 'vitepress'

type ViteConfig = Required<UserConfig>['vite']

export const getViteConfig = ({ mode }: { mode: string }): ViteConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    },
    server: {
      host: true
    },
    plugins: [vueJsx()]
  }
}
