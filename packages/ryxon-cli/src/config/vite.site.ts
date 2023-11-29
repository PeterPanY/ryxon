import { join } from 'node:path'
import vitePluginVue from '@vitejs/plugin-vue'
import vitePluginJsx from '@vitejs/plugin-vue-jsx'
import { vitePluginMd } from '../compiler/vite-plugin-md.js'
import { setBuildTarget, getRyxonConfig, isDev } from '../common/index.js'
import { SITE_DIST_DIR, SITE_SRC_DIR } from '../common/constant.js'
import lodash from 'lodash'
import type { InlineConfig, PluginOption } from 'vite'
import { genSiteMobileShared } from '../compiler/gen-site-mobile-shared.js'
import { genSiteDesktopShared } from '../compiler/gen-site-desktop-shared.js'
import { genPackageStyle } from '../compiler/gen-package-style.js'
import { CSS_LANG } from '../common/css.js'

function getSiteConfig(ryxonConfig: any) {
  const siteConfig = ryxonConfig.site

  if (siteConfig.locales) {
    return siteConfig.locales[siteConfig.defaultLang || 'en-US']
  }

  return siteConfig
}

function getTitle(config: { title: string; description?: string }) {
  let { title } = config

  if (config.description) {
    title += ` - ${config.description}`
  }

  return title
}

function getHTMLMeta(ryxonConfig: any) {
  const meta = ryxonConfig.site?.htmlMeta

  if (meta) {
    return Object.keys(meta)
      .map((key) => `<meta name="${key}" content="${meta[key]}">`)
      .join('\n')
  }

  return ''
}

function vitePluginGenRyxonBaseCode(): PluginOption {
  const virtualMobileModuleId = 'site-mobile-shared'
  const resolvedMobileVirtualModuleId = `ryxon-cli:${virtualMobileModuleId}`

  const virtualDesktopModuleId = 'site-desktop-shared'
  const resolvedDesktopVirtualModuleId = `ryxon-cli:${virtualDesktopModuleId}`

  const virtualPackageStyleModuleId = /package-style/
  const resolvedPackageStyleVirtualModuleId = `ryxon-cli${virtualPackageStyleModuleId}index.${CSS_LANG}`

  return {
    name: 'vite-plugin(ryxon-cli):gen-site-base-code',
    resolveId(id) {
      if (id === virtualMobileModuleId) {
        return resolvedMobileVirtualModuleId
      }

      if (id === virtualDesktopModuleId) {
        return resolvedDesktopVirtualModuleId
      }

      if (virtualPackageStyleModuleId.test(id)) {
        return resolvedPackageStyleVirtualModuleId
      }
    },
    load(id) {
      switch (id) {
        case resolvedMobileVirtualModuleId:
          return genSiteMobileShared()
        case resolvedDesktopVirtualModuleId:
          return genSiteDesktopShared()
        case resolvedPackageStyleVirtualModuleId:
          return genPackageStyle()
        default:
          break
      }
    }
  }
}

function vitePluginHTML(data: object): PluginOption {
  return {
    name: 'vite-plugin-html',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return lodash.template(html)(data)
      }
    }
  }
}

export function getViteConfigForSiteDev(): InlineConfig {
  setBuildTarget('site')

  const ryxonConfig = getRyxonConfig()
  const siteConfig = getSiteConfig(ryxonConfig)
  const title = getTitle(siteConfig)
  const headHtml = ryxonConfig.site?.headHtml
  const baiduAnalytics = ryxonConfig.site?.baiduAnalytics
  const enableVConsole = isDev() && ryxonConfig.site?.enableVConsole

  return {
    root: SITE_SRC_DIR,

    optimizeDeps: {
      // https://github.com/youzan/ryxon/issues/10930
      include: ['vue', 'vue-router']
    },

    plugins: [
      vitePluginGenRyxonBaseCode(),
      vitePluginVue({
        include: [/\.vue$/, /\.md$/]
      }),
      vitePluginMd(),
      vitePluginJsx(),
      vitePluginHTML({
        ...siteConfig,
        title,
        // `description` is used by the HTML ejs template,
        // so it needs to be written explicitly here to avoid error: description is not defined
        description: siteConfig.description,
        headHtml,
        baiduAnalytics,
        enableVConsole,
        meta: getHTMLMeta(ryxonConfig)
      })
    ],

    server: {
      host: '0.0.0.0'
    }
  }
}

export function getViteConfigForSiteProd(): InlineConfig {
  const devConfig = getViteConfigForSiteDev()
  const ryxonConfig = getRyxonConfig()
  const outDir = ryxonConfig.build?.site?.outputDir || SITE_DIST_DIR
  const publicPath = ryxonConfig.build?.site?.publicPath || '/'

  return {
    ...devConfig,
    base: publicPath,
    build: {
      outDir,
      reportCompressedSize: false,
      emptyOutDir: true,
      // https://github.com/PeterPanY/ryxon/issues/9703
      cssTarget: ['chrome53'],
      rollupOptions: {
        input: {
          main: join(SITE_SRC_DIR, 'index.html'),
          mobile: join(SITE_SRC_DIR, 'mobile.html')
        },
        output: {
          manualChunks: {
            'vue-libs': ['vue', 'vue-router']
          }
        }
      }
    }
  }
}
