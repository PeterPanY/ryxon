export default {
  name: 'ryxon',
  build: {
    srcDir: 'src',
    tagPrefix: 'r-',
    namedExport: true,
    skipInstall: ['lazyload'],
    packageManager: 'pnpm',
    extensions: {
      esm: '.mjs'
    },
    site: {
      publicPath:
        (typeof window === 'undefined' && process.env.PUBLIC_PATH) || '/ryxon/'
    },
    vetur: {
      tagPrefix: 'r-'
    },
    css: {
      removeSourceFile: true
    }
  },
  site: {
    defaultLang: 'en-US',
    darkModeClass: 'r-theme-dark',
    lightModeClass: 'r-theme-light',
    versions: [],
    baiduAnalytics: {
      seed: 'af5d41bc4e446e76665dbe3ec18d55c3'
    },
    headHtml: `<script>
if (location.host === 'youzan.github.io') {
location.href = location.href.replace('youzan.github.io', 'ryxon-ui.github.io');
}
</script>
`,
    locales: {
      'zh-CN': {
        title: 'Ryxon',
        subtitle: '（适用于 Vue 3）',
        description: '轻量、可靠的组件库',
        logo: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/logo.png',
        langLabel: '中',
        links: [
          {
            logo: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/github.svg',
            url: 'https://github.com/PeterPanY/ryxon'
          }
        ],
        nav: []
      },
      'en-US': {
        title: 'Ryxon',
        subtitle: ' (for Vue 3)',
        description: 'Lightweight Components built on Vue',
        logo: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/logo.png',
        langLabel: 'EN',
        links: [
          {
            logo: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/github.svg',
            url: 'https://github.com/PeterPanY/ryxon'
          }
        ],
        nav: []
      }
    }
  }
}
