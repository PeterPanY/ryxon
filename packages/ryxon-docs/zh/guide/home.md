---
title: 介绍
lang: zh
---

# 介绍

Ryxon 是一个**轻量、可定制的组件库**

Ryxon 支持了**深色模式**

## 支持深色模式

**Ryxon 支持切换所有组件为深色模式。**

只需要把 [ConfigProvider 组件](/zh/component/config-provider.html)的 `theme` 属性设置为 `dark`，即可切换为深色模式，将页面上的所有 Ryxon 组件变成深色风格。

```html
<r-config-provider theme="dark">
  <!-- child components -->
</r-config-provider>
```

Ryxon 文档也已支持切换为深色模式。

## 按需引入方式

**Ryxon 不再使用 babel-plugin-import 实现按需引入。**

在早期，组件库大多使用 `babel-plugin-import` 实现按需引入，这意味着组件库会强依赖 Babel 编译。从 Ryxon 开始，将不再支持 `babel-plugin-import`，主要带来以下收益：

- 不再强依赖 Babel 编译，项目可以使用 SWC、esbuild 等现代编译工具，进而提升编译效率。

- 不再受到 `babel-plugin-import` 的 import 限制，可以从 Ryxon 中导入除组件以外的内容，比如 Ryxon 中新增的 `showMessage` 方法，或是 `buttonProps` 对象：

```ts
import { showMessage, buttonProps } from 'ryxon'
```

在包体积方面，移除 `babel-plugin-import` 对项目的 JS 体积不会有影响，因为 Ryxon 默认支持通过 Tree Shaking 来移除不需要的 JS 代码，而 CSS 代码可以通过 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 插件实现按需引入，详细用法请参考 [「快速开始」](/zh/guide/quickstart.html#按需引入)。
