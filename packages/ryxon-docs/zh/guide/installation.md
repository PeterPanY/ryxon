---
title: 安装
lang: zh
---

# 安装

## Compatibility

Ryxon 可以在支持 [ES2018](https://caniuse.com/?feats=mdn-javascript_builtins_regexp_dotall,mdn-javascript_builtins_regexp_lookbehind_assertion,mdn-javascript_builtins_regexp_named_capture_groups,mdn-javascript_builtins_regexp_property_escapes,mdn-javascript_builtins_symbol_asynciterator,mdn-javascript_functions_method_definitions_async_generator_methods,mdn-javascript_grammar_template_literals_template_literal_revision,mdn-javascript_operators_destructuring_rest_in_objects,mdn-javascript_operators_spread_spread_in_destructuring,promise-finally) 和 [ResizeObserver](https://caniuse.com/resizeobserver) 的浏览器上运行。 如果您确实需要支持旧版本的浏览器，请自行添加 [Babel](https://babeljs.io/) 和相应的 Polyfill

由于 Vue 3 不再支持 IE11，Ryxon 也不再支持 IE 浏览器。

| IE        | Firefox      | Chrome      | Safari      |
| --------- | ------------ | ----------- | ----------- |
| Edge ≥ 79 | Firefox ≥ 78 | Chrome ≥ 64 | Safari ≥ 12 |

### 版本

Ryxon 目前还处于快速开发迭代中。

[Ryxon version badge](https://www.npmjs.com/package/ryxon)

## 使用包管理器

**建议您使用包管理器 (NPM, [Yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/), bun) 安装 Ryxon**, 然后您就可以使用打包工具，例如 [Vite](https://vitejs.dev) 或 [webpack](https://webpack.js.org/).

```shell
# 选择一个你喜欢的包管理器.

# NPM
$ npm install ryxon --save

# Yarn
$ yarn add ryxon

# pnpm
$ pnpm install ryxon

# bun
$ bun add ryxon
```

如果您的网络环境不好，建议使用相关镜像服务 [cnpm](https://github.com/cnpm/cnpm) 或 [Alibaba](https://registry.npmmirror.com/).

## 通过 CDN 安装

如果你只需要开发一个简单的 HTML 页面，那么可以直接在 HTML 文件中引入 CDN 链接，之后你可以通过全局变量 `ryxon` 访问到所有组件。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 [unpkg](https://unpkg.com) 和 [jsDelivr](https://jsdelivr.com) 举例。 你也可以使用其它的 CDN 供应商。

### unpkg

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/ryxon/lib/index.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="//unpkg.com/ryxon"></script>
</head>

<script>
  // 在 #app 标签下渲染一个按钮组件
  const app = Vue.createApp({
    template: `<r-button>按钮</r-button>`
  })
  app.use(ryxon)

  // 通过 CDN 引入时不会自动注册 Lazyload 组件
  // 可以通过下面的方式手动注册
  app.use(ryxon.Lazyload)

  // 调用工具函数，弹出一个 Message
  ryxon.showMessage('提示')

  app.mount('#app')
</script>
```

### jsDelivr

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/ryxon/lib/index.css" />
  <!-- Import Vue 3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- Import component library -->
  <script src="//cdn.jsdelivr.net/npm/ryxon"></script>
</head>

<script>
  // 在 #app 标签下渲染一个按钮组件
  const app = Vue.createApp({
    template: `<r-button>按钮</r-button>`
  })
  app.use(ryxon)

  // 通过 CDN 引入时不会自动注册 Lazyload 组件
  // 可以通过下面的方式手动注册
  app.use(ryxon.Lazyload)

  // 调用工具函数，弹出一个 Message
  ryxon.showMessage('提示')

  app.mount('#app')
</script>
```

:::tip

1. 建议使用 CDN 引入 Ryxon 的用户在链接地址上锁定版本，以免将来 Ryxon 升级时受到非兼容性更新的影响。 锁定版本的方法请查看 [unpkg.com](https://unpkg.com) 。

2. 注意：免费 CDN 一般用于制作原型或个人小型项目，不推荐在企业生产环境中使用免费 CDN。

3. 对于企业开发者，建议使用以下方式：
   - 通过 npm 引入，并通过构建工具进行打包
   - 下载对应文件，并托管在你自己的服务器或 CDN 上

:::
