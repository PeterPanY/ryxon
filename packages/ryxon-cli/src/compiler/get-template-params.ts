import { getRyxonConfig, isDev } from '../common/index.js'

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

export function getTemplateParams() {
  const ryxonConfig = getRyxonConfig()
  const siteConfig = getSiteConfig(ryxonConfig)
  const title = getTitle(siteConfig)
  const headHtml = ryxonConfig.site?.headHtml
  const baiduAnalytics = ryxonConfig.site?.baiduAnalytics
  const enableVConsole = isDev() && ryxonConfig.site?.enableVConsole

  return {
    ...siteConfig,
    title,
    // `description` is used by the HTML ejs template,
    // so it needs to be written explicitly here to avoid error: description is not defined
    description: siteConfig.description,
    headHtml,
    baiduAnalytics,
    enableVConsole,
    meta: getHTMLMeta(ryxonConfig)
  }
}
