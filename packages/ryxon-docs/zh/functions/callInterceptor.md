---
title: interceptor
lang: zh
---

# interceptor

Promise、获取方法return后的回调拦截器

## 添加版本

1.1.0

## 使用

```html
<script setup>
  import { ref } from 'vue'
  import { callInterceptor } from '@ryxon/utils'

  const loading = ref(true)

  callInterceptor(
    () => {
      return new promise((resolve, reject) => {
        resolve(true)
      })
    },
    {
      done() {
        loading.value = false
      },
      canceled() {
        loading.value = false
      }
    }
  )
</script>
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| interceptor | 用来调用的函数 | `Promise<boolean> \| boolean \| undefined \| void` | - |
| options | 可选的配置项 | `Options` | 见下表 |

### Options

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- |
| args | interceptor函数的参数 | `unknown[]` | `否` |  |
| done | 返回了true 或者Promise中为true | `() => void` | `是` |  |
| canceled | 返回了false、Promise中为false, 或者方法中没有使用return及Promise | ` () => void` | `否` |  |
| error | 错误的回调 | ` () => void` | `否` |  |
