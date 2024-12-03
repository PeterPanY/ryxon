import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx(), DefineOptions()],
  server: {
    port: 3002
  },
  css: {
    // 忽略遗留的 (legacy)，并且将在 Dart Sass 2.0.0 版本中被移除问题。https://sass-lang.com/d/legacy-js-api
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
