---
title: Upload
lang: zh
---

# Upload 文件上传

通过点击或者拖拽上传文件。目前 Upload 组件不包含将文件上传至服务器的接口逻辑，该步骤需要自行实现。

## 基础用法

:::demo 文件上传完毕后会触发 `after-read` 回调函数，获取到对应的 `file` 对象。

upload/basic

:::

## 文件自动上传

:::demo

upload/auto-upload

:::

## 文件预览

:::demo 通过 `v-model` 可以绑定已经上传的文件列表，并展示文件列表的预览图。

upload/preview

:::

## 上传状态

:::demo 通过 `status` 属性可以标识上传状态，`uploading` 表示上传中，`failed` 表示上传失败，`done` 表示上传完成。

upload/status

:::

## 限制上传数量

:::demo 通过 `max-count` 属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域。

upload/max-count

:::

## 限制上传大小

:::demo 通过 `max-size` 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 `oversize` 事件获取。

upload/max-size

:::

:::demo 如果需要针对不同类型的文件来作出不同的大小限制，可以在 `max-size` 属性中传入一个函数，在函数中通过 `file.type` 区分文件类型，返回 `true` 表示超出限制，`false` 表示未超出限制。

upload/max-size-fun

:::

## 自定义上传样式

:::demo 通过默认插槽可以自定义上传区域的样式。

upload/slots

:::

## 拖拽上传

:::demo 可以将文件拖拽到特定区域以进行上传。

upload/drag

:::

## 手动上传

:::demo

upload/manual

:::

## 自定义预览样式

通过 `preview-cover` 插槽可以自定义覆盖在预览区域上方的内容。

通过 `preview-size` 属性定义预览图和上传区域的大小。将 `preview-size` 设置为数组格式，可以分别设置宽高。数组第一项对应宽度，数组第二项对应高度。

:::demo

upload/preview-cover

:::

## 定义单个图片预览

:::demo 在 `v-model` 数组中设置单个预览图片属性，支持 `imageFit` `deletable` `previewSize` `beforeDelete`。

