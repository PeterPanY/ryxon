<template>
  <div class="app">
    <r-doc
      v-if="config"
      :lang="lang"
      :config="config"
      :versions="versions"
      :simulator="simulator"
      :has-simulator="hasSimulator"
      :lang-configs="langConfigs"
      :dark-mode-class="darkModeClass"
    >
      <router-view />
      <div class="r-doc-icp" v-if="icpLicense">
        <a :href="icpLicense.link" target="_black">
          {{ icpLicense.text }}
        </a>
      </div>
    </r-doc>
  </div>
</template>

<script>
import RDoc from './components/index.vue'
import { config } from 'site-desktop-shared'
import { setLang } from '../common/locales'

export default {
  components: {
    RDoc
  },

  data() {
    return {
      hasSimulator: true,
      darkModeClass: config.site.darkModeClass
    }
  },

  computed: {
    simulator() {
      if (config.site.simulator?.url) {
        return config.site.simulator?.url
      }
      const path = location.pathname.replace(/\/index(\.html)?/, '/')
      return `${path}mobile.html${location.hash}`
    },

    lang() {
      const { lang } = this.$route.meta
      return lang || ''
    },

    langConfigs() {
      const { locales = {} } = config.site
      return Object.keys(locales).map((key) => ({
        lang: key,
        label: locales[key].langLabel || ''
      }))
    },

    config() {
      const { locales } = config.site

      if (locales) {
        return locales[this.lang]
      }

      return config.site
    },

    icpLicense() {
      if (this.lang === 'zh-CN') {
        return config.site.icpLicense
      }
      return null
    },

    versions() {
      return config.site.versions || null
    }
  },

  watch: {
    // eslint-disable-next-line
    '$route.path'() {
      this.setTitleAndToggleSimulator()
    },

    lang(val) {
      setLang(val)
      this.setTitleAndToggleSimulator()
    },

    config: {
      handler(val) {
        if (val) {
          this.setTitleAndToggleSimulator()
        }
      },
      immediate: true
    }
  },

  mounted() {
    if (this.$route.hash) {
      this.$nextTick(() => {
        const el = document.querySelector(this.$route.hash)
        if (el) {
          el.scrollIntoView()
        }
      })
    }
  },

  methods: {
    setTitleAndToggleSimulator() {
      let { title } = this.config

      const navItems = this.config.nav.reduce(
        (result, nav) => [...result, ...nav.items],
        []
      )

      const current = navItems.find(
        (item) => item.path === this.$route.meta.name
      )

      if (current && current.title) {
        title = current.title + ' - ' + title
      } else if (this.config.description) {
        title += ` - ${this.config.description}`
      }

      document.title = title

      this.hasSimulator = !(
        config.site.hideSimulator ||
        this.config.hideSimulator ||
        (current && current.hideSimulator)
      )
    }
  }
}
</script>

<style lang="less">
@import '../common/style/base';
@import '../common/style/highlight';

.r-doc-intro {
  padding-top: 20px;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
}

.r-doc-icp {
  font-size: 14px;
  text-align: center;
  a {
    color: #bbb;
  }
}
</style>
