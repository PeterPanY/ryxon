import componentLocale from '../i18n/pages/component.json'
import guideLocale from '../i18n/pages/guide.json'
import apiLocale from '../i18n/pages/api.json'

// 指南左侧导航
function getGuideSidebar() {
  const result = {}
  Object.entries(guideLocale).map(([lang, val]) => {
    result[`/${lang}/guide/`] = Object.values(val).map((item) =>
      mapPrefix(item, lang, '/guide')
    )
  })
  return result
}

// 组件左侧导航
function getComponentsSideBar() {
  const result = {}
  Object.entries(componentLocale).map(([lang, val]) => {
    result[`/${lang}/component/`] = Object.values(val).map((item) =>
      mapPrefix(item, lang, '/component')
    )
  })
  return result
}

// api左侧导航
function getApiSideBar() {
  const result = {}
  Object.entries(apiLocale).map(([lang, val]) => {
    result[`/${lang}/api/`] = Object.values(val).map((item) =>
      mapPrefix(item, lang, '/api')
    )
  })
  return result
}

// 返回带有语言配置的侧边栏。
// 这可能会创建重复的数据，但开销是可以忽略的
const getSidebars = () => {
  return Object.assign(
    getGuideSidebar(),
    getComponentsSideBar(),
    getApiSideBar()
  )
}

type Item = {
  text: string
  items?: Item[]
  children?: Item[]
  link?: string
}

function mapPrefix(item: Item, lang: string, prefix = '') {
  if (item.children && item.children.length > 0) {
    const res = {
      ...item,
      items: item.children.map((child) => mapPrefix(child, lang, prefix))
    }
    delete res.children
    return res
  }
  return {
    ...item,
    link: `/${lang}${prefix}${item.link}`
  }
}

export const sidebar = getSidebars()
