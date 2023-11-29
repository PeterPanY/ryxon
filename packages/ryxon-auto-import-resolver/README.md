# Ryxon Auto Import Resolver

[English](./README.md) | 简体中文

`@ryxon/auto-import-resolver` 是 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 的一个解析器，用于实现 Ryxon 按需引入。

### 特性

- 支持 `Vite`, `Webpack`, `Rspack`, `Vue CLI`, `Rollup`, `esbuild` 等
- 支持自动引入组件对应的 CSS 样式
- 支持 SSR（服务端渲染）

### 安装

```shell
# via npm
npm i @ryxon/auto-import-resolver unplugin-vue-components -D

# via yarn
yarn add @ryxon/auto-import-resolver unplugin-vue-components -D

# via pnpm
pnpm add @ryxon/auto-import-resolver unplugin-vue-components -D

# via Bun
bun add @ryxon/auto-import-resolver unplugin-vue-components -D
```

## 使用

### Vite

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { RyxonResolver } from '@ryxon/auto-import-resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [RyxonResolver()]
    })
  ]
})
```

### Rollup

```ts
// rollup.config.js
import Components from 'unplugin-vue-components/rollup'
import { RyxonResolver } from '@ryxon/auto-import-resolver'

export default {
  plugins: [
    Components({
      resolvers: [RyxonResolver()]
    })
  ]
}
```

### Webpack

```ts
// webpack.config.js
import Components from 'unplugin-vue-components/webpack'
import { RyxonResolver } from '@ryxon/auto-import-resolver'

module.exports = {
  plugins: [
    Components({
      resolvers: [RyxonResolver()]
    })
  ]
}
```

### Rspack

```ts
// rspack.config.js
import Components from 'unplugin-vue-components/rspack'
import { RyxonResolver } from '@ryxon/auto-import-resolver'

module.exports = {
  plugins: [
    Components({
      resolvers: [RyxonResolver()]
    })
  ]
}
```

### Vue CLI

```ts
// vue.config.js
import Components from 'unplugin-vue-components/webpack'
import { RyxonResolver } from '@ryxon/auto-import-resolver'

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [RyxonResolver()]
      })
    ]
  }
}
```

### esbuild

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Components from 'unplugin-vue-components/esbuild'
import { RyxonResolver } from '@ryxon/auto-import-resolver'

build({
  plugins: [
    Components({
      resolvers: [RyxonResolver()]
    })
  ]
})
```

## 选项

### importStyle

是否自动引用组件对应的样式。

- **Type：** `boolean`
- **Default：** `true`
- **Example：**

```ts
Components({
  resolvers: [
    RyxonResolver({
      // 禁用样式引用
      importStyle: false
    })
  ]
})
```

### module

设置引用的模块类型。

- **Type：** `'esm' | 'cjs'`
- **Default：** `'esm'`
- **Example：**

```ts
Components({
  resolvers: [
    RyxonResolver({
      module: 'cjs'
    })
  ]
})
```

### ssr

- **Type：** `boolean`
- **Default：** `undefined`

此选项已废弃，请使用 `module` 选项来设置模块类型。
