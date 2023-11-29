---
title: 快速开始
lang: zh
---

# 快速开始

## 全局注册

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```js
import { createApp } from 'vue'
// 1. 引入你需要的组件
import { Button } from 'ryxon'
// 2. 引入组件样式
import 'ryxon/lib/index.css'

const app = createApp()

// 3. 注册你需要的组件

// 方式一. 通过 app.use 注册
// 注册完成后，在模板中通过 <r-button> 或 <RButton> 标签来使用按钮组件
app.use(Button)

// 方式二. 通过 app.component 注册
// 注册完成后，在模板中通过 <r-button> 标签来使用按钮组件
app.component(Button.name, Button)
```

> Ryxon 默认支持 Tree Shaking，因此你不需要配置任何插件，通过 Tree Shaking 即可移除不需要的 JS 代码，但 CSS 样式无法通过这种方式优化，如果需要按需引入 CSS 样式，请参考下面的按需引入组件。

## 按需引入

在基于 `vite`、`webpack` 或 `vue-cli` 的项目中使用 Ryxon 时，可以使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件，它可以自动引入组件，并按需引入组件的样式。

相比于全局注册，这种方式可以按需引入组件的 CSS 样式，从而减少一部分代码体积，但使用起来会变得繁琐一些。如果业务对 CSS 的体积要求不是特别极致，推荐使用更简便的全局注册。

### 1. 安装插件

```bash
# 通过 npm 安装
npm i unplugin-vue-components -D

# 通过 yarn 安装
yarn add unplugin-vue-components -D

# 通过 pnpm 安装
pnpm add unplugin-vue-components -D

# 通过 bun 安装
bun add unplugin-vue-components -D
```

### 2. 配置插件

公共方法

```js
const isSSR = false
const moduleType = isSSR ? 'lib' : 'es'

function getSideEffects(dirName, options) {
  const { importStyle = true } = options

  if (!importStyle || isSSR) return

  if (importStyle === 'less') return `ryxon/${moduleType}/${dirName}/style/less`

  if (importStyle === 'css') return `ryxon/${moduleType}/${dirName}/style/index`

  return `ryxon/${moduleType}/${dirName}/style/index`
}

function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}
```

如果是基于 `vite` 的项目，在 `vite.config.js` 文件中配置插件：

```js
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 导入 Ryxon
        (componentName) => {
          // where `componentName` is always CapitalCase
          if (componentName.startsWith('R'))
            return {
              name: componentName.slice(1),
              from: `ryxon/${moduleType}`,
              sideEffects: getSideEffects(kebabCase(componentName.slice(1)), {})
            }
        }
      ]
    })
  ]
}
```

如果是基于 `vue-cli` 的项目，在 `vue.config.js` 文件中配置插件：

```js
const ComponentsPlugin = require('unplugin-vue-components/webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [
          // 导入 Ryxon
          (componentName) => {
            // where `componentName` is always CapitalCase
            if (componentName.startsWith('R'))
              return {
                name: componentName.slice(1),
                from: `ryxon/${moduleType}`,
                sideEffects: getSideEffects(
                  kebabCase(componentName.slice(1)),
                  {}
                )
              }
          }
        ]
      })
    ]
  }
}
```

如果是基于 `webpack` 的项目，在 `webpack.config.js` 文件中配置插件：

```js
const ComponentsPlugin = require('unplugin-vue-components/webpack')

module.exports = {
  plugins: [
    ComponentsPlugin({
      resolvers: [
        // 导入 Ryxon
        (componentName) => {
          // where `componentName` is always CapitalCase
          if (componentName.startsWith('R'))
            return {
              name: componentName.slice(1),
              from: `ryxon/${moduleType}`,
              sideEffects: getSideEffects(kebabCase(componentName.slice(1)), {})
            }
        }
      ]
    })
  ]
}
```

### 3. 使用组件

完成以上两步，就可以直接在模板中使用 Ryxon 组件了，`unplugin-vue-components` 会解析模板并自动注册对应的组件。

```html
<template>
  <r-button type="primary" />
</template>
```

### 4. 引入函数组件的样式

Ryxon 中有个别组件是以函数的形式提供的，包括 `showMessage`，`Dialog`，`Notify` 和 `ImagePreview` 组件。在使用函数组件时，`unplugin-vue-components` 无法自动引入对应的样式，因此需要手动引入样式。

```js
// showMessage
import { showMessage } from 'ryxon'
import 'ryxon/es/message/style'

// Dialog
import { showDialog } from 'ryxon'
import 'ryxon/es/dialog/style'

// Notify
import { showNotify } from 'ryxon'
import 'ryxon/es/notify/style'

// ImagePreview
import { showImagePreview } from 'ryxon'
import 'ryxon/es/image-preview/style'
```

你可以在项目的入口文件或公共模块中引入以上组件的样式，这样在业务代码中使用组件时，便不再需要重复引入样式了。

## 局部注册

局部注册后，你可以在当前组件中使用注册的 Ryxon 组件。

```js
import { Button } from 'ryxon'

export default {
  components: {
    [Button.name]: Button
  }
}
```

> 对于组件注册更详细的介绍，请参考 [Vue 官方文档 - 组件注册](https://cn.vuejs.org/guide/components/registration.html)。

### \<script setup\>

在 `<script setup>` 中可以直接使用 Ryxon 组件，不需要进行组件注册。

```xml
<script setup>
  import { Button } from 'ryxon';
</script>

<template>
  <Button />
</template>
```

### JSX/TSX

在 JSX 和 TSX 中可以直接使用 Ryxon 组件，不需要进行组件注册。

```jsx
import { Button } from 'ryxon'

export default {
  render() {
    return <Button />
  }
}
```

## nuxt3 中使用

在 Nuxt 3 中使用 Ryxon 时，由于 Nuxt 3 框架本身的限制，需要在 `nuxt.config.ts` 中添加以下配置：

```ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  experimental: {
    externalVue: true
  }
})
```

关于该问题的背景，可以参考以下 issue：

- [nuxt/framework#6761](https://github.com/nuxt/framework/issues/6761)
- [nuxt/framework#4084](https://github.com/nuxt/framework/issues/4084)

## 使用注意

- 请避免同时使用「全局注册」和「按需引入」这两种引入方式，否则会导致代码重复、样式错乱等问题。
- unplugin-vue-components 并不是 Ryxon 官方维护的插件，如果在使用过程中遇到问题，建议优先到 [antfu/unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 仓库下反馈。

## babel-plugin-import

Ryxon 不支持 `babel-plugin-import`。

移除 `babel-plugin-import` 有以下收益：

- 不再强依赖 babel，项目可以使用 esbuild、swc 等更高效的编译工具，大幅度提升编译效率。
- 不再受到 `babel-plugin-import` 的 import 写法限制，可以从 ryxon 中导入除了组件以外的其他内容，比如 Ryxon 中新增的 `showMessage` 等方法：

```ts
import { showMessage, showDialog } from 'ryxon'
```
