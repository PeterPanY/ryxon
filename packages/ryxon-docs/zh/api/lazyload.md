---
title: Lazyload
lang: zh
---

# Lazyload 懒加载

当页面需要加载大量内容时，使用懒加载可以实现延迟加载页面可视区域外的内容，从而使页面加载更流畅。

## 引入

通过以下方式来全局注册组件，更多注册方式请参考 `组件注册`

`Lazyload` 是 `Vue` 指令，使用前需要对指令进行注册。

```js
import { createApp } from 'vue'
import { Lazyload } from 'ryxon'

const app = createApp()
app.use(Lazyload)

// 注册时可以配置额外的选项
app.use(Lazyload, {
  lazyComponent: true
})
```

## 基础用法

将 `v-lazy` 指令的值设置为你需要懒加载的图片。

```html
<template>
  <img v-for="img in imageList" v-lazy="img" />
</template>

<script setup>
  const imageList = [
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  ]
</script>
```

## 背景图懒加载

和图片懒加载不同，背景图懒加载需要使用 `v-lazy:background-image`，值设置为背景图片的地址，需要注意的是必须声明容器高度。

```html
<template>
  <div v-for="img in imageList" v-lazy:background-image="img" />
</template>

<script setup>
  const imageList = [
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  ]
</script>
```

## 组件懒加载

将需要懒加载的组件放在 `lazy-component` 标签中，即可实现组件懒加载。

```js
// 注册时设置`lazyComponent`选项
app.use(Lazyload, {
  lazyComponent: true
})
```

```html
<template>
  <lazy-component>
    <img v-for="img in imageList" v-lazy="img" />
  </lazy-component>
</template>

<script setup>
  const imageList = [
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  ]
</script>
```

## API

### Options

| 参数          | 说明             | 类型       | 默认值     |
| ------------- | ---------------- | ---------- | ---------- |
| loading       | 加载时的图片     | `string`   | -          |
| error         | 错误时的图片     | `string`   | -          |
| preLoad       | 预加载高度的比例 | `string`   | -          |
| attempt       | 尝试次数         | `number`   | `3`        |
| listenEvents  | 监听的事件       | `string[]` | `scroll`等 |
| adapter       | 适配器           | `object`   | -          |
| filter        | 图片 URL 过滤    | `object`   | -          |
| lazyComponent | 是否能懒加载模块 | `boolean`  | `false`    |

> 更多内容请参照：[vue-lazyload 官方文档](https://github.com/hilongjw/vue-lazyload)

## 常见问题

### 通过 CDN 引入 Ryxon 时，没有自动注册 Lazyload 组件？

由于 Lazyload 组件在注册时可以传入一些配置项，所以我们不会自动注册 Lazyload 组件，需要手动进行注册：

```js
const app = Vue.createApp()

app.use(ryxon.Lazyload, {
  lazyComponent: true
})
```
