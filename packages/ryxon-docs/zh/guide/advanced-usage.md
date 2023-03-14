---
title: 进阶用法
lang: zh
---

# 进阶用法

## 组件插槽

Ryxon 提供了丰富的组件插槽，通过插槽可以对组件的某一部分进行个性化定制。如果你对 Vue 的插槽不太熟悉，可以阅读 Vue 官方文档中的[插槽章节](https://v3.cn.vuejs.org/guide/component-slots.html)。下面是通过插槽来定制 Checkbox 图标的示例：

```html
<r-checkbox v-model="checked">
  <!-- 使用组件提供的 icon 插槽 -->
  <!-- 将默认图标替换为个性化图片 -->
  <template #icon="props">
    <img :src="props.checked ? activeIcon : inactiveIcon" />
  </template>
</r-checkbox>
```

```js
export default {
  data() {
    return {
      checked: true,
      activeIcon:
        'https://fastly.jsdelivr.net/npm/@ryxon/assets/user-active.png',
      inactiveIcon:
        'https://fastly.jsdelivr.net/npm/@ryxon/assets/user-inactive.png'
    }
  }
}
```

## 组件实例方法

Ryxon 中的许多组件提供了实例方法，调用实例方法时，我们需要通过 [ref](https://v3.cn.vuejs.org/guide/component-template-refs.html) 来注册组件引用信息，引用信息将会注册在父组件的`$refs`对象上。注册完成后，我们可以通过`this.$refs.xxx`访问到对应的组件实例，并调用上面的实例方法。

```html
<!-- 通过 ref 属性将组件绑定到 this.$refs.checkbox 上 -->
<r-checkbox v-model="checked" ref="checkbox"> 复选框 </r-checkbox>
```

```js
export default {
  data() {
    return {
      checked: false
    }
  },
  // 注意：组件挂载后才能访问到 ref 对象
  mounted() {
    this.$refs.checkbox.toggle()
  }
}
```

## Viewport 布局

Ryxon 默认使用 `px` 作为样式单位，如果需要使用 `viewport` 单位 (vw, vh, vmin, vmax)，推荐使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 进行转换。

[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位。

### PostCSS PostCSS 示例配置

下面提供了一份基本的 PostCSS 示例配置，可以在此配置的基础上根据项目需求进行修改。

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}
```

> Tips: 在配置 postcss-loader 时，应避免 ignore node_modules 目录，否则将导致 Ryxon 样式无法被编译。

## Rem 布局适配

如果需要使用 `rem` 单位进行适配，推荐使用以下两个工具：

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

### PostCSS 示例配置

下面提供了一份基本的 PostCSS 示例配置，可以在此配置的基础上根据项目需求进行修改。

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

> Tips: 在配置 postcss-pxtorem 时，同样应避免 ignore node_modules 目录，否则会导致 Ryxon 样式无法被编译。

### 其他设计稿尺寸

如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 `rootValue` 配置调整为:

```js
// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('ryxon') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
```

## 底部安全区适配

iPhone X 等机型底部存在底部指示条，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行安全区适配。Ryxon 中部分组件提供了 `safe-area-inset-top` 或 `safe-area-inset-bottom` 属性，设置该属性后，即可在对应的机型上开启适配，如下示例：

```html
<!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>

<!-- 开启顶部安全区适配 -->
<r-nav-bar safe-area-inset-top />

<!-- 开启底部安全区适配 -->
<r-number-keyboard safe-area-inset-bottom />
```

<img src="https://fastly.jsdelivr.net/npm/@ryxon/assets/safearea.png">