upload/image-options

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 已上传的文件列表 | `FileListItem[]` | - |
| name | 标识符，通常为一个唯一的字符串或数字，可以在回调函数的第二项参数中获取 | `number \| string` | - |
| accept | 允许上传的文件类型，[详细说明](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#%E9%99%90%E5%88%B6%E5%85%81%E8%AE%B8%E7%9A%84%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B) | `string` | `image/*` |
| capture | 图片选取模式，可选值为 `camera` (直接调起摄像头) | `string` | - |
| multiple | 是否开启图片多选，部分安卓机型不支持 | `boolean` | `false` |
| disabled | 是否禁用文件上传 | `boolean` | `false` |
| readonly | 是否将上传区域设置为只读状态 | `boolean` | `false` |
| lazy-load | 是否开启图片懒加载，须配合 [Lazyload](/zh/api/lazyload.html) 组件使用 | `boolean` | `false` |
| max-count | 文件上传数量限制 | `number \| string` | `Infinity` |
| image-fit | 预览图裁剪模式，可选值见 [Image](/zh/component/image.html#props) 组件 | `string` | `cover` |
| result-type | 文件读取结果类型，可选值为 `file` `text` | `string` | `dataUrl` |
| upload-icon | 上传区域图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | `string` | `photograph` |
| upload-text | 上传区域文字提示 | `string` | - |
| uploading-text | 上传中文字提示 | `string` | `上传中...` |
| failed-text | 上传失败文字提示 | `string` | `上传失败` |
| deletable | 是否展示删除按钮 | `boolean` | `true` |
| show-upload | 是否展示上传区域 | `boolean` | `true` |
| preview-size | 预览图和上传区域的尺寸，默认单位为 `px` | `number \| string \| Array` | `80px` |
| preview-image | 是否在上传完成后展示预览图 | `boolean` | `true` |
| preview-options | 全屏图片预览的配置项，可选值见 [ImagePreview](/zh/component/image-preview.html#imagepreviewoptions) | `object` | - |
| preview-full-image | 是否在点击预览图后展示全屏图片预览 | `boolean` | `true` |
| max-size | 文件大小限制，单位为 `byte` | `number \| string \| (file: File) => boolean` | `Infinity` |
| drag | 是否启用拖拽上传 | `boolean` | `false` |
| auto-upload | 是否自动上传文件 | `boolean` | `true` |
| action | 请求 URL | `string` | `#` |
| http-request | 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求 | `(options: UploadRequestOptions) => XMLHttpRequest \| Promise<unknown>` | `-` |
| headers | 设置上传的请求头部 | `Headers \| Record<string, any>` | - |
| method | 设置上传请求方法 | `string` | `post` |
| filename | 上传的文件字段名 | `string` | `file` |
| data | 上传时附带的额外参数 | `Record<string, any>` | - |
| with-credentials | 支持发送 cookie 凭证信息 | `boolean` | `false` |
| before-read | 文件读取前的回调函数，返回 `false` 可终止文件读取，支持返回 `Promise` | `(items, detail) => void` | - |
| after-read | 文件读取完成后的回调函数 | `(items, detail) => void` | - |
| before-delete | 文件删除前的回调函数，返回 `false` 可终止文件读取，支持返回 `Promise` | `(items, detail) => void` | - |
| on-remove | 文件列表移除文件时的钩子 | `(uploadFile: UploadFile) => void` | - |
| on-change | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | - |
| on-progress | 文件上传时的钩子 | `(evt: UploadProgressEvent, uploadFile: UploadFile) => void` | - |
| on-success | 文件上传成功时的钩子 | `(response: any, uploadFile: UploadFile) => void` | - |
| on-error | 文件上传失败时的钩子 | `(error: Error, uploadFile: UploadFile) => void` | - |

> 注意：accept、capture 和 multiple 为浏览器 input 标签的原生属性，移动端各种机型对这些属性的支持程度有所差异，因此在不同机型和 WebView 下可能出现一些兼容性问题。

### Events

| 事件名        | 说明                   | 回调参数            |
| ------------- | ---------------------- | ------------------- |
| oversize      | 文件大小超过限制时触发 | 同 `after-read`     |
| click-upload  | 点击上传区域时触发     | `event: MouseEvent` |
| click-preview | 点击预览图时触发       | 同 `after-read`     |
| close-preview | 关闭全屏图片预览时触发 | -                   |
| delete        | 删除文件预览时触发     | 同 `after-read`     |

### Slots

| 名称           | 说明                           | 参数                 |
| -------------- | ------------------------------ | -------------------- |
| default        | 自定义上传区域                 | -                    |
| preview-file   | 自定义文件预览区域展示形式     | -                    |
| preview-delete | 自定义删除按钮                 | -                    |
| preview-cover  | 自定义覆盖在预览区域上方的内容 | `item: FileListItem` |

### ResultType 可选值

`result-type` 字段表示文件读取结果的类型，上传大文件时，建议使用 file 类型，避免卡顿。

| 值      | 描述                                           |
| ------- | ---------------------------------------------- |
| file    | 结果仅包含 File 对象                           |
| text    | 结果包含 File 对象，以及文件的文本内容         |
| dataUrl | 结果包含 File 对象，以及文件对应的 base64 编码 |

### 方法

通过 ref 可以获取到 Upload 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| abort | 取消上传请求 | `(file: UploadFile) => void` | - |
| submit | 手动上传文件列表 | `() => void` | - |
| closeImagePreview | 关闭全屏的图片预览 | - | - |
| chooseFile | 主动调起文件选择，由于浏览器安全限制，只有在用户触发操作的上下文中调用才有效 | - | - |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  UploadProps,
  UploadInstance,
  UploadResultType,
  UploadFileListItem
} from 'ryxon'
```

`UploadInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { UploadInstance } from 'ryxon'

const uploadRef = ref<UploadInstance>()

uploadRef.value?.chooseFile()
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                | 默认值                       | 描述 |
| ----------------------------------- | ---------------------------- | ---- |
| --r-upload-size                     | `80px`                       | -    |
| --r-upload-icon-size                | `24px`                       | -    |
| --r-upload-icon-color               | `var(--r-gray-4)`            | -    |
| --r-upload-text-color               | `var(--r-text-color-2)`      | -    |
| --r-upload-text-font-size           | `var(--r-font-size-sm)`      | -    |
| --r-upload-upload-background        | `var(--r-gray-1)`            | -    |
| --r-upload-upload-active-color      | `var(--r-active-color)`      | -    |
| --r-upload-delete-color             | `var(--r-white)`             | -    |
| --r-upload-delete-icon-size         | `14px`                       | -    |
| --r-upload-delete-background        | `rgba(0, 0, 0, 0.7)`         | -    |
| --r-upload-file-background          | `var(--r-background)`        | -    |
| --r-upload-file-icon-size           | `20px`                       | -    |
| --r-upload-file-icon-color          | `var(--r-gray-7)`            | -    |
| --r-upload-file-name-padding        | `0 var(--r-padding-base)`    | -    |
| --r-upload-file-name-margin-top     | `var(--r-padding-xs)`        | -    |
| --r-upload-file-name-font-size      | `var(--r-font-size-sm)`      | -    |
| --r-upload-file-name-text-color     | `var(--r-gray-7)`            | -    |
| --r-upload-mask-text-color          | `var(--r-white)`             | -    |
| --r-upload-mask-background          | `fade(var(--r-gray-8), 88%)` | -    |
| --r-upload-mask-icon-size           | `22px`                       | -    |
| --r-upload-mask-message-font-size   | `var(--r-font-size-sm)`      | -    |
| --r-upload-mask-message-line-height | `var(--r-line-height-xs)`    | -    |
| --r-upload-loading-icon-size        | `22px`                       | -    |
| --r-upload-loading-icon-color       | `var(--r-white)`             | -    |
| --r-upload-disabled-opacity         | `var(--r-disabled-opacity)`  | -    |
| --r-upload-border-radius            | `0px`                        | -    |

## 常见问题

### Upload 在部分安卓机型上无法上传图片？

Upload 采用了 HTML 原生的 `<input type="file />` 标签进行上传，能否上传取决于当前系统和浏览器的兼容性。当遇到无法上传的问题时，一般有以下几种情况：

1. 遇到了安卓 App WebView 的兼容性问题，需要在安卓原生代码中进行兼容，可以参考此[文章](https://blog.csdn.net/qq_32756581/article/details/112861088)。
2. 图片格式不正确，在当前系统/浏览器中无法识别，比如 `webp` 或 `heic` 格式。
3. 其他浏览器兼容性问题。

### 拍照上传的图片被旋转 90 度？

部分手机在拍照上传时会出现图片被旋转 90 度的问题，这个问题可以通过 [compressorjs](https://github.com/fengyuanchen/compressorjs) 或其他开源库进行处理。

compressorjs 是一个开源的图片处理库，提供了图片压缩、图片旋转等能力。

#### 示例

使用 compressorjs 进行处理的示例代码如下:

```html
<r-upload :before-read="beforeRead" />
```

```js
import Compressor from 'compressorjs'

export default {
  setup() {
    const beforeRead = (file) =>
      new Promise((resolve) => {
        // compressorjs 默认开启 checkOrientation 选项
        // 会将图片修正为正确方向
        new Compressor(file, {
          success: resolve,
          error(err) {
            console.log(err.message)
          }
        })
      })

    return {
      beforeRead
    }
  }
}
```

### 上传图片时出现浏览器刷新或卡顿现象？

这种现象一般是内存不足导致的，通常发生在旧机型上；上传一张较大的图片引起也引起此现象。

为了减少这种情况的出现，可以在上传图片前对图片进行压缩，压缩方法请参考上文中提到的 `compressorjs` 库。

### 上传 HEIC/HEIF 格式的图片后无法展示？

目前 Chrome、Safari 等浏览器不支持展示 HEIC/HEIF 格式的图片，因此上传后无法在 Upload 组件中进行预览。

[HEIF] 格式的兼容性请参考 [caniuse](https://caniuse.com/?search=heic)。

### 如何判断用户授予了摄像头权限？

在上传图片时，如果用户没有授予当前 App 摄像头权限，会导致 Uploader 组件无法使用。

你可以通过浏览器提供的 [getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) 方法来判断是否被授予了摄像头权限（请留意 `getUserMedia` 方法无法在 iOS 10 中使用）。

以下是一个简化的示例：

```ts
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    console.log(stream)
  })
  .catch((err) => {
    console.log(err)
  })
```
