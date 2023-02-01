# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue'
import { Toast } from 'ryxon'

const app = createApp()
app.use(Toast)
```

### 函数调用

为了便于使用 `Toast`，Ryxon 提供了一系列辅助函数，通过辅助函数可以快速唤起全局的 Toast 组件。

比如使用 `showToast` 函数，调用后会直接在页面中渲染对应的轻提示。

```js
import { showToast } from 'ryxon'

showToast('提示内容')
```

## 代码演示

### 文字提示

```js
import { showToast } from 'ryxon'

showToast('提示内容')
```

### 加载提示

使用 `showLoadingToast` 方法展示加载提示，通过 `forbidClick` 选项可以禁用背景点击。

```js
import { showLoadingToast } from 'ryxon'

showLoadingToast({
  message: '加载中...',
  forbidClick: true
})
```

### 成功/失败提示

使用 `showSuccessToast` 方法展示成功提示，使用 `showFailToast` 方法展示失败提示。

```js
import { showSuccessToast, showFailToast } from 'ryxon'

showSuccessToast('成功文案')
showFailToast('失败文案')
```

### 自定义图标

通过 `icon` 选项可以自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props)。

```js
import { showToast } from 'ryxon'

showToast({
  message: '自定义图标',
  icon: 'like-o'
})

showToast({
  message: '自定义图片',
  icon: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/logo.png'
})
```

通过`loadingType` 属性可以自定义加载图标类型。

```js
import { showLoadingToast } from 'ryxon'

showLoadingToast({
  message: '加载中...',
  forbidClick: true,
  loadingType: 'spinner'
})
```

### 自定义位置

Toast 默认渲染在屏幕正中位置，通过 `position` 属性可以控制 Toast 展示的位置。

```js
import { showToast } from 'ryxon'

showToast({
  message: '顶部展示',
  position: 'top'
})

showToast({
  message: '底部展示',
  position: 'bottom'
})
```

### 文字换行方式

通过 `wordBreak` 选择可以控制 Toast 中的文字过长时的截断方式，默认值为 `break-all`，可选值为 `break-word` 和 `normal`。

```js
import { showToast } from 'ryxon'

// 换行时截断单词
showToast({
  message: 'This message will contain a incomprehensibilities long word.',
  wordBreak: 'break-all'
})

// 换行时不截断单词
showToast({
  message: 'This message will contain a incomprehensibilities long word.',
  wordBreak: 'break-word'
})
```

### 动态更新提示

执行 Toast 方法时会返回对应的 Toast 实例，通过修改实例上的 `message` 属性可以实现动态更新提示的效果。

```js
import { showLoadingToast, closeToast } from 'ryxon'

const toast = showLoadingToast({
  duration: 0,
  forbidClick: true,
  message: '倒计时 3 秒'
})

let second = 3
const timer = setInterval(() => {
  second--
  if (second) {
    toast.message = `倒计时 ${second} 秒`
  } else {
    clearInterval(timer)
    closeToast()
  }
}, 1000)
```

### 单例模式

Toast 默认采用单例模式，即同一时间只会存在一个 Toast，如果需要在同一时间弹出多个 Toast，可以参考下面的示例：

```js
import { showToast, showSuccessToast, allowMultipleToast } from 'ryxon'

allowMultipleToast()

const toast1 = showToast('第一个 Toast')
const toast2 = showSuccessToast('第二个 Toast')

toast1.close()
toast2.close()
```

### 修改默认配置

通过 `setToastDefaultOptions` 函数可以全局修改 `showToast` 等方法的默认配置。

```js
import { setToastDefaultOptions, resetToastDefaultOptions } from 'ryxon'

setToastDefaultOptions({ duration: 2000 })

setToastDefaultOptions('loading', { forbidClick: true })

resetToastDefaultOptions()

resetToastDefaultOptions('loading')
```

### 使用 Toast 组件

如果需要在 Toast 内嵌入组件或其他自定义内容，可以直接使用 Toast 组件，并使用 message 插槽进行定制。使用前需要通过 `app.use` 等方式注册组件。

```html
<r-toast v-model:show="show" style="padding: 0">
  <template #message>
    <r-image :src="image" width="200" height="140" style="display: block" />
  </template>
</r-toast>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(false)
    return { show }
  }
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-toast-max-width | _70%_ | - |
| --r-toast-font-size | _var(--r-font-size-md)_ | - |
| --r-toast-text-color | _var(--r-white)_ | - |
| --r-toast-loading-icon-color | _var(--r-white)_ | - |
| --r-toast-line-height | _var(--r-line-height-md)_ | - |
| --r-toast-radius | _var(--r-radius-lg)_ | - |
| --r-toast-background | _fade(var(--r-black), 70%)_ | - |
| --r-toast-icon-size | _36px_ | - |
| --r-toast-text-min-width | _96px_ | - |
| --r-toast-text-padding | _var(--r-padding-xs) var(--r-padding-sm)_ | - |
| --r-toast-default-padding | _var(--r-padding-md)_ | - |
| --r-toast-default-width | _88px_ | - |
| --r-toast-default-min-height | _88px_ | - |
| --r-toast-position-top-distance | _20%_ | - |
| --r-toast-position-bottom-distance | _20%_ | - |

## 常见问题

### 引用 showToast 时出现编译报错？

如果引用 `showToast` 方法时出现以下报错，说明项目中使用了 `babel-plugin-import` 插件，导致代码被错误编译。

```bash
These dependencies were not found:

* ryxon/es/show-toast in ./src/xxx.js
* ryxon/es/show-toast/style in ./src/xxx.js
```

Ryxon 从 4.0 版本开始不再支持 `babel-plugin-import` 插件，请参考 [迁移指南](#/zh-CN/migrate-from-v3#yi-chu-babel-plugin-import) 移除该插件。
