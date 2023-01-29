<template>
  <demo-nav />
  <router-view v-slot="{ Component }">
    <demo-section>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </demo-section>
  </router-view>
</template>

<script>
import { watch } from 'vue';
import DemoNav from './components/DemoNav.vue';
import { useCurrentTheme } from '../common/iframe-sync';
import { config } from 'site-mobile-shared';

export default {
  components: { DemoNav },

  setup() {
    const theme = useCurrentTheme();

    watch(
      theme,
      (newVal, oldVal) => {
        document.documentElement.classList.remove(`r-doc-theme-${oldVal}`);
        document.documentElement.classList.add(`r-doc-theme-${newVal}`);

        const { darkModeClass, lightModeClass } = config.site;
        if (darkModeClass) {
          document.documentElement.classList.toggle(
            darkModeClass,
            newVal === 'dark'
          );
        }
        if (lightModeClass) {
          document.documentElement.classList.toggle(
            lightModeClass,
            newVal === 'light'
          );
        }
      },
      { immediate: true }
    );
  },
};
</script>

<style lang="less">
@import '../common/style/base';

body {
  min-width: 100vw;
  background-color: inherit;
}

.r-doc-theme-light {
  background-color: var(--r-doc-gray-1);
}

.r-doc-theme-dark {
  background-color: var(--r-doc-black);
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
