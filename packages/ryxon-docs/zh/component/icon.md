---
title: Icon
lang: zh
---

# Icon

Ryxon 常用图标集合

## 安装

### 使用包管理器

```shell
# NPM
$ npm install @ryxon/icons
# Yarn
$ yarn add @ryxon/icons
# pnpm
$ pnpm install @ryxon/icons
```

### 注册所有图标（不推荐）

需要从 `@ryxon/icons` 中导入所有图标并进行全局注册。

```ts
// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as RyxonIconsVue from '@ryxon/icons'

const app = createApp(App)
for (const [key, component] of Object.entries(RyxonIconsVue)) {
  app.component(key, component)
}
```

### 浏览器直接引入

直接通过浏览器的 HTML 标签导入 Ryxon，然后就可以使用全局变量 `RyxonIconsVue` 了。

根据不同的 CDN 提供商有不同的引入方式， 根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 [unpkg](https://unpkg.com) 和 [jsDelivr](https://jsdelivr.com) 举例。 你也可以使用其它的 CDN 供应商

#### unpkg

```html
<script src="//unpkg.com/@ryxon/icons"></script>
```

#### jsDelivr

```html
<script src="//cdn.jsdelivr.net/npm/@ryxon/icons"></script>
```

:::tip

我们建议使用 CDN 引入 Ryxon 的用户在链接地址上锁定版本，以免将来 Ryxon 升级时受到非兼容性更新的影响。 锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。

:::

### 自动导入

使用 [unplugin-icons](https://github.com/antfu/unplugin-icons) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 从 iconify 中自动导入任何图标集。

```ts
// vite.config.ts

// 待补充
```

## 使用

:::warning

因为 HTML 标准已经定义了一个名为 [menu](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) 的标签， 如果您注册的 `menu` 无法正常工作，您需要使用别名来渲染图标。

:::

```vue
<!-- 使用 r-icon 为 SVG 图标提供属性 -->
<template>
  <div>
    <r-icon :size="size" :color="color">
      <Edit />
    </r-icon>
    <!-- 或者独立使用它，不从父级获取属性 -->
    <Edit />
  </div>
</template>
```

:::demo 展示

icon/basic

:::

## 结合 r-icon 使用

`r-icon` 为 raw SVG 图标提供额外的属性, 提供的详细属性。

:::demo 通过添加额外的类名 `is-loading`，你的图标就可以在 2 秒内旋转 360 度，当然你也可以自己改写想要的动画。

icon/attribute

:::

## 直接使用 SVG 图标

:::demo

icon/svg

:::

## 图标集合

<IconList />

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图片链接 | `string` | - |
| dot | 是否显示图标右上角小红点 | `boolean` | `false` |
| badge | 图标右上角徽标的内容 | `number` / `string` | - |
| badge-props | 自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props | `BadgeProps` | - |
| color | svg 的 fill 颜色 | `string` | `inherit` |
| size | SVG 图标的大小，如 20px 2em，默认单位为 px | `number` / `string` | `inherit` |
| class-prefix | 类名前缀，用于使用自定义图标 | `string` | `r-icon` |
| tag | 根节点对应的 HTML 标签名 | `string` | `i` |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
