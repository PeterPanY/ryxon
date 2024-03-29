---
title: useWindowSize
lang: zh
---

# useWindowSize

获取浏览器窗口的视口宽度和高度，并在窗口大小变化时自动更新。

## 基本用法

```js
import { watch } from 'vue'
import { useWindowSize } from '@ryxon/use'

export default {
  setup() {
    const { width, height } = useWindowSize()

    console.log(width.value) // -> 窗口宽度
    console.log(height.value) // -> 窗口高度

    watch([width, height], () => {
      console.log('window resized')
    })
  }
}
```

## API

### 类型定义

```ts
function useWindowSize(): {
  width: Ref<number>
  height: Ref<number>
}
```

### 返回值

| 参数   | 说明           | 类型           |
| ------ | -------------- | -------------- |
| width  | 浏览器窗口宽度 | `Ref\<number>` |
| height | 浏览器窗口高度 | `Ref\<number>` |
