---
title: useIsMounted
lang: zh
---

# useIsMounted

判断vue是否进入onMounted钩子函数

## 基本用法

```js
import { watch } from 'vue'
import { useIsMounted } from '@ryxon/use'

export default {
  setup() {
    const isMountedRef = useIsMounted()

    watch(isMountedRef, (value) => {
      console.log('useIsMounted: ', value)
    })
  }
}
```

## 类型定义

```ts
function isMounted(): Readonly<Ref<Boolean>>
```
