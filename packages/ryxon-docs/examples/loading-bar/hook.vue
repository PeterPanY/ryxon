<template>
  <r-loading-bar>
    <loading-bar-trigger />
  </r-loading-bar>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { Button, useLoadingBar } from '@ryxon/components'

// eslint-disable-next-line vue/one-component-per-file
export default defineComponent({
  components: {
    // eslint-disable-next-line vue/one-component-per-file
    LoadingBarTrigger: defineComponent({
      setup() {
        const loadingBar = useLoadingBar()
        return () => {
          return h('div', null, {
            default: () => [
              h(Button, { onClick: () => loadingBar.start() }, () => 'Start'),
              h(Button, { onClick: () => loadingBar.finish() }, () => 'Finish')
            ]
          })
        }
      }
    })
  }
})
</script>
